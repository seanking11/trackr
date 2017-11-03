import React from 'react'
import { Text, View } from 'react-native'

const styles = {
  viewStyles: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  textStyle: {
    fontSize: 20
  }
}

const Header = props => {
  const { textStyle, viewStyles } = styles

  return (
    <View style={viewStyles}>
      <Text style={textStyle}>{props.text}</Text>
    </View>
  )
}

export default Header
