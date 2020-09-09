import {
    ADD_ROW,
    TableActionTypes,
    GET_ROWS
} from './types'
import {tblRow} from '../../commomTypes'

import {getRows} from './actions'

import {useDispatch} from 'react-redux'
import { ThunkAction } from 'redux-thunk'


export interface TableState {
    tableRows: tblRow[]
}

const INIT_STATE: TableState = {
    // tableRows: [
    //     {
    //         id: 1,
    //         date: "2019-07-24T09:24:06.364Z",
    //         distance: 12500
    //     },
    //     {
    //         id: 2,
    //         date: "2019-07-24T09:25:44.252Z",
    //         distance: 7500
    //     },
    //     {
    //         id: 3,
    //         date: "2019-07-24T09:35:06.654Z",
    //         distance: 21000
    //     }
    // ]
    tableRows:[]
}
export function TableReducer(state=INIT_STATE, action:TableActionTypes ):TableState{
    switch (action.type) {
        case ADD_ROW:
            return {...state, tableRows:[...state.tableRows, action.payload]}

        case GET_ROWS:
            return {
                ...state, tableRows:action.payload
            }
        

        default:
            return state;
    }
}

// const fetchRows = () => {
//     return (useDispatch:any) => {
//         fetch ("http://localhost:5000/walking")
//         .then (response:Response => {
//             useDispatch(GET_ROWS(response.data))
//             console.log(response.data)
//         })
//         .catch (error => {
//             console.log(error.message)
//         })
//     }
// }