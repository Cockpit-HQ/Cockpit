<?php

namespace Layout\Helper;

class Components extends \Lime\Helper {

    protected array $components = [];

    protected function initialize() {

        $this->components = $this->app['debug'] ? $this->cache() : $this->app->helper('cache')->read('layout.components', function() {
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
                'children' => false,
                'opts' => [
                    'preview' => '<div class="kiss-color-muted kiss-flex kiss-flex-middle" v-if="data.text"><strong class="kiss-margin-xsmall-right" v-if="data.level">H{{data.level}}</strong> {{ data.text }}</div>'
                ]
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
                'children' => false,
                'opts' => [
                    'preview' => '<div class="kiss-color-muted" v-if="data.markdown">{{ truncate(data.markdown, 50) }}</div>'
                ]
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
                'children' => false,
                'opts' => [
                    'preview' => '<div class="kiss-color-muted kiss-overflow-y-auto" style="max-height:250px" v-if="data.html" v-html="stripTags(data.html, \'<br><p><strong><i><div><em><hr><code><h1><h2><h3><h4><h5><h6>\')"></div>'
                ]
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
                'children' => false,
                'opts' => [
                    'preview' => '<div class="kiss-color-muted kiss-flex kiss-flex-middle" v-if="data.size"><icon class="kiss-margin-xsmall-right">unfold_more</icon>{{ data.size }}</div>'
                ]
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