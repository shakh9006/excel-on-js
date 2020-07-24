export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.focus()
           .addClass(TableSelection.className)
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group
            .forEach(e => e.addClass(TableSelection.className))
    }

    clear() {
        this.group.forEach(s => s.removeClass(TableSelection.className))
        this.group = []
    }
}
