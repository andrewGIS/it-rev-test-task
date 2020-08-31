export const ADD_ROW = 'ADD_ROW'

export interface TableRow {
    id: number,
    date: string,
    distance: number
}

interface AddRowAction {
    type: typeof ADD_ROW,
    payload: TableRow
}

export type TableActionTypes = AddRowAction