import React, { Component } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'
import reducers from './src/reducers'
import Router from './src/Router'

const store = createStore(reducers, {}, compose(
  applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDgsfUtMGM-hiIKw3jv2NHA2jBFN1yBNoA',
      authDomain: 'trackr-9547d.firebaseapp.com',
      databaseURL: 'https://trackr-9547d.firebaseio.com',
      projectId: 'trackr-9547d',
      storageBucket: 'trackr-9547d.appspot.com',
      messagingSenderId: '941461849064'
    }

    firebase.initializeApp(config)
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
