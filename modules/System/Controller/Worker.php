<?php

namespace System\Controller;

use App\Controller\App;

class Worker extends App {

    protected bool $cliAvailable = false;

    protected function before() {

        if (!$this->helper('acl')->isSuperAdmin()) {
            return $this->stop(401);
        }

        $this->helper('session')->close();

        $this->cliAvailable = $this->helper('spaces')->isMaster() && function_exists('posix_kill') && function_exists('exec');
    }

    public function index() {

        $canStopProcess = $this->cliAvailable;

        return $this->render('system:views/worker/index.php', compact('canStopProcess'));
    }

    public function load() {

        $filter = $this->param('filter', null);
        $status = $this->param('status', 'pending');
        $limit  = $this->param('limit', 30);
        $skip   = $this->param('skip', 0);

        if ($filter && is_string($filter) && trim($filter)) {

            $terms = str_getcsv(trim($filter), ' ', escape: '\\');

            foreach ($terms as &$term) {
                $term = ['data.job' => ['$regex' => trim($term), '$options' => 'i']];
            }

            $filter = ['$or' => $terms];
        }

        $workers = null;

        if ($this->cliAvailable) {

            $workers = $this->helper('worker')->getWorkerPIDFileData()['workers'] ?? [];

            foreach ($workers as &$worker) {
                $worker['alive'] = $this->helper('worker')->isProcessRunning($worker['pid']);
            }
        }

        $result = [
            'stats' => $this->helper('worker')->stats(),
            'workers' => $workers,
            'webworker' => $this->helper('spaces')->isMaster() ? $this->app->retrieve('worker/web/enabled',false) : false,
            'jobs'  => $this->helper('worker')->jobs([
                'filter' => $filter,
                'status' => $status,
                'limit' => intval($limit),
                'skip' => intval($skip),
            ])
        ];

        return $result;
    }

    public function stopProcess() {

        $this->hasValidCsrfToken(true);

        if (!$this->cliAvailable) {
            return $this->stop(['error' => 'Worker stop is not supported on this server'], 412);
        }

        $pid = $this->param('pid');

        if (!$pid) {
            return $this->stop(['error' => 'Worker PID is missing'], 412);
        }

        $pid = intval($pid);

        $this->helper('worker')->stopProcess($pid);

        return ['success' => true];
    }

}
