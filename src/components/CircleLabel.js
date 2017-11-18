import React from 'react'
import { View, Text } from 'react-native'
import GradientCircle from './GradientCircle'

const styles = {
  textStyle: {
    color: 'white'
  },
  viewStyle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
}

const CircleLabel = ({
  children,
  topColor,
  bottomColor
}) => (
  <View style={styles.viewStyle}>
    <GradientCircle
      size={25}
      topColor={topColor}
      bottomColor={bottomColor}
    />
    <Text style={styles.textStyle}>{children}</Text>
  </View>
)

export { CircleLabel as default }
