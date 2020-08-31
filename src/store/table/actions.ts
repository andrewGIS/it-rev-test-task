import {TableRow, TableActionTypes,ADD_ROW } from './types'




// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(newRow: TableRow): TableActionTypes {
  return {
    type: ADD_ROW,
    payload: newRow
  }
}