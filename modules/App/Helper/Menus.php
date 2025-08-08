<?php

namespace App\Helper;

use SplPriorityQueue;

class Menus extends \Lime\Helper {

    protected array $menus = [];

    /**
     * Add a link to a menu.
     *
     * @param string $menu The menu name.
     * @param array $link The link data.
     * @return void
     */
    public function addLink(string $menu, array $link): void {

        if (!isset($this->menus[$menu])) {
            $this->menus[$menu] = [];
        }

        $link = array_merge([
            'label'  => '',
            'icon'   => 'cube',
            'route'  => '/',
            'active' => true,
            'group'  => '',
            'prio'   => 0
        ], $link);

        if ($link['group'] && !$link['prio']) {
            $link['prio'] = 1;
        }

        $this->menus[$menu][] = $link;
    }

    /**
     * Get the menu links for a specific menu.
     *
     * @param string $name The menu name.
     * @param bool $grouped Whether to group the links by their group.
     * @return array The menu links.
     */
    public function menu(string $name, bool $grouped = false): array {

        if (!isset($this->menus[$name]) || !count($this->menus[$name])) {
            return [];
        }

        $groups = [];
        $links = $this->menus[$name];
        $queue = new SplPriorityQueue();
        $list  = [];

        foreach ($links as $index => $link){
            $queue->insert($index, $link['prio']);
        }

        while ($queue->valid()){

            $link = $links[$queue->current()];
            $list[] = $link;

            if (!isset($groups[$link['group']])) {
                $groups[$link['group']] = [];
            }

            $groups[$link['group']][] = $link;

            $queue->next();
        }

        return $grouped ? $groups : $list;
    }

}
