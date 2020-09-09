import {TableActionTypes,ADD_ROW,GET_ROWS } from './types'
import {tblRow} from '../../commomTypes'
import { ThunkAction } from 'redux-thunk'

import {TableState} from './reducer'
import {Action} from 'redux'
import { useDispatch } from 'react-redux'

// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(newRow: tblRow): TableActionTypes {
  return {
    type: ADD_ROW,
    payload: newRow
  }
}

export function getRow(newRows: tblRow[]): TableActionTypes {
  return {
    type: GET_ROWS,
    payload: newRows
  }
}

//const dispatch = useDispatch()

// https://redux.js.org/recipes/usage-with-typescript#overview
export const getRows = (): ThunkAction<void, TableState, unknown, Action<string>> => async dispatch =>{
  
  const asyncResp = await fetchRows<tblRow>()
  dispatch(getRow(asyncResp))

}

function fetchRows<T>():Promise<T[]> {
  return fetch("http://localhost:5000/walking")
    .then(response => response.json() as Promise<T[]>)
}



