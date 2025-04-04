<?php

namespace System\Controller;

use App\Controller\App;

class Worker extends App {

    protected function before() {

        if (!$this->helper('acl')->isSuperAdmin()) {
            return $this->stop(401);
        }

        $this->helper('session')->close();
    }

    public function index() {

        return $this->render('system:views/worker/index.php');
    }

    public function load() {

        $filter = $this->param('filter', null);
        $status = $this->param('status', 'pending');
        $limit  = $this->param('limit', 50);
        $skip   = $this->param('skip', 0);

        if ($filter && is_string($filter) && trim($filter)) {

            $terms = str_getcsv(trim($filter), ' ', escape: '\\');

            foreach ($terms as &$term) {
                $term = ['data.job' => ['$regex' => trim($term), '$options' => 'i']];
            }

            $filter = ['$or' => $terms];
        }

        $workers = $this->helper('worker')->getWorkerPIDFileData();

        foreach ($workers['workers'] as &$worker) {
            $worker['alive'] = $this->helper('worker')->isProcessRunning($worker['pid']);
        }

        $result = [
            'stats' => $this->helper('worker')->stats(),
            'workers' => $workers,
            'jobs'  => $this->helper('worker')->jobs([
                'filter' => $filter,
                'status' => $status,
                'limit' => intval($limit),
                'skip' => intval($skip),
            ])
        ];

        return $result;
    }

}
