<kiss-container class="kiss-margin-small">

    <ul class="kiss-breadcrumbs">
        <li><a href="<?= $this->route('/system') ?>"><?= t('Settings') ?></a></li>
    </ul>

    <div class="kiss-margin-bottom kiss-flex kiss-flex-middle">
        <icon class="kiss-size-4 kiss-margin-small-right" size="larger">terminal</icon>
        <div class="kiss-size-4 kiss-flex-1">
            <strong>Tower</strong>
        </div>
    </div>

    <?php if (!$isAvailable) : ?>

        <div class="animated fadeIn kiss-height-50vh kiss-flex kiss-flex-middle kiss-flex-center kiss-align-center kiss-color-muted">
            <div>
                <kiss-svg class="kiss-margin-auto" src="<?= $this->base('system:assets/icons/info.svg') ?>" width="40" height="40"><canvas width="40" height="40"></canvas></kiss-svg>
                <p class="kiss-size-large kiss-margin-top"><?= t('Tower web console is not available on your server') ?></p>
            </div>
        </div>

    <?php else : ?>

        <vue-view>
            <template>
                <kiss-card class="kiss-padding-larger" theme="bordered" style="background:#000">
                    <div class="kiss-color-muted kiss-text-monospace kiss-size-small kiss-text-caption kiss-margin-small"><?= t('Terminal') ?></div>
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

    <?php endif ?>

</kiss-container>
