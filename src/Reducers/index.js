import pageReducer from './pageReducer';
import listReducer from './listReducer';
import compareReducer from './compareReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    page : pageReducer,
    pokelist : listReducer,
    compare : compareReducer,
})
