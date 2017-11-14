import React from 'react'
import { Defs, Stop, LinearGradient } from 'react-native-svg'

const Gradient = ({ id, topColor, bottomColor }) => (
  <Defs>
    <LinearGradient
      id={id}
      x1='0%'
      y1='0%'
      x2='0%'
      y2='100%'
    >
      <Stop offset='0%' stopColor={topColor} />
      <Stop offset='100%' stopColor={bottomColor} />
    </LinearGradient>
  </Defs>
)

export { Gradient as default }
