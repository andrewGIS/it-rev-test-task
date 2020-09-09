import {createStore, applyMiddleware} from 'redux';
//import {rootReducer} from '../store/table/index'
import {TableReducer} from '../store/table/reducer'
import thunk from 'redux-thunk';
import { GET_ROWS } from './table/types';
import { getRows } from './table/actions';
import {useDispatch} from 'react-redux'


const store = createStore(TableReducer,applyMiddleware(thunk))
//store.dispatch(getRows())

//store.dispatch(getRows())

export {store}