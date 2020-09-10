import {
    SET_ROWS,
    TableActionTypes
} from './types'
import {tblRow} from '../../commomTypes'
export interface TableState {
    tableRows: tblRow[]
}

const INIT_STATE: TableState = {
    tableRows:[]
}
export function TableReducer(state=INIT_STATE, action:TableActionTypes ):TableState{
    switch (action.type) {
        case SET_ROWS:
            return {
                ...state, tableRows:action.payload
            }
        default:
            return state;
    }
}