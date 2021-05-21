<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/assets')?>"><?=t('Assets')?></a></li>
    </ul>

    <vue-view>

        <template>
            <assets-manager></assets-manager>
        </template>

        <script type="module">

            export default {

                components: {
                    assetsManager: 'assets:assets/vue-components/assets-manager.js'
                }
            }

        </script>

    </vue-view>

</kiss-container>