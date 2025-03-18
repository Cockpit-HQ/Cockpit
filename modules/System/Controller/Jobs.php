<?php

namespace System\Controller;

use App\Controller\App;

class Jobs extends App {

    protected function before() {

        if (!$this->helper('acl')->isSuperAdmin()) {
            return $this->stop(401);
        }

        $this->helper('session')->close();
    }

    public function index() {

        return $this->render('system:views/jobs/index.php');
    }

    public function load() {

        $status = $this->param('status', 'pending');
        $limit = $this->param('limit', 50);
        $skip = $this->param('skip', 0);

        $result = [
            'stats' => $this->helper('worker')->stats(),
            'jobs'  => $this->helper('worker')->jobs([
                'status' => $status,
                'limit' => intval($limit),
                'skip' => intval($skip),
            ])
        ];

        return $result;
    }

}
