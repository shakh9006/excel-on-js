import {DomListener} from '@/core/DomListener';

export class ExcelComponent extends DomListener {

    constructor($root, options = {}) {
        const listeners = options.listeners || {};
        super($root, listeners)
        this.name = options.name
        this.emitter = options.emitter
        this.prepare()
        this.unsubs = []
    }

    prepare() {

    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
       const unsub = this.emitter.subscribe(event, fn)
        this.unsubs.push(unsub)
    }

    toHtml() { // return template
        return ''
    }

    init() {
        this.initEventListeners()
    }

    destroy() {
        this.removeEventListeners()
        this.unsubs.forEach(unsub => unsub())
    }
}