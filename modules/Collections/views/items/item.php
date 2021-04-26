<kiss-container class="kiss-margin">

    <ul class="kiss-breadcrumb">
        <li><a href="<?=$this->route('/collections')?>"><?=t('Collections')?></a></li>
        <li><a href="<?=$this->route("/collections/items/list/{$collection['name']}")?>"><?=$this->escape($collection['label'] ? $collection['label'] : $collection['name'])?></a></li>
    </ul>

    <vue-view>

        <template>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-margin-small-right kiss-size-5">
                    <a class="kiss-link-muted" href="<?=$this->route("/collections/items/list/{$collection['name']}")?>"><icon>arrow_back_ios</icon></a>
                </div>
                <div class="kiss-margin-small-right kiss-size-5 kiss-text-bolder">
                    <span v-if="!item._id"><?=t('New Item')?></span>
                    <span v-if="item._id"><?=t('Edit Item')?></span>
                </div>
            </div>

            <hr>

            <div class="kiss-margin-large kiss-size-5 kiss-align-center kiss-text-bolder" v-if="!fields.length">
                <?=t('No fields defined')?>
            </div>


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

            }
        </script>

    </vue-view>

</kiss-container>