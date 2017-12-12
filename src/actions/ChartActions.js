import AppleHealthKit from 'rn-apple-healthkit'
import {
  UPDATE_COMPARED_ID,
  STEPS_FETCH_SUCCESS,
  SLEEP_FETCH_SUCCESS
} from './types'

export const updateComparedId = comparedId => ({
  type: UPDATE_COMPARED_ID,
  comparedId
})

export const sleepFetch = () => {
  const weekInMs = 518400000
  const aWeekAgo = new Date(new Date().getTime() - weekInMs)
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
      console.log(results) // eslint-disable-line no-console
      dispatch({ type: SLEEP_FETCH_SUCCESS, payload: results })
    })
  }
}
