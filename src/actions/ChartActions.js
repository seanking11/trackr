import AppleHealthKit from 'rn-apple-healthkit'
import {
  UPDATE_COMPARED_ID,
  STEPS_FETCH_SUCCESS,
  SLEEP_FETCH_SUCCESS
} from './types'
import { createDateArray } from '../utility'

const weekInMs = 518400000
const aWeekAgo = new Date(new Date().getTime() - weekInMs)

export const updateComparedId = comparedId => ({
  type: UPDATE_COMPARED_ID,
  comparedId
})

export const stepsFetchWeek = () => {
  const weekOfStepsArr = createDateArray({ steps: 0 })
  weekOfStepsArr.forEach(entry => {
    let stepValue = 0
    const options = {
      date: entry.fullDate.toISOString()
    }

    AppleHealthKit.getStepCount(options: Object, (err: Object, results: Object) => {
      if (err) {
        console.log('Error fetching step data from HK: ', err) // eslint-disable-line no-console
        return 0
      }
      console.log(results) // eslint-disable-line no-console
      stepValue = results.value
      entry.steps = stepValue
    })
  })

  return (dispatch) => {
    dispatch({ type: STEPS_FETCH_SUCCESS, payload: weekOfStepsArr })
  }
}

export const sleepFetch = () => {
  const options = {
    startDate: aWeekAgo.toISOString(),
    endDate: (new Date()).toISOString()
  }

  return (dispatch) => {
    AppleHealthKit.getSleepSamples(options, (err: Object, results: Array<Object>) => {
      if (err) {
        console.log('Error fetching sleep data from HK: ', err) // eslint-disable-line no-console
        return
      }
      dispatch({ type: SLEEP_FETCH_SUCCESS, payload: results })
    })
  }
}
