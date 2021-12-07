<?php

namespace System\Helper;

use ArrayObject;

class System extends \Lime\Helper {


    public function try(callable $callback, $rescue = null, $report = true) {
        try {
            return $callback();
        } catch (Throwable $e) {
            if ($report) {
                $this->report($e);
            }

            return $rescue instanceof Closure ? $rescue($e) : $rescue;
        }
    }

    public function report() {
        // to be implemented
    }

}