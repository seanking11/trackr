const weekdays = ['Su', 'M', 'T', 'W', 'R', 'F', 'Sa']
const dayInMS = 86400000

export const dateNumToString = number => {
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

export const formatDate = date => new Date(date).toDateString().slice(4)

export const lastOccurrenceOf = (weekDay) => {
  const desiredIndex = weekdays.indexOf(weekDay)
  const currentDate = new Date()
  const daysDifference = (currentDate.getDay() - desiredIndex + 6) % 7 + 1 // eslint-disable-line no-mixed-operators
  if (daysDifference === 7) {
    return new Date()
  }
  return new Date(currentDate.getTime() - (dayInMS * daysDifference))
}

// If passed an object, creates an array of objects that has all the properties
// you passed in AND now has a day: property that is the past 7 days,
// starting with today, as a string ie. 'W', 'Sa', etc.
// If no object is passed, it returns an array of strings of days of the week
export const createDateArray = (objectToMerge) => {
  const array = []
  let currentDayOfWeek = (new Date().getDay()) + 1

  for (let i = 0; i < 7; i++) {
    if (currentDayOfWeek >= 7) {
      currentDayOfWeek = 0
    }
    if (objectToMerge) {
      array.push({
        ...objectToMerge,
        fullDate: lastOccurrenceOf(dateNumToString(currentDayOfWeek)),
        day: dateNumToString(currentDayOfWeek)
      })
    } else {
      array.push(dateNumToString(currentDayOfWeek))
    }

    currentDayOfWeek += 1
  }
  return array
}

export const makeSleepDataArray = (rawSleepData) => {
  const dataArray = createDateArray({ sleep: 0 })

  rawSleepData.forEach(entry => {
    if (entry.value === 'ASLEEP') {
      const dateObj = new Date(entry.endDate)
      for (let i = 0; i < dataArray.length; i++) {
        if (dateNumToString(dateObj.getDay()) === dataArray[i].day) {
          const start = new Date(entry.startDate)
          const end = new Date(entry.endDate)
          const amtToAdd = (Math.abs(start - end) / 36e5) // Converts to hours
          dataArray[i].sleep += amtToAdd
        }
      }
    }
  })

  return dataArray
}
