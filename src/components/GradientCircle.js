import React from 'react'
import Svg, { Circle } from 'react-native-svg'
import Gradient from './Gradient'

const GradientCircle = ({
  topColor,
  bottomColor,
  size = 25,
  strokeWidth = 2.5
}) => (
  <Svg
    width={size}
    height={size}
  >
    <Gradient
      id='linearGradient'
      topColor={topColor}
      bottomColor={bottomColor}
    />
    <Circle
      cx={size / 2}
      cy={size / 2}
      r={(size / 2) - (strokeWidth * 2)}
      stroke='url(#linearGradient)'
      strokeWidth={strokeWidth}
      fill='transparent'
    />
  </Svg>
)

export { GradientCircle as default }
