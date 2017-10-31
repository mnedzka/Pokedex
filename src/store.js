import { createStore } from 'redux';
import reducer from './Reducers';

let Store = createStore(reducer);
Store.subscribe(() => {
    console.log('### STATE -> ', Store.getState());
});

export default Store;
