import { tblRow } from '../../commomTypes'

export const SET_ROWS = 'SET_ROWS'

interface SetRowsAction {
    type: typeof SET_ROWS,
    payload: tblRow[]
}

export type TableActionTypes = SetRowsAction