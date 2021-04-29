<?php

namespace App\Helper;

use SplPriorityQueue;

class Menus extends \Lime\Helper {

    protected $menus = [];

    public function addLink(string $menu, array $link): void {

        if (!isset($this->menus[$menu])) {
            $this->menus[$menu] = [];
        }

        $link = array_merge([
            'label'  => '',
            'icon'   => 'cube',
            'route'  => '/',
            'active' => true,
            'prio'   => 0
        ], $link);

        $this->menus[$menu][] = $link;
    }

    public function menu(string $name): array {

        if (!isset($this->menus[$name]) || !count($this->menus[$name])) {
            return [];
        }

        $links = $this->menus[$name];
        $queue = new SplPriorityQueue();
        $list  = [];

        foreach ($links as $index => $link){
            $queue->insert($index, $link['prio']);
        }

        while ($queue->valid()){
            $list[] = $links[$queue->current()];
            $queue->next();
        }

        return $list;
    }

}