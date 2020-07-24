import {$} from '@/core/Dom'
import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {isGroup, shouldResize} from '@/components/table/table.functions';
import {getCellPosition, groupHandler, resizeHandler}
from '@/components/table/table.utils';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: {
                'mousedown': 'onMouseDown',
                'keydown': 'onKeyDown',
                'input': 'onInput',
            },
            ...options
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:input', $cell)
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    toHtml() {
        return createTable()
    }

    onMouseDown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isGroup(event)) {
            const $cell = $(event.target)
            if (!event.shiftKey) {
                this.selectCell($cell)
            } else if (event.shiftKey) {
                const target = $cell.id(true)
                const current = this.selection.current.id(true)
                const $cells = groupHandler(this.$root, target, current)
                this.selection.selectGroup($cells)
            }
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }


    onKeyDown(event) {
        const keys = [
            'Tab',
            'Enter',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
        ]
        const {code} = event
        if (keys.includes(code) && !event.shiftKey) {
            event.preventDefault()
            const matrix = this.selection.current.id(true)
            const $cell = this.$root.find(getCellPosition(code, matrix))
            this.selectCell($cell)
        }
    }
}