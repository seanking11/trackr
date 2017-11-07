import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  LOG_MOOD_SUCCESS,
  UPDATE_SLIDER,
  MOODS_FETCH_SUCCESS
} from './types'

export const logMoodSuccess = date => ({
  type: LOG_MOOD_SUCCESS,
  date
})

export const updateSlider = value => ({
  type: UPDATE_SLIDER,
  value
})

export const logMood = ({ moodValue, dateLogged }) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/moods/${currentUser.uid}`)
      .push({ moodValue, dateLogged })
      .then(dispatch({ type: LOG_MOOD_SUCCESS }))
  }
}

export const moodsFetch = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/moods/${currentUser.uid}`)
      .on('value', snapshot => {
        dispatch({ type: MOODS_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}
