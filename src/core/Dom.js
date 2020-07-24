class Dom {
    constructor(selector) {
        let domElement
        if (typeof selector === 'string') {
            if (selector.indexOf('#') !== -1) {
                domElement = document.querySelector(selector)
            } else {
                domElement = document.querySelectorAll(selector)
            }
        } else {
            domElement = selector
        }
        this.$el = domElement
    }

    clear() {
        this.$el.innerHTML = ''
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback, true)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback, true)
    }

    html(content) {
        if (typeof content === 'string') {
            this.$el.innerHTML = content
            return this
        }
        return this.$el.outerHTML
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
        }
        return this.$el.textContent
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        this.$el.append(node)
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    allClosest(selector) {
        return Array.from(this.findAll(selector))
            .map(element => $(element))
    }

    dataset(dataName) {
        return this.$el.dataset[dataName]
    }

    id(parse) {

        if (parse) {
            const split = this.dataset('id').split(':')
            return {
                row: split[0],
                col: split[1]
            }
        }

        return this.dataset('id')
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    focus() {
        this.$el.focus()
        return this
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className = '') => {
    const $el = document.createElement(tagName)
    if (className) {
        $el.classList.add(className)
    }
    return $($el);
}