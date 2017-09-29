import { combineReducers } from 'redux';
import pageReducer from './pageReducers.js';

const reducer = combineReducers({
    page : pageReducer,
});

export default reducer;
