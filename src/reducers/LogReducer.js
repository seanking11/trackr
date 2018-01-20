import {
  UPDATE_SLIDER,
  MOODS_FETCH_SUCCESS
} from '../actions/types'

const initialState = {
  moodValue: '',
  dateLogged: '',
  moods: []
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case UPDATE_SLIDER:
      return { ...state, moodValue: action.value }
    case MOODS_FETCH_SUCCESS:
      return { ...state, moods: action.payload }
    default:
      return state
  }
}
