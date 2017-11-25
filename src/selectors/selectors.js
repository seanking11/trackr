import { createSelector } from 'reselect'

const selectors = {}
const formatDate = date => new Date(date).toDateString().slice(4)

const dateNumToString = number => {
  switch (number) {
    case 1:
      return 'S'
    case 2:
      return 'M'
    case 3:
      return 'T'
    case 4:
      return 'W'
    case 5:
      return 'R'
    case 6:
      return 'F'
    case 7:
      return 'S'
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
  allMoods => allMoods.map(entry => {
    const dateObj = new Date(entry.dateLogged)
    const today = new Date()
    const weekInMs = 604800000

    if ((today.getTime() - entry.dateLogged) < weekInMs) {
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
    }

    return {}
  })
)

selectors.pastWeek = createSelector(
  selectors.allMoods,
  allMoods => {
    const dataArray = [
      {
        day: 6,
        mood: 3
      },
      {
        day: 7,
        mood: 3
      },
      {
        day: 1,
        mood: 3
      },
      {
        day: 2,
        mood: 3
      },
      {
        day: 3,
        mood: 3
      },
      {
        day: 4,
        mood: 3
      },
      {
        day: 5,
        mood: 3
      }
    ]
    allMoods.forEach(entry => {
      const dateObj = new Date(entry.dateLogged)
      const today = new Date()
      const weekInMs = 604800000

      // Show me everything in the past week
      if ((today.getTime() - entry.dateLogged) < weekInMs) {
        dataArray.push({
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
