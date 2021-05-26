<?php

namespace Assets\Controller;

use App\Controller\App;
use ArrayObject;

class Assets extends App {


    public function index() {

        $this->helper('theme')->favicon('assets:icon.svg');

        return $this->render('assets:views/index.php');
    }

    public function assets() {

        \session_write_close();

        $options = array_merge([
            'sort' => ['created' => -1]
        ], $this->param('options', []));

        if ($filter = $this->param('filter', null)) $options['filter'] = $filter;
        if ($limit  = $this->param('limit' , null)) $options['limit']  = $limit;
        if ($sort   = $this->param('sort'  , null)) $options['sort']   = $sort;
        if ($skip   = $this->param('skip'  , null)) $options['skip']   = $skip;
        if ($folder = $this->param('folder', null)) $options['folder'] = $folder;

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

        \session_write_close();

        if (!$this->isAllowed('assets.edit')) {
            $this->stop(['error' => 'Editing not allowed'], 401);
        }

        if ($asset = $this->param('asset', false)) {
            return $this->module('assets')->update($asset)[0];
        }

        return false;
    }

    public function upload() {

        \session_write_close();

        if (!$this->isAllowed('assets.upload')) {
            $this->stop(['error' => 'Upload not allowed'], 401);
        }

        $meta = ['folder' => $this->param('folder', '')];

        return $this->module('assets')->upload('files', $meta);
    }

    public function remove() {

        \session_write_close();

        if (!$this->isAllowed('assets.delete')) {
            $this->stop(['error' => 'Deleting assets not allowed'], 401);
        }

        if ($assets = $this->param('assets', false)) {
            return $this->module('assets')->remove($assets);
        }

        return false;
    }

    public function saveFolder() {

        $name   = $this->param('name', null);
        $parent = $this->param('parent', '');

        if (!$name) return;

        $folder = $this->param('folder', [
            '_p' => $parent,
            '_by' => $this->helper('auth')->getUser('_id'),
        ]);

        $folder['name'] = $name;

        // does folder already exists?
        if ($this->app->dataStorage->count('assets/folders', ['name' => $name, '_p' => $folder['_p']])) {
            return $this->stop(['error' => 'Folder already exists'], 409);
        }

        $this->app->dataStorage->save('assets/folders', $folder);

        return $folder;
    }

    public function removeFolder() {

        if (!$this->isAllowed('assets.folders.delete')) {
            $this->stop(['error' => 'Deleting folders not allowed'], 401);
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

}