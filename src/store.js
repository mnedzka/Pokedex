import { createStore } from 'redux';
import reducer from './Reducers/reducer.js';

let store = createStore(reducer);
store.subscribe(() => {
    console.log(store.getState());
});

export default store;
