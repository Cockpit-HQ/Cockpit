<?php

namespace Assets\Controller;

use App\Controller\App;
use ArrayObject;

class Assets extends App {


    public function index() {
        return $this->render('assets:views/index.php');
    }

    public function assets() {

        \session_write_close();

        $options = [
            'sort' => ['created' => -1]
        ];

        if ($filter = $this->param('filter', null)) $options['filter'] = $filter;
        if ($limit  = $this->param('limit' , null)) $options['limit']  = $limit;
        if ($sort   = $this->param('sort'  , null)) $options['sort']   = $sort;
        if ($skip   = $this->param('skip'  , null)) $options['skip']   = $skip;
        if ($folder = $this->param('folder'  , '')) $options['folder'] = $folder;

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

    public function upload() {

        \session_write_close();

        $meta = ['folder' => $this->param('folder', '')];

        return $this->module('assets')->uploadAssets('files', $meta);
    }

    public function remove() {

        if ($assets = $this->param('assets', false)) {
            return $this->module('assets')->remove($assets);
        }

        return false;
    }


    public function saveFolder() {

        $name   = $this->param('name', null);
        $parent = $this->param('parent', '');

        if (!$name) return;

        // does folder already exists?
        if ($this->app->dataStorage->count('assets/folders', ['name' => $name, '_p' => $parent])) {
            return $this->stop(['error' => 'Folder already exists'], 409);
        }

        $folder = [
            'name' => $name,
            '_p' => $parent,
            '_by' => $this->helper('auth')->getUser('_id'),
        ];

        $this->app->dataStorage->save('assets/folders', $folder);

        return $folder;
    }

    public function removeFolder() {

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