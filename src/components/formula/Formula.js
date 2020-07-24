import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: {
                'input': 'onInput',
                'keydown': 'onKeyDown',
            },
            ...options
        })
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="input"]')
        this.$on('table:input', $target => {
            $cell.text($target.text())
        })
    }

    onKeyDown(event) {
        const keys = ['Tab', 'Enter']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }

    toHtml() {
        return `
            <div class="info">fx</div>
            <div data-id="input" 
                class="input" 
                contenteditable 
                spellcheck="false">
            </div>
        `;
    }

    onInput(event) {
        this.$emit('formula:input', event.target.textContent)
    }
}