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

        <kiss-container class="kiss-flex kiss-flex-wrap" :size="cols === 1 ? 'small': ''" gap="large">

            <section class="kiss-width-1-4@m kiss-width-1-5@xl" v-if="cols !== 1">

                <div class="kiss-flex-inline kiss-flex-middle" gap="small">
                    <div>
                        <app-avatar size="40" name="<?=$this->escape($this['user/name'])?>"></app-avatar>
                    </div>
                    <div>
                        <div class="kiss-text-bold"><?=$this->escape($this['user/name'])?></div>
                        <div class="kiss-text-truncate kiss-color-muted kiss-size-small"><?=$this->escape($this['user/email'])?></div>
                    </div>
                </div>

                <div class="app-dashboard-widget-container kiss-margin-large" v-for="widget in areas.secondary">
                    <div v-if="widget.html" v-html="widget.html"></div>
                    <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                </div>

            </section>

            <section class="kiss-flex-1">

                <kiss-card class="kiss-padding-large kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-visible@m" :class="widgets.length  ? 'kiss-height-30vh' : 'kiss-height-50vh'" :theme="widgets.length ? 'contrast shadowed':''">
                    <div class="animated fadeInUp">
                        <div class="kiss-size-xlarge kiss-margin-small"><?=_t('Hello %s', [$this->escape($this['user/name'])])?></div>
                        <div class="kiss-color-muted kiss-size-1 kiss-text-light animated fadeIn delay-1s"><?=t("Excited for your creations today!")?></div>
                    </div>
                </kiss-card>

                <div class="kiss-margin-large" v-if="cols === 1">
                    <div class="app-dashboard-widget-container kiss-margin-large" v-for="widget in areas.secondary">
                        <div v-if="widget.html" v-html="widget.html"></div>
                        <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                    </div>
                </div>

                <div class="app-dashboard-widget-container kiss-margin-large" v-for="widget in areas.primary">
                    <div v-if="widget.html" v-html="widget.html"></div>
                    <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                </div>

                <div class="kiss-margin-large" v-if="cols === 1">
                    <div class="app-dashboard-widget-container kiss-margin-large" v-for="widget in areas.tertiary">
                        <div v-if="widget.html" v-html="widget.html"></div>
                        <component :is="widget.name" v-bind="widget.data || {}" v-if="widget.component"></component>
                    </div>
                </div>

            </section>

            <section class="kiss-width-1-4@m kiss-width-1-5@xl" v-if="cols !== 1">
                <div class="app-dashboard-widget-container kiss-margin-large" v-for="widget in areas.tertiary">
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

                const widgets = [... document.querySelectorAll('.app-dashboard-widget-container')];

                widgets.forEach(widget => {

                    widget.addEventListener('pointerenter', function() {
                        widgets.forEach(w => w.setAttribute('focus', 'false'));
                        this.setAttribute('focus', 'true');
                    });

                    widget.addEventListener('pointerleave', () => {
                        widgets.forEach(w => w.removeAttribute('focus'));
                    });
                });
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
                },

                cols() {
                    return (this.areas.primary.length && this.areas.tertiary.length) ? 3 : 1;
                }
            },

            methods: {

            }
        }
    </script>

</vue-view>
