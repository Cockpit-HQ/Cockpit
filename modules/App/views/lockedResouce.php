<kiss-container class="kiss-margin-large" size="small">

    <kiss-card class="kiss-padding-large animated pulse kiss-width-3-4@m kiss-margin-auto" theme="bordered contrast">

        <div class="kiss-flex-1">

            <div class="kiss-size-4 kiss-text-bold"><?=t('This resource is currently being worked on by another editor')?></div>

            <div class="kiss-margin-top kiss-margin-small-bottom kiss-color-muted">
                <span class="kiss-text-caption kiss-size-small"><?=t('Current Editor')?></span>
            </div>

            <div class="kiss-flex kiss-flex-middle">
                <div class="kiss-margin-small-right">
                    <app-avatar size="40" name="<?=$this->escape($meta['user']['name'])?>">
                        <canvas width="40" height="40"></canvas>
                    </app-avatar>
                </div>
                <div>
                    <div class="kiss-text-bold"><?=$meta['user']['name']?></div>
                    <div class="kiss-color-muted kiss-size-small"><?=$meta['user']['email']?></div>
                </div>
            </div>

        </div>


        <?php if ($this->helper('acl')->isAllowed('app/resources/unlock')): ?>
        <div class="kiss-margin-large-top">
            <button id="btnUnlock" class="kiss-button kiss-button-danger kiss-width-1-1">
                <?=t('Unlock resource')?>
            </button>
        </div>

        <script>
            document.getElementById('btnUnlock').addEventListener('click', e => {
                App.ui.confirm('Are you sure?', () => {
                    App.request('/utils/unlockResource/<?=$resourceId?>').then(() => window.location.reload());
                });
            });
        </script>
        <?php endif ?>

    </kiss-card>

</kiss-container>
