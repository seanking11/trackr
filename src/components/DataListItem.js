import React from 'react'
import { ListItem } from 'react-native-elements'

const DataListItem = ({ moodValue, dateLogged }) => {
  const img = `https://raw.githubusercontent.com/seanking11/trackr/master/assets/moods/Mood${moodValue}.png`

  return (
    <ListItem
      roundAvatar
      title={moodValue}
      subtitle={new Date(dateLogged).toString()}
      avatar={img}
      containerStyle={{ borderBottomWidth: 0 }}
    />
  )
}

export { DataListItem as default }
