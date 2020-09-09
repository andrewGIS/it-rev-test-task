import {combineReducers} from 'redux';
import {TableReducer} from './reducer'

// export const rootReducer = combineReducers({
//     table:TableReducer
// })

export type RootState = ReturnType<typeof TableReducer>
