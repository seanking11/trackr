import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import firebase from 'firebase'
import reducers from './src/reducers'
import Router from './src/Router'

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk, promiseMiddleware)))

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
