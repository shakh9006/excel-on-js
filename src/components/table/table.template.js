const CODES = {
    A: 65,
    Z: 90
}

function createCell(content) {
    return `<div class="cell" contenteditable>${content || ''}</div>`
}

function createRow(info, content) {
    return `
            <div class="row">
                <div class="row-info">${info ? info : ''}</div>
                <div class="row-data">
                    ${content || ''}
                </div>
            </div>
            `
}

function createColumn(content) {
    return `<div class="column">${content}</div>`
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
            .fill(createCell())
            .join('');
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}