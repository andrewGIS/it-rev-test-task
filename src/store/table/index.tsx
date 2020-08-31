import {combineReducers} from 'redux';
import {TableReducer} from './reducer'

export const allReducers = combineReducers({
    table:TableReducer
})

//export type RootState = ReturnType<typeof allReducers>