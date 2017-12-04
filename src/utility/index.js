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

export const createDateArray = () => {
  const array = []
  let currentDayOfWeek = (new Date().getDay()) + 1

  for (let i = 0; i < 7; i++) {
    if (currentDayOfWeek >= 7) {
      currentDayOfWeek = 0
    }
    array.push({
      moodTotal: 0,
      numMoodsInDay: 0,
      moodAverage: 0,
      day: dateNumToString(currentDayOfWeek)
    })

    currentDayOfWeek += 1
  }
  return array
}
