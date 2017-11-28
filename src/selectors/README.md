# Selectors Documentation

## `selectors.pastWeek`

1. Create a `dataArray` that will be the array passed to the Chart.
2. Populate `dataArray` with the days of the week so that the current day (Tuesday, Wednesday, etc) is the last in the array.
3. For each mood entry in Firebase, if it was entered in the past week...
4. Find the same day of the week in `dataArray` and update the corresponding values.

```
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
```

## Array Matrix Function

```
const theNumFunc = (varNum, lastNum) => {
  const lastIndexOfArray = 6
  if (lastNum > varNum) {
    return (lastIndexOfArray - (lastNum - varNum))
  }

  return (varNum - lastNum) - 1
}
```
