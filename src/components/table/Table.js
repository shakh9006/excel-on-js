import {ExcelComponent} from '@/core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {shouldResize} from '@/components/table/table.functions';
import {resizeHandler} from '@/components/table/table.utils';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: {
                'mousedown': 'onMouseDown',
            }
        })
    }

    toHtml() {
        return createTable()
    }

    onMouseDown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }
}