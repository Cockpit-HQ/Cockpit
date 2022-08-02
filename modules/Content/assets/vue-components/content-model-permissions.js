export default {

    data() {

        return {

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

    template: /*html*/`
        <div>

            <div class="kiss-margin-small kiss-size-small kiss-flex kiss-middle">
                <div><field-boolean v-model="modelValue['content/models/manage']"></field-boolean></div>
                <div class="kiss-flex-1 kiss-margin-small-left">
                    <div :class="{'kiss-color-muted':!modelValue['content/models/manage']}">
                        {{ t('Manage models') }}
                    </div>
                </div>
            </div>

            <app-fieldcontainer class="kiss-margin-small" v-for="(model, name) in models">

                <div class="kiss-bgcolor-contrast kiss-padding-small kiss-flex kiss-flex-middle">
                    <span class="kiss-text-bold kiss-size-small kiss-flex-1" :style="{color: (model.color || 'inherit')+' !important' }">{{model.label || name}}</span>
                    <span class="kiss-text-caption kiss-color-muted kiss-margin-small-left">{{model.type}}</span>
                </div>
                <div class="kiss-padding-small">
                    <kiss-row gap="large">
                        <div>
                            <strong class="kiss-size-xsmall">{{ t('Model') }}</strong>
                            <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/manage']" :value="true"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/manage']}">{{ t('Edit model') }}</span></div>
                            </kiss-row>
                        </div>

                        <div v-if="['collection', 'tree'].includes(model.type)">
                            <strong class="kiss-size-xsmall">{{ t('Items') }}</strong>
                            <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/read']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/read']}">{{ t('Read')}}</span></div>
                                <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/create']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/create']}">{{ t('Create') }}</span></div>
                                <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/update']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/update']}">{{ t('Update') }}</span></div>
                                <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/delete']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/delete']}">{{ t('Delete') }}</span></div>
                                <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/publish']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/publish']}">{{ t('Publish') }}</span></div>
                                <div v-if="model.type == 'tree' && modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/updateorder']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/updateorder']}">{{ t('Reorder tree') }}</span></div>
                            </kiss-row>
                        </div>

                        <div v-if="model.type == 'singleton'">
                            <strong class="kiss-size-xsmall">{{ t('Data') }}</strong>
                            <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/read']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/read']}">{{ t('Read')}}</span></div>
                                <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/update']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/update']}">{{ t('Update') }}</span></div>
                                <div v-if="modelValue['content/'+name+'/read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content/'+name+'/publish']"> <span :class="{'kiss-color-muted':!modelValue['content/'+name+'/publish']}">{{ t('Publish') }}</span></div>
                            </kiss-row>
                        </div>
                    </kiss-row>
                </div>
            </app-fieldcontainer>
        </div>
    `
}
