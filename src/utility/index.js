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
        day: dateNumToString(currentDayOfWeek)
      })
    } else {
      array.push(dateNumToString(currentDayOfWeek))
    }

    currentDayOfWeek += 1
  }
  return array
}
