export class DomListener {
    constructor($root, listeners = {}) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initEventListeners() {
        const events = Object.keys(this.listeners);
        events.forEach(listener => {
            const method = this.listeners[listener]
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeEventListeners() {
        const events = Object.keys(this.listeners);
        events.forEach(listener => {
            const method = this.listeners[listener]
            this.$root.off(listener, this[method])
        })
    }
}
