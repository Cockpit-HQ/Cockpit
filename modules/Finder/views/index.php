<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-size-3 kiss-text-bold">
                <?=t('Finder')?>
            </div>

            <div class="kiss-margin" v-if="Object.keys(roots).length > 1">
                <select class="kiss-input kiss-select" v-model="root">
                    <option v-for="r,label in roots" :value="r">{{ label }}</option>
                </select>
            </div>

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
                }
            }

        </script>
    </vue-view>
</kiss-container>
