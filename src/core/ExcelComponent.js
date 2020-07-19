import {DomListener} from '@/core/DomListener';

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        const listeners = options.listeners || {};
        super($root, listeners)
        this.name = options.name
    }

    toHtml() { // return template
        return ''
    }

    init() {
        this.initEventListeners()
    }

    destroy() {
        this.removeEventListeners()
    }
}