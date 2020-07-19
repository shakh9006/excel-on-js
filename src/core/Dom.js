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

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        this.$el.append(node)
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
