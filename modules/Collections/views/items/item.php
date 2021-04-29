<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/collections')?>"><?=t('Collections')?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle kiss-margin-large-bottom">
                <div class="kiss-flex kiss-position-relative">
                    <span class="kiss-badge" style="<?=($collection['color'] ? "background:{$collection['color']};border-color:{$collection['color']}":"")?>"><?=$this->escape($collection['label'] ? $collection['label'] : $collection['name'])?></span>
                    <a class="kiss-cover" href="<?=$this->route("/collections/items/list/{$collection['name']}")?>"></a>
                </div>
                <div class="kiss-margin-small-left kiss-size-5 kiss-text-bolder">
                    <span v-if="!item._id"><?=t('New Item')?></span>
                    <span v-if="item._id"><?=t('Edit Item')?></span>
                </div>
            </div>

            <div class="kiss-margin-large kiss-size-5 kiss-align-center kiss-text-bolder" v-if="!fields.length">
                <?=t('No fields defined')?>
            </div>

            <kiss-row class="kiss-margin-large" v-if="fields.length">
                <div class="kiss-flex-1">
                    <div class="kiss-width-2-3@xl">
                        <fields-renderer v-model="item" :fields="fields"></fields-renderer>
                    </div>
                </div>
                <div class="kiss-width-1-4@m">

                </div>
            </kiss-row>

            <app-actionbar>

                <kiss-container>
                    <div class="kiss-flex kiss-flex-middle">
                        <div class="kiss-flex-1"></div>
                        <div class="kiss-button-group">
                            <a class="kiss-button" href="<?=$this->route("/collections/items/list/{$collection['name']}")?>">
                                <span v-if="!item._id"><?=t('Cancel')?></span>
                                <span v-if="item._id"><?=t('Close')?></span>
                            </a>
                            <a class="kiss-button kiss-button-primary" href="<?=$this->route("/collections/items/item/{$collection['name']}")?>">
                                <span v-if="!item._id"><?=t('Create item')?></span>
                                <span v-if="item._id"><?=t('Update item')?></span>
                            </a>
                        </div>
                    </div>
                </kiss-container>

            </app-actionbar>

        </template>

        <script type="module">

            export default {
                data() {
                    return {
                        item: <?=json_encode($item)?>,
                        fields: <?=json_encode($fields)?>,
                        saving: false
                    }
                },

                components: {
                    'fields-renderer': 'settings:assets/vue-components/fields-renderer.js'
                },

                mounted() {
                    console.log(this.fields)
                }

            }
        </script>

    </vue-view>

</kiss-container>