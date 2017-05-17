import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import reducers from './reducers/index';
import actions from './actions/index';
import thunk from 'redux-thunk';
let reduxStore;

// create a redux store
if(window.devToolsExtension){
  reduxStore = createStore(reducers, compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension() ) );
} else {
  reduxStore = createStore(reducers, compose(applyMiddleware(thunk) ) );
}

// expose the store for your component to use
export default reduxStore;
