import { combineReducers } from 'redux';
import pageReducer from './pageReducer.js';
import listReducer from './listReducer.js';

const reducer = combineReducers({
    page : pageReducer,
    pokelist : listReducer,
});


export default reducer
