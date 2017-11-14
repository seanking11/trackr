import React from 'react'
import { View } from 'react-native'
import { Defs, Stop, LinearGradient, Rect } from 'react-native-svg'

const Bar = ({ height }) => (
  <View>
    <Defs>
      <LinearGradient
        id='linearGradient'
        x1='0%'
        y1='0%'
        x2='0%'
        y2='100%'
      >
        <Stop offset='0%' stopColor='blue' />
        <Stop offset='100%' stopColor='red' />
      </LinearGradient>
    </Defs>
    <Rect rx='5' ry='5' width='10' height={height} fill='url(#linearGradient)' />
  </View>
)

export { Bar as default }
