<kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-size-3 kiss-text-bold">
                <?=t('Finder')?>
            </div>

            <kiss-card class="kiss-padding kiss-overlay-input kiss-width-1-4@m kiss-width-1-6@xl kiss-margin" theme="bordered contrast" hover="shadow" v-if="Object.keys(roots).length > 1">
                <div>
                    <div class="kiss-text-bold kiss-flex kiss-flex-middle" gap="small">
                        <icon size="larger" class="kiss-size-4 kiss-color-primary">folder</icon>
                        <div class="kiss-text-truncate kiss-flex-1">
                            {{ rootLabel }}
                        </div>
                        <icon class="kiss-color-muted">unfold_more</icon>
                    </div>
                </div>
                <select class="kiss-input kiss-select" v-model="root">
                    <option v-for="r,label in roots" :value="r">{{ label }}</option>
                </select>
            </kiss-card>

            <finder :root="root"></finder>

        </template>

        <script type="module">

            export default {

                data() {
                    return {
                        roots: <?=json_encode($roots)?>,
                        root: '#root:'
                    }
                },

                components: {
                    finder: Vue.defineAsyncComponent(() => App.utils.import('finder:assets/vue-components/finder.js'))
                },

                computed: {
                    rootLabel() {
                        return Object.keys(this.roots)[Object.values(this.roots).indexOf(this.root)];
                    }
                }
            }

        </script>
    </vue-view>
</kiss-container>
