<?php

    $widgets = new \ArrayObject([]);

    $this->trigger('app.dashboard.widgets', [$widgets]);

    $widgets = $widgets->getArrayCopy();

    // sort by prio
    usort($widgets, function($a, $b) {
        return ($b['prio'] ?? 1) - ($a['prio'] ?? 1);
    });


?>

<vue-view class="app-dashboard kiss-margin-large-top kiss-margin-large-bottom">
    <template>

        <kiss-container class="kiss-flex kiss-flex-wrap" gap="large">

            <section class="kiss-width-1-4@m kiss-width-1-5@xl" v-if="areas.secondary.length">

                <div class="kiss-flex-inline kiss-flex-middle" gap="small">
                    <div>
                        <app-avatar size="40" name="<?=$this['user/name']?>"></app-avatar>
                    </div>
                    <div>
                        <div class="kiss-text-bold"><?=$this['user/name']?></div>
                        <div class="kiss-text-truncate kiss-color-muted kiss-size-small"><?=$this['user/email']?></div>
                    </div>
                </div>

                <hr>

                <div class="kiss-margin" v-for="widget in areas.secondary">
                    <div v-if="widget.html" v-html="widget.html"></div>
                    <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                </div>

            </section>

            <section class="kiss-flex-1">

                <kiss-card class="kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center" :class="areas.secondary.length && areas.tertiary.length ? 'kiss-height-30vh' : 'kiss-height-50vh'" :theme="areas.secondary.length && areas.tertiary.length ? 'contrast shadowed':''">
                    <div class="animated fadeInUp">
                        <div class="kiss-size-xlarge kiss-margin-small"><?=_t('Hello %s', [$this['user/name']])?></div>
                        <div class="kiss-color-muted kiss-size-1 kiss-text-light animated fadeIn delay-1s"><?=t("Excited for your creations today!")?></div>
                    </div>
                </kiss-card>

                <div class="kiss-margin" v-for="widget in areas.primary">
                    <div v-if="widget.html" v-html="widget.html"></div>
                    <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                </div>

            </section>

            <section class="kiss-width-1-4@m kiss-width-1-5@xl" v-if="areas.tertiary.length">
                <div class="kiss-margin" v-for="widget in areas.tertiary">
                    <div v-if="widget.html" v-html="widget.html"></div>
                    <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                </div>
            </section>

        </kiss-container>
    </template>

    <script type="module">

        const widgets = <?=json_encode($widgets)?>;

        export default {

            $viewSetup(app) {
                // register widget components
                widgets.filter(w => w.component).forEach(widget => {
                    app.component(widget.name, Vue.defineAsyncComponent(() => App.utils.import(widget.component)));
                });
            },

            data() {
                return {
                    widgets,
                };
            },

            mounted() {

            },

            computed: {

                areas() {

                    let area, areas = {
                        'primary': [],
                        'secondary': [],
                        'tertiary': [],
                    };

                    const possibleAreas = Object.keys(areas);

                    this.widgets.forEach(widget => {

                        area = widget.area ?? 'primary';

                        if (!possibleAreas.includes(area)) {
                            area = 'primary';
                        }

                        areas[area].push(widget);
                    });

                    return areas;
                }
            },

            methods: {

            }
        }
    </script>

</vue-view>
