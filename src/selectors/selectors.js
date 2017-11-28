import { createSelector } from 'reselect'

const selectors = {}
const formatDate = date => new Date(date).toDateString().slice(4)

const dateNumToString = number => {
  switch (number) {
    case 0:
      return 'Su'
    case 1:
      return 'M'
    case 2:
      return 'T'
    case 3:
      return 'W'
    case 4:
      return 'R'
    case 5:
      return 'F'
    case 6:
      return 'Sa'
    default:
      return number
  }
}

selectors.log = state => state.log
selectors.moods = state => state.log.moods

selectors.allMoods = createSelector(
  selectors.moods,
  mood => Object.keys(mood).map(k => mood[k])
)

selectors.pastWeek = createSelector(
  selectors.allMoods,
  allMoods => {
    const dataArray = []
    let currentDayOfWeek = (new Date().getDay()) + 1

    for (let i = 0; i < 7; i++) {
      if (currentDayOfWeek >= 7) {
        currentDayOfWeek = 0
      }
      dataArray.push({
        moodTotal: 0,
        numMoodsInDay: 0,
        moodAverage: 0,
        day: dateNumToString(currentDayOfWeek)
      })

      currentDayOfWeek += 1
    }

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
