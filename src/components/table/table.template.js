const CODES = {
    A: 65,
    Z: 90
}

function createCell(content, index) {
    return `<div class="cell" data-index="${index}" contenteditable>
                ${content || ''}
            </div>`
}

function createRow(info, content) {
    const resize = info
        ? '<div class="row-resize" data-resize="row"></div>'
        : ''
    return `
            <div class="row" data-type="resize" >
                <div class="row-info">
                    ${info ? info : ''}
                    ${resize}
                </div>
                <div class="row-data">
                    ${content || ''}
                </div>
            </div>
            `
}

function createColumn(content, index) {
    return `
            <div class="column" data-type="resize" data-index="${index}">
                ${content}
                <div class="col-resize" data-resize="col"></div>
            </div>`
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 34) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createColumn)
        .join('')

    rows.push(createRow('', cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('');
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}