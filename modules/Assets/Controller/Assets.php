<?php

namespace Assets\Controller;

use App\Controller\App;
use ArrayObject;

use MongoHybrid\NaturalLanguageToMongoQuery;

class Assets extends App {


    public function index() {

        $this->helper('theme')->favicon('assets:icon.svg');

        return $this->render('assets:views/index.php');
    }

    public function assets() {

        $this->helper('session')->close();

        $options = array_merge([
            'sort' => ['_created' => -1]
        ], $this->param('options', []));

        if ($limit  = $this->param('limit' , null)) $options['limit']  = $limit;
        if ($sort   = $this->param('sort'  , null)) $options['sort']   = $sort;
        if ($skip   = $this->param('skip'  , null)) $options['skip']   = $skip;
        if ($folder = $this->param('folder', null)) $options['folder'] = $folder;


        if (isset($options['filter']) && (is_string($options['filter']) || \is_countable($options['filter']))) {

            $filter = [];

            $options['filter'] = \is_countable($options['filter']) ? $options['filter'] : [$options['filter']];

            foreach ($options['filter'] as $f) {

                if (!is_string($f)) {
                    $filter[] = $f;
                    continue;
                }

                if ($f && $f[0] === ':') {
                    $filter[] = NaturalLanguageToMongoQuery::translate(substr($f, 1));
                    continue;
                }

                if (\preg_match('/^\{(.*)\}$/', $f)) {

                    try {
                        $f = json5_decode($f, true);
                    } catch (\Exception $e) {}

                } else {

                    $terms = str_getcsv(trim($f), ' ');

                    $f = ['$or' => []];

                    foreach ($terms as $term) {
                        $f['$or'][] = [
                            '$or' => [
                                ['title' => ['$regex' => $term, '$options' => 'i']],
                                ['description' => ['$regex' => $term, '$options' => 'i']],
                                ['tags' => $term],
                            ]
                        ];
                    }
                }

                $filter[] = $f;
            }

            $options['filter'] = count($filter) ? ['$and' => $filter] : null;

        }

        if ($folder) {
            $options['filter'] = $options['filter'] ?? [];
            $options['filter']['folder'] = $folder;
        }

        $assets = $this->module('assets')->assets($options);

        $count = (!isset($options['skip']) && !isset($options['limit']))
                    ? count($assets)
                    : $this->app->dataStorage->count('assets', ($options['filter'] ?? null));

        $pages = isset($options['limit']) ? ceil($count / $options['limit']) : 1;
        $page  = 1;

        if ($pages > 1 && isset($options['skip'])) {
            $page = ceil($options['skip'] / $options['limit']) + 1;
        }

        // virtual folders
        $options = [
            'filter' => ['_p' => $this->param('folder', '')],
            'sort' => ['name' => 1]
        ];

        $folders = $this->module('assets')->folders($options);

        return compact('assets', 'count', 'pages', 'page', 'folders');
    }

    public function asset($id = null) {

        if (!$id) {
            return false;
        }

        $asset = $this->app->dataStorage->findOne('assets', ['_id' => $id]);

        return $asset ?? false;
    }

    public function update() {

        $this->helper('session')->close();

        if (!$this->isAllowed('assets/edit')) {
            return $this->stop(['error' => 'Editing not allowed'], 401);
        }

        if ($asset = $this->param('asset', false)) {
            return $this->module('assets')->update($asset)[0];
        }

        return false;
    }

    public function upload() {

        $this->helper('session')->close();

        if (!$this->isAllowed('assets/upload')) {
            return $this->stop(['error' => 'Upload not allowed'], 401);
        }

        $meta = ['folder' => $this->param('folder', '')];

        return $this->module('assets')->upload('files', $meta);
    }

    public function replace() {

        $this->helper('session')->close();

        if (!$this->isAllowed('assets/upload')) {
            return $this->stop(['error' => 'Upload not allowed'], 401);
        }

        if (!$this->param('assetId')) {
            return false;
        }

        $asset = $this->app->dataStorage->findOne('assets', ['_id' => $this->param('assetId')]);

        if (!$asset) {
            return false;
        }

        $result = $this->module('assets')->upload('files', [
            '_id' => $asset['_id'],
            'title' => $asset['title'],
            'description' => $asset['description'],
            'tags' => $asset['tags'],
            '_created' => $asset['_created'],
        ]);

        if (!isset($result['assets'][0])) {
            return false;
        }

        // remove old asset file
        if ($this->app->fileStorage->fileExists('uploads://'.trim($asset['path'], '/'))) {
            $this->app->fileStorage->delete('uploads://'.trim($asset['path'], '/'));
        }

        $asset = $result['assets'][0];

        return $asset;
    }

    public function remove() {

        $this->helper('session')->close();

        if (!$this->isAllowed('assets/delete')) {
            return $this->stop(['error' => 'Deleting assets not allowed'], 401);
        }

        if ($assets = $this->param('assets', false)) {
            return $this->module('assets')->remove($assets);
        }

        return false;
    }

    public function folders() {

        $folders = $this->module('assets')->folders(['sort' => ['name' => 1]]);
        $folders = $this->helper('utils')->buildTreeList($folders, ['parent_id_column_name' => '_p']);

        return $folders;
    }

    public function saveFolder() {

        $name   = $this->param('name', null);
        $parent = $this->param('parent', '');

        if (!$name) return;

        $folder = $this->param('folder', [
            '_p' => $parent,
            '_by' => $this->helper('auth')->getUser('_id'),
        ]);

        if (!$this->isAllowed(!isset($folder['_id']) ? 'assets/folders/create' : 'assets/folders/edit')) {
            return $this->stop(['error' => 'Editing folder not allowed'], 401);
        }

        $folder['name'] = $name;

        // does folder already exists?
        if ($this->app->dataStorage->count('assets/folders', ['name' => $name, '_p' => $folder['_p']])) {
            return $this->stop(['error' => 'Folder already exists'], 409);
        }

        $this->app->dataStorage->save('assets/folders', $folder);

        return $folder;
    }

    public function removeFolder() {

        if (!$this->isAllowed('assets/folders/delete')) {
            return $this->stop(['error' => 'Deleting folders not allowed'], 401);
        }

        $folder = $this->param('folder');

        if (!$folder || !isset($folder['_id'])) {
            return false;
        }

        $ids = [$folder['_id']];
        $f   = ['_id' => $folder['_id']];

        while ($f = $this->app->dataStorage->findOne('assets/folders', ['_p' => $f['_id']])) {
            $ids[] = $f['_id'];
        }

        $this->app->dataStorage->remove('assets/folders', ['_id' => ['$in' => $ids]]);

        return $ids;
    }

    public function thumbnail($id = null) {

        $this->helper('session')->close();

        $mime = $this->param('mime', 'auto');

        if ($mime == 'auto') {

            $mime = null;

            if (strpos($this->app->request->headers['Accept'] ?? '', 'image/webp') !== false) {
                $gdinfo = \gd_info();
                $mime = isset($gdinfo['WebP Support']) && $gdinfo['WebP Support'] ? 'webp' : null;
            }
        }

        $src = $this->param('src', $id);

        $options = [
            'src' => $src,
            'fp' => $this->param('fp', null),
            'mode' => $this->param('m', 'thumbnail'),
            'mime' => $mime,
            'filters' => (array) $this->param('f', []),
            'width' => intval($this->param('w', null)),
            'height' => intval($this->param('h', null)),
            'quality' => intval($this->param('q', 30)),
            'rebuild' => intval($this->param('r', false)),
            'timestamp' => $this->param('t', null),
        ];

        $thumbUrl = $this->helper('asset')->image($options);

        if (!$thumbUrl || isset($thumbUrl['error'])) {
            return false;
        }

        $this->app->reroute($thumbUrl);
    }

}
