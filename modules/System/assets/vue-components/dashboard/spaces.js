export default {

    data() {
        return {
            filter: '',
            group: null,
        }
    },

    props: {
        spaces: {
            type: Array,
            default: () => []
        }
    },

    computed: {

        filtered() {

            let spaces = [];

            (this.spaces || []).forEach(space => {

                if (this.group && this.group !== space.group) {
                    return;
                }

                if (this.filter && !`${space.name}`.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())) {
                    return;
                }

                spaces.push(space)
            });

            return spaces;
        },

        groups() {

            let groups = [];

            (this.spaces || []).forEach(space => {
                if (!space.group || groups.indexOf(space.group) > -1) return;
                groups.push(space.group);
            });

            return groups.sort();
        }
    },

    template: /*html*/`
        <kiss-card>

            <div class="kiss-text-caption kiss-text-bold">
                Spaces
            </div>

            <div class="kiss-margin-small">
                <input type="text" class="kiss-input kiss-input-small" :placeholder="t('Filter spaces...')" v-model="filter">
            </div>

            <div class="animated fadeIn kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted kiss-margin" v-if="!filtered.length">
                <div>
                    <kiss-svg :src="$baseUrl('system:assets/icons/spaces.svg')" width="30" height="30"></kiss-svg>
                    <p class="kiss-size-small kiss-margin-small-top">{{ t('No spaces') }}</p>
                </div>
            </div>

            <kiss-navlist class="animated fadeIn kiss-margin" style="max-height: 200px;overflow: scroll" v-if="filtered.length">
                <ul>
                    <li v-for="space in filtered">
                        <a class="kiss-text-capitalize" :href="space.url" target="_blank">
                            <icon size="larger">hive</icon>
                            {{space.name}}
                        </a>
                    </li>
                </ul>
            </kiss-navlist>

            <div class="kiss-button-group">
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/system/spaces')">{{ t('Go to spaces') }}</a>
                <a class="kiss-button kiss-button-small" :href="$routeUrl('/system/spaces/create')" :title="t('Create space')"><icon>add_circle</icon></a>
            </div>

        </kiss-card>
    `
}
