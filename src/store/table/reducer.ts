import {ADD_ROW,TableActionTypes} from './types'

interface TableRow {
    id: number,
    date: string,
    distance: number
}

interface TableState {
    tableRows: TableRow[]
}


const INIT_STATE: TableState = {
    tableRows: [
        {
            id: 1,
            date: "2019-07-24T09:24:06.364Z",
            distance: 12500
        },
        {
            id: 2,
            date: "2019-07-24T09:25:44.252Z",
            distance: 7500
        },
        {
            id: 3,
            date: "2019-07-24T09:35:06.654Z",
            distance: 21000
        }
    ]
}
export function TableReducer(state=INIT_STATE, action:TableActionTypes ):TableState{
    switch (action.type) {
        case ADD_ROW:
            return {tableRows:[...state.tableRows, action.payload]}
    
        default:
            return state;
    }
}