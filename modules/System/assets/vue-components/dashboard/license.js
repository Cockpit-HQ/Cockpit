export default {

    data() {
        return {

        }
    },

    props: {

    },


    template: /*html*/`
        <kiss-card class="animated fadeIn kiss-padding" theme="contrast bordered" hover="shadowed" >

            <div class="kiss-flex kiss-flex-middle kiss-margin-bottom" gap>
                <div>
                    <strong class="kiss-size-small kiss-text-pacing-loose">Cockpit Pro</strong>
                    <div class="kiss-text-caption kiss-text-monospace kiss-color-muted kiss-size-xsmall">Trial Version</div>
                </div>
                <hr class="kiss-flex-1 kiss-margin-remove">
                <a class="kiss-link-muted" href="https://agentejo.com" target="_blank" title="Visit Agentejo"><kiss-svg :src="$baseUrl('app:assets/img/logo.svg')" width="30"></kiss-svg></a>
            </div>


            <div class="kiss-margin kiss-size-small">
                Thank you for test-driving Cockpit Pro!
                Upgrade to a full license to make this message vanish and join the ranks of our pro users.
            </div>

            <a class="kiss-button kiss-button-small kiss-button-danger" href="https://getcockpit.com" target="_blank">Get a license</a>
        </kiss-card>
    `
}
