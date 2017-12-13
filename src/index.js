import React from 'react';
import { render } from 'react-dom'
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './index.reducer'

const middleware = [ thunk ]
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)  
registerServiceWorker();
