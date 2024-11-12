import fieldsRenderer from "../vue-components/fields/renderer.js"

export default {

    data() {

        return {
            data: JSON.parse(JSON.stringify(this.item)),
            locale: this.locales.length ? this.locales[0] : null,
            previewLoaded: false,
            device: 'computer',
            modes: {
                phone: {width: '360px', height: '640px'},
                tablet: {width: '768px', height: '1024px'},
                laptop: {width: '1200px', height: '768px'},
                computer: {width: '100%', height: '100%'},
            }
        }
    },

    props: {
        uri: {
            type: String
        },
        fields: {
            type: Array,
            default: []
        },
        locales: {
            type: Array,
            default: []
        },
        item: {
            type: Object,
            default: null
        },
        context: {
            default: null
        },
        resolver: {
            type: Function,
            default: null
        }
    },

    computed: {

        url() {

            let url = this.uri;

            // Replace field placeholders
            this.fields.forEach(field => {
                const fieldName = field.i18n && this.locale?.i18n !== 'default' ? `${field.name}_${this.locale.i18n}` : field.name;
                const regex = new RegExp(`{${fieldName}}`, 'g');
                url = url.replace(regex, this.data[fieldName] || '');
            });

            // Replace locale placeholder
            url = url.replace(/{locale}/g, this.locale?.i18n || 'default');

            // replace id
            if (this.data._id) {
                url = url.replace(/{(id|_id)}/g, this.data._id);
            }

            return url;
        }
    },

    components: {
        fieldsRenderer
    },

    watch: {
        data: {
            handler() { this.updateIframe() },
            deep: true
        },
        locale() {
            this.updateIframe();
        }
    },

    methods: {

        iframeReady() {
            this.previewLoaded = true;
            this.updateIframe();
        },

        updateIframe() {

            if (!this.$refs.iframe) return;

            let evtData = JSON.parse(JSON.stringify({
                event: 'cockpit:content.preview',
                data: this.data,
                context: this.context,
                locale: (this.locale && this.locale.i18n) || 'default'
            }));

            const update = (data) => {
                this.$refs.iframe.contentWindow.postMessage(JSON.parse(JSON.stringify(data)), '*');
            }

            if (this.resolver) {
                this.resolver(evtData, update);
            } else {
                update(evtData);
            }
        },

        updateClose() {
            this.$call('update', this.data);
            this.$close()
        }
    },

    template: /*html*/`

        <div class="app-offcanvas-container">
            <div class="kiss-padding-small kiss-flex kiss-flex-middle kiss-bgcolor-contrast">
                <div class="kiss-flex-1 kiss-text-bold kiss-margin-small-left">{{ t('Content preview') }}</div>

                <div class="kiss-margin-small-left kiss-margin-right" v-if="locales.length">
                    <a class="kiss-text-bold kiss-link-muted kiss-flex kiss-flex-middle" gap="xsmall" kiss-popout="#content-preview-locales">
                        <icon size="larger" class="kiss-color-primary">translate</icon>
                        <div class="kiss-size-small kiss-margin-xsmall-left">{{ locale.name }}</div>
                        <icon class="kiss-color-muted">unfold_more</icon>
                    </a>
                </div>

                <div class="kiss-size-4 kiss-margin-small-left"><a :class="(device=='phone') ? 'kiss-link-muted':'kiss-color-muted'" @click="device='phone'"><icon class="larger">smartphone</icon></a></div>
                <div class="kiss-size-4 kiss-margin-small-left"><a :class="(device=='tablet') ? 'kiss-link-muted':'kiss-color-muted'" @click="device='tablet'"><icon class="larger">tablet_mac</icon></a></div>
                <div class="kiss-size-4 kiss-margin-small-left"><a :class="(device=='laptop') ? 'kiss-link-muted':'kiss-color-muted'" @click="device='laptop'"><icon class="larger">laptop</icon></a></div>
                <div class="kiss-size-4 kiss-margin-small-left"><a :class="(device=='computer') ? 'kiss-link-muted':'kiss-color-muted'" @click="device='computer'"><icon class="larger">desktop_windows</icon></a></div>
                <a class="kiss-button kiss-button-small kiss-margin-large-left kiss-margin-small-right" kiss-offcanvas-close>{{ t('Close preview') }}</a>
            </div>
            <div class="app-offcanvas-content kiss-position-relative kiss-flex kiss-flex-1">
                <div class="kiss-flex kiss-flex-column" style="width:600px;">
                    <div class="kiss-flex-1 kiss-padding kiss-overflow-y-auto">
                        <fields-renderer v-model="data" :fields="fields" :locales="locale ? [Object.assign({}, locale, {visible:true})] : []"></fields-renderer>
                    </div>
                    <div class="kiss-padding kiss-bgcolor-contrast">
                        <div class="kiss-button-group kiss-child-width-1-2 kiss-width-1-1">
                            <button type="button" class="kiss-button" kiss-offcanvas-close>{{ t('Cancel') }}</button>
                            <button type="button" class="kiss-button kiss-button-primary" @click="updateClose()">{{ t('Update & Close') }}</button>
                        </div>
                    </div>
                </div>
                <div class="kiss-flex kiss-flex-1 kiss-flex-middle kiss-flex-center kiss-position-relative kiss-bgcolor-contrast">
                    <div v-if="!previewLoaded">
                        <app-loader></app-loader>
                    </div>
                    <iframe id="content-preview-iframe" ref="iframe" :src="url" style="position:absolute;top:50%;left:50%;max-width:100%;max-height:100%;transform:translate3d(-50%, -50%, 0);width:100%;height:100%;background-color:#fff;transition:all 300ms;opacity:0;" @load="iframeReady()" :style="Object.assign({opacity: (previewLoaded ? 1:0)}, modes[device])"></iframe>
                </div>

            </div>
        </div>

        <teleport to="body" v-if="locales.length">
            <kiss-popout id="content-preview-locales">
                <kiss-content>
                    <kiss-navlist class="kiss-margin">
                        <ul>
                            <li class="kiss-nav-header">{{ t('Switch locale') }}</li>
                            <li v-for="l in locales">
                                <a class="kiss-flex kiss-flex-middle" :class="{'kiss-color-primary': l===locale}" @click="locale = l">
                                    <icon class="kiss-margin-small-right">language</icon>
                                    {{ l.name }}
                                </a>
                            </li>
                        </ul>
                    </kiss-navlist>
                </kiss-content>
            </kiss-popout>
        </teleport>
    `,
}
