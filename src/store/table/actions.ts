import {TableActionTypes,SET_ROWS } from './types'
import {tblRow} from '../../commomTypes'
import {ThunkAction } from 'redux-thunk'
import {Action} from 'redux'
import {TableState} from './reducer'

// TypeScript infers that this function is returning SendMessageAction

export function setRows(newRows: tblRow[]): TableActionTypes {
  return {
    type: SET_ROWS,
    payload: newRows
  }
}

//const dispatch = useDispatch()

// https://redux.js.org/recipes/usage-with-typescript#overview
export const fetchRows = (): ThunkAction<void, TableState, unknown, Action<string>> => async dispatch =>{
  
  const asyncResp = await requestData<tblRow>()
  dispatch(setRows(asyncResp))

}

function requestData<T>():Promise<T[]> {
  return fetch("http://localhost:5000/walking")
    .then(response => response.json() as Promise<T[]>)
}



