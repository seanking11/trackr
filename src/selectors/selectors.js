import { createSelector } from 'reselect'
import {
  formatDate,
  dateNumToString,
  createDateArray
} from '../utility'

const selectors = {}

selectors.log = state => state.log
selectors.moods = state => state.log.moods

selectors.allMoods = createSelector(
  selectors.moods,
  mood => Object.keys(mood).map(k => mood[k])
)

selectors.pastWeek = createSelector(
  selectors.allMoods,
  allMoods => {
    const dataArray = createDateArray()

    allMoods.forEach(entry => {
      const today = new Date()
      const weekInMs = 604800000

      if ((today.getTime() - entry.dateLogged) < weekInMs) {
        const dateObj = new Date(entry.dateLogged)
        for (let i = 0; i < dataArray.length; i++) {
          if (dateNumToString(dateObj.getDay()) === dataArray[i].day) {
            dataArray[i].moodTotal += entry.moodValue
            dataArray[i].numMoodsInDay += 1
            dataArray[i].moodAverage = (dataArray[i].moodTotal / dataArray[i].numMoodsInDay)
          }
        }
      }
    })

    return dataArray
  }
)

selectors.data = createSelector(
  selectors.allMoods,
  allMoods => allMoods.map(entry => {
    const dateObj = new Date(entry.dateLogged)
    return ({
      mood: entry.moodValue,
      day: dateNumToString(dateObj.getDay()),
      date: {
        month: dateObj.getMonth(),
        dayOfMonth: dateNumToString(dateObj.getDay()),
        dayOfWeek: dateObj.getDate(),
        hour: dateObj.getHours(),
        formattedDate: formatDate(dateObj)
      }
    })
  })
)

export default selectors
