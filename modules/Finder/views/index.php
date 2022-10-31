<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-margin-large-bottom kiss-size-3 kiss-text-bold">
                <?=t('Finder')?>
            </div>

            <finder></finder>

        </template>

        <script type="module">

            export default {

                components: {
                    finder: Vue.defineAsyncComponent(() => App.utils.import('finder:assets/vue-components/finder.js'))
                }
            }

        </script>
    </vue-view>
</kiss-container>
