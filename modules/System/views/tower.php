<kiss-container class="kiss-margin-large" size="medium">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?=$this->route('/system')?>"><?=t('Settings')?></a></li>
    </ul>

    <div class="kiss-margin-bottom kiss-flex kiss-flex-middle">
        <icon class="kiss-size-4 kiss-margin-small-right" size="larger">terminal</icon>
        <div class="kiss-size-4 kiss-flex-1">
            <strong>Tower</strong>
        </div>
    </div>

    <vue-view>
        <template>
            <kiss-card class="kiss-padding-larger" theme="bordered" style="background:#000">
                <span class="kiss-color-muted kiss-text-monospace kiss-size-small kiss-text-caption kiss-margin-small"><?=t('Terminal')?></span>
                <system-terminal height="450"></system-terminal>
            </kiss-card>
        </template>

        <script type="module">

            export default {

                components: {
                    systemTerminal: 'system:assets/vue-components/system-terminal.js',
                },
            }
        </script>
    </vue-view>

</kiss-container>
