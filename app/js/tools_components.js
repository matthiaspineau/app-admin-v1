/**
 * componentsModal
 * @param {*} config 
 */
function componentsModal(config) {
    let html;
    let element = document.createElement('div')
    element.classList.add('dock-modal')
    // console.log(config)
    html = `
        <div class="modal-container" data-modal-id="${config.id}">
            <div class="modal-content">
                <div class="modal-top">
                    ${config.top}
                    <span class="modal-close">close</span>
                </div>
                <div class="modal-middle">
                    ${config.middle}
                </div>
                <div class="modal-bot">
                    ${config.bot}
                </div>
            </div>
        </div>
    `
    element.innerHTML = html
    document.querySelector('[data-dock="dock-page"]').appendChild(element)
    document.querySelector('.dock-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close') ) {
            document.querySelector('.dock-modal').remove()
        }
    })

    document.querySelectorAll('[data-modal-action]').forEach(elt => {
        elt.addEventListener('click', () => {
            console.log(elt.dataset.modalAction)
            let controller = elt.dataset.modalController
            let action = elt.dataset.modalAction
            switchModalAction(config.id, controller, action)
        })
    })

}