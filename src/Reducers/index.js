import { combineReducers } from 'redux';
import pageReducer from './pageReducer';
import listReducer from './listReducer';
import compareReducer from './compareReducer';

const reducer = combineReducers({
    page : pageReducer,
    pokelist : listReducer,
    compare : compareReducer,
});


export default reducer
