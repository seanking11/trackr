import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'

export const emailChanged = email => ({
  type: EMAIL_CHANGED,
  email
})

export const passwordChanged = password => ({
  type: PASSWORD_CHANGED,
  password
})

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    user
  })

  Actions.main()
}

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER })

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      console.log(error)
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch))
    })
}
