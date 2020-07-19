import {ExcelComponent} from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: {
                'input': 'onInput',
                'click': 'onClick',
            },
        })
    }

    toHtml() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(event) {
        console.log(event.target.textContent)
    }

    onClick(event) {
        console.log(event.target)
    }
}