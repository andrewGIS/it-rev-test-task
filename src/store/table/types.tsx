import { tblRow, order } from '../../commomTypes'

export const ADD_ROW = 'ADD_ROW'
export const GET_ROWS = 'GET_ROWS'

interface AddRowAction {
    type: typeof ADD_ROW,
    payload: tblRow
}

interface GetRowAction {
    type: typeof GET_ROWS,
    payload: tblRow[]
}

export type TableActionTypes = AddRowAction|GetRowAction