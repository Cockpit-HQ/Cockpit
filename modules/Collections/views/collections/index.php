<kiss-container class="kiss-margin-large">

    <vue-view>
        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-flex-1"></div>
                <a class="kiss-button kiss-button-primary" href="<?=$this->route('/collections/create')?>"><?=t('Add collection')?></a>
            </div>

        </template>

        <script type="module">

            export default {
                data() {
                    return {

                    }
                }
            }
        </script>

    </vue-view>


</kiss-container>