import {
  UPDATE_COMPARED_ID
} from '../actions/types'
import Colors from '../components/common/Colors'

// Find better way to store options - maybe in firebase?
const initialState = {
  comparedId: 0,
  compared: {
    category: 'Steps',
    y: (d) => d.steps / 1000,
    domain: [0, 1000],
    data: [
      { day: 'W', steps: 1070 },
      { day: 'R', steps: 2230 },
      { day: 'F', steps: 5630 },
      { day: 'Sa', steps: 6230 },
      { day: 'Su', steps: 4230 },
      { day: 'M', steps: 3230 },
      { day: 'T', steps: 8230 }
    ],
    colors: {
      top: Colors.stepsTop,
      bottom: Colors.stepsBottom
    }
  },
  comparedOptions: [
    {
      id: 0,
      category: 'Steps',
      y: (d) => d.steps / 1000,
      domain: [0, 1000],
      data: [
        { day: 'W', steps: 1070 },
        { day: 'R', steps: 2230 },
        { day: 'F', steps: 5630 },
        { day: 'Sa', steps: 6230 },
        { day: 'Su', steps: 4230 },
        { day: 'M', steps: 3230 },
        { day: 'T', steps: 8230 }
      ],
      colors: {
        top: Colors.stepsTop,
        bottom: Colors.stepsBottom
      }
    },
    {
      id: 1,
      category: 'Sleep',
      y: 'sleep',
      domain: [0, 10],
      data: [
        { day: 'W', sleep: 6 },
        { day: 'R', sleep: 7 },
        { day: 'F', sleep: 6.5 },
        { day: 'Sa', sleep: 8 },
        { day: 'Su', sleep: 7 },
        { day: 'M', sleep: 4 },
        { day: 'T', sleep: 5 }
      ],
      colors: {
        top: Colors.sleepTop,
        bottom: Colors.sleepBottom
      }
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMPARED_ID:
      return { ...state, comparedId: action.comparedId, compared: state.comparedOptions[action.comparedId] }
    default:
      return state
  }
}
