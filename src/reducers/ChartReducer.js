import {
  UPDATE_COMPARED_ID,
  STEPS_FETCH_SUCCESS,
  SLEEP_FETCH_SUCCESS
} from '../actions/types'
import Colors from '../components/common/Colors'
import { makeSleepDataArray } from '../utility'

// Find better way to store options - maybe in firebase?
const initialState = {
  comparedId: 0,
  compared: {
    category: 'Steps',
    y: (d) => d.steps / 1000,
    domain: { y: [0, 10000] },
    tickValues: [0, 10000],
    data: [
      { day: 'R', steps: 7535 },
      { day: 'F', steps: 6600 },
      { day: 'Sa', steps: 6137 },
      { day: 'Su', steps: 929 },
      { day: 'M', steps: 2305 },
      { day: 'T', steps: 1929 },
      { day: 'W', steps: 1036 }
    ],
    colors: {
      top: Colors.stepsTop,
      bottom: Colors.stepsBottom
    }
  },
  comparedOptions: {
    0: {
      id: 0,
      category: 'Steps',
      y: (d) => d.steps / 1000,
      domain: { y: [0, 10000] },
      tickValues: [0, 10000],
      data: [
        { day: 'R', steps: 7535 },
        { day: 'F', steps: 6600 },
        { day: 'Sa', steps: 6137 },
        { day: 'Su', steps: 929 },
        { day: 'M', steps: 2305 },
        { day: 'T', steps: 1929 },
        { day: 'W', steps: 1036 }
      ],
      colors: {
        top: Colors.stepsTop,
        bottom: Colors.stepsBottom
      }
    },
    1: {
      id: 1,
      category: 'Sleep',
      y: 'sleep',
      domain: [0, 10],
      data: [],
      colors: {
        top: Colors.sleepTop,
        bottom: Colors.sleepBottom
      }
    }
  }
}

export default (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case UPDATE_COMPARED_ID:
      return { ...state, comparedId: action.comparedId, compared: state.comparedOptions[action.comparedId] }
    case STEPS_FETCH_SUCCESS:
      return {
        ...state,
        sleep: action.payload,
        comparedOptions: {
          ...state.comparedOptions,
          0: {
            ...state.comparedOptions[0],
            data: action.payload
          }
        }
      }
    case SLEEP_FETCH_SUCCESS:
      return {
        ...state,
        sleep: action.payload,
        comparedOptions: {
          ...state.comparedOptions,
          1: {
            ...state.comparedOptions[1],
            data: makeSleepDataArray(action.payload)
          }
        }
      }
    default:
      return state
  }
}
