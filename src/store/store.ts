import {createStore, applyMiddleware} from 'redux';
import {TableReducer} from '../store/table/reducer'
import thunk from 'redux-thunk';

const store = createStore(TableReducer,applyMiddleware(thunk))

export {store}