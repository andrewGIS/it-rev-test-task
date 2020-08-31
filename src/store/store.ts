import {createStore} from 'redux';
import {allReducers} from '../store/table/index'

const store = createStore(allReducers)

export default store