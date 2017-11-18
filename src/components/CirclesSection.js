import React from 'react'
import { View } from 'react-native'
import CircleLabel from './CircleLabel'
import Colors from './common/Colors'

const styles = {
  viewStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  }
}

const CirclesSection = ({ compared }) => (
  <View style={styles.viewStyle}>
    <CircleLabel
      topColor={Colors.moodGreenTop}
      bottomColor={Colors.moodGreenBottom}
    >
      Mood
    </CircleLabel>
    <CircleLabel
      topColor={compared.topColor}
      bottomColor={compared.bottomColor}
    >
      {compared.name}
    </CircleLabel>
  </View>
)

export { CirclesSection as default }
