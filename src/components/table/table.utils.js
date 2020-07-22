import {$} from '@/core/Dom';

export function resizeHandler($root, event) {
    let value = null
    const $resize = $(event.target);
    const resizeType = $resize.dataset('resize')
    const $parent = $resize.closest('[data-type="resize"]')
    const coords = $parent.getCoords()
    const index = $parent.dataset('index')
    const nodes = $root.allClosest(`[data-index="${index}"`)

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