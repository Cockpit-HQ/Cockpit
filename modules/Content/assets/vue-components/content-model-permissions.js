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

    template: /*html */`
        <div>
            <kiss-card class="kiss-margin-small" theme="bordered" hover="shadow" v-for="(model, name) in models">

                <div class="kiss-margin-small kiss-bgcolor-contrast kiss-color-muted kiss-padding-small">
                    <span class="kiss-badge kiss-badge-outline" :style="{color: model.color || 'inherit' }">{{model.label || name}}</span>
                    <span class="kiss-badge kiss-badge-outline kiss-margin-small-left">{{model.type}}</span>
                </div>
                <div class="kiss-padding-small">
                    <kiss-row class="kiss-row-large">
                        <div>
                            <strong class="kiss-size-xsmall">{{ t('Model') }}</strong>
                            <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.managemodel']" :value="true"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.managemodel']}">{{ t('Edit model') }}</span></div>
                            </kiss-row>
                        </div>

                        <div v-if="model.type == 'collection'">
                            <strong class="kiss-size-xsmall">{{ t('Items') }}</strong>
                            <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.read']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.read']}">{{ t('Read')}}</span></div>
                                <div v-if="modelValue['content.'+name+'.read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.create']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.create']}">{{ t('Create') }}</span></div>
                                <div v-if="modelValue['content.'+name+'.read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.update']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.update']}">{{ t('Update') }}</span></div>
                                <div v-if="modelValue['content.'+name+'.read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.delete']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.delete']}">{{ t('Delete') }}</span></div>
                                <div v-if="modelValue['content.'+name+'.read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.publish']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.publish']}">{{ t('Publish') }}</span></div>
                            </kiss-row>
                        </div>

                        <div v-if="model.type == 'singleton'">
                            <strong class="kiss-size-xsmall">{{ t('Data') }}</strong>
                            <kiss-row class="kiss-flex kiss-margin-xsmall kiss-size-small">
                                <div><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.read']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.read']}">{{ t('Read')}}</span></div>
                                <div v-if="modelValue['content.'+name+'.read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.update']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.update']}">{{ t('Update') }}</span></div>
                                <div v-if="modelValue['content.'+name+'.read']"><input class="kiss-checkbox kiss-margin-xsmall-right" type="checkbox" v-model="modelValue['content.'+name+'.publish']"> <span :class="{'kiss-color-muted':!modelValue['content.'+name+'.publish']}">{{ t('Publish') }}</span></div>
                            </kiss-row>
                        </div>
                    </kiss-row>
                </div>
            </kiss-card>
        </div>
    `
}