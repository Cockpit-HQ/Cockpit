<?php

namespace Layout\Helper;

class Components extends \Lime\Helper {

    protected array $components = [];

    protected function initialize() {

        $this->components = $this->app->helper('cache')->read('layout.components', function() {
            return $this->cache();
        });
    }

    public function components(): array {
        return $this->components;
    }

    public function cache(): array {

        $cache = [

            'button' => [
                'icon' => 'layout:assets/icons/button.svg',
                'label' => 'Button',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'url', 'type' => 'text'],
                    ['name' => 'caption', 'type' => 'text'],
                    ['name' => 'target', 'type' => 'select', 'opts' => ['options' => ['_self', '_blank'], 'default' => '_self']],
                ],
                'preview' => null,
                'children' => false
            ],

            'heading' => [
                'icon' => 'layout:assets/icons/heading.svg',
                'label' => 'Heading',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'text', 'type' => 'text'],
                    ['name' => 'level', 'type' => 'select', 'opts' => ['options' => [1,2,3,4,5,6]]],
                ],
                'preview' => null,
                'children' => false
            ],

            'html' => [
                'icon' => 'settings:assets/icons/html.svg',
                'label' => 'HTML',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'html', 'type' => 'code', 'opts' => ['mode' => 'html']],
                ],
                'preview' => null,
                'children' => false
            ],

            'markdown' => [
                'icon' => 'layout:assets/icons/component.svg',
                'label' => 'Markdown',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'markdown', 'type' => 'code', 'opts' => ['mode' => 'markdown']],
                ],
                'preview' => null,
                'children' => false
            ],

            'link' => [
                'icon' => 'settings:assets/icons/link.svg',
                'label' => 'Link',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'url', 'type' => 'text'],
                    ['name' => 'caption', 'type' => 'text'],
                    ['name' => 'target', 'type' => 'select', 'opts' => ['options' => ['_self', '_blank'], 'default' => '_self']],
                ],
                'preview' => null,
                'children' => false
            ],

            'richtext' => [
                'icon' => 'settings:assets/icons/wysiwyg.svg',
                'label' => 'Richtext',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'html', 'type' => 'wysiwyg'],
                ],
                'preview' => null,
                'children' => false
            ],

            'section' => [
                'icon' => 'layout:assets/icons/component.svg',
                'label' => 'Section',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'class', 'type' => 'text']
                ],
                'preview' => null,
                'children' => true
            ],

            'spacer' => [
                'icon' => 'layout:assets/icons/component.svg',
                'label' => 'Spacer',
                'group' => 'Core',
                'fields' => [
                    ['name' => 'size', 'type' => 'text'],
                ],
                'preview' => null,
                'children' => false
            ]
        ];

        $components = $this->app->dataStorage->find('layout/components', [
            'sort' => ['name' => 1]
        ])->toArray();

        foreach ($components as $component) {
            $cache[$component['name']] = $component['meta'];
        }

        $this->app->helper('cache')->write('layout.components', $cache);

        return $cache;
    }
}