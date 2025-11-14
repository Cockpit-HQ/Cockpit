export default {

    data() {

        return {
            filter: ''
        }
    },

    props: {
        modelValue: {
            type: Object,
            default: {}
        },
        models: {
            type: Object,
            default: {}
        }
    },

    computed: {

        filtered() {

            let models = this.models;

            if (this.filter) {

                const filter = this.filter.toLowerCase();
                const keys = Object.keys(models);
                const vals = Object.values(models);

                models = {};

                keys.forEach((key, i) => {

                    if (`${key} ${vals[i].label || ''}`.toLocaleLowerCase().indexOf(filter) > -1) {
                        models[key] = vals[i];
                    }
                });
            }

            return models;
        }
    },

    template: /*html*/`
        <div>

            <div class="kiss-margin kiss-size-small kiss-flex kiss-middle">
                <div><field-boolean v-model="modelValue['content/:models/manage']"></field-boolean></div>
                <div class="kiss-flex-1 kiss-margin-small-left">
                    <div :class="{'kiss-color-muted':!modelValue['content/:models/manage']}">
                        {{ t('Manage models') }}
                    </div>
                </div>
            </div>

            <div classs="kiss-margin">
                <input class="kiss-input kiss-input-small" type="text" v-model="filter" :placeholder="t('Filter models...')">
            </div>

            <div class="kiss-margin">
                <app-fieldcontainer class="kiss-margin-small" v-for="(model, name) in filtered">

                    <div class="kiss-bgcolor-contrast kiss-padding-small kiss-flex kiss-flex-middle">
                        <span class="kiss-text-bold kiss-size-small kiss-flex-1">
                            <icon class="kiss-margin-xsmall-right kiss-size-5" :style="{color: (model.color || 'inherit')+' !important' }" size="larger">subject</icon> {{model.label || name}}
                        </span>
                        <span class="kiss-text-caption kiss-color-muted kiss-margin-small-left">{{model.type}}</span>
                    </div>
                    <div class="kiss-padding-small">
                        <kiss-row gap="large">
                            <div>
                                <span class="kiss-text-caption">{{ t('Model') }}</span>
                                <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                    <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/manage']" :value="true"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/manage']}">{{ t('Edit model') }}</span></div>
                                </kiss-row>
                            </div>

                            <div v-if="['collection', 'tree'].includes(model.type)">
                                <span class="kiss-text-caption">{{ t('Items') }}</span>
                                <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small" gap>
                                    <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/read']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/read']}">{{ t('Read')}}</span></div>
                                    <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/create']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/create']}">{{ t('Create') }}</span></div>
                                    <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/update']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/update']}">{{ t('Update') }}</span></div>
                                    <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/delete']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/delete']}">{{ t('Delete') }}</span></div>
                                    <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/publish']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/publish']}">{{ t('Publish') }}</span></div>
                                    <div v-if="model.type == 'tree' && modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/updateorder']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/updateorder']}">{{ t('Reorder tree') }}</span></div>
                                </kiss-row>
                            </div>

                            <div v-if="model.type == 'singleton'">
                                <span class="kiss-text-caption">{{ t('Data') }}</span>
                                <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small" gap>
                                    <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/read']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/read']}">{{ t('Read')}}</span></div>
                                    <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/update']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/update']}">{{ t('Update') }}</span></div>
                                    <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/publish']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/publish']}">{{ t('Publish') }}</span></div>
                                </kiss-row>
                            </div>
                        </kiss-row>
                    </div>
                </app-fieldcontainer>
            </div>
        </div>
    `
}
