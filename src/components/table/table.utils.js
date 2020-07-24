import {$} from '@/core/Dom';

export function resizeHandler($root, event) {
    let value = null
    const $resize = $(event.target);
    const resizeType = $resize.dataset('resize')
    const $parent = $resize.closest('[data-type="resize"]')
    const coords = $parent.getCoords()
    const index = $parent.dataset('index')
    const nodes = $root.allClosest(`[data-index="${index}"]`)
    $resize.addClass('active')

    document.onmousemove = e => {
        if (resizeType === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            $resize.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            $resize.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = e => {
        $resize.removeClass('active')
        document.onmousemove = null
        document.onmouseup = null

        if (resizeType === 'col') {
            $resize.css({right: 0})
            nodes.forEach(node => node.css({width: value + 'px'}))
        } else {
            $resize.css({bottom: 0})
            $parent.css({height: value + 'px'})
        }
    }
}

export function groupHandler($root, target, current) {
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    const ids = cols.reduce((data, col) => {
        rows.forEach(row => data.push(`${row}:${col}`))
        return data
    }, [])

    return ids.map(id => $root.find(`[data-id="${id}"]`))
}

function range(start, end) {
    return new Array(Math.max(start, end) - Math.min(start, end) + 1)
        .fill('')
        .map((_, index) => +start + index)
}

export function getCellPosition(code, {row, col}) {
    const MIN_VAL = 0
    switch (code) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VAL ? MIN_VAL : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VAL ? MIN_VAL : row - 1
            break
    }
    return `[data-id="${row}:${col}"]`
}