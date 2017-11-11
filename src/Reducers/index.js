import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import listReducer from './listReducer';
import compareReducer from './compareReducer';

export default combineReducers({
    page : pageReducer,
    pokelist : listReducer,
    compare : compareReducer,
})
