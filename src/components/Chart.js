import React, { Component } from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis
} from 'victory-native'
import { View, Text } from 'react-native'
import { Gradient, CirclesSection } from './index'
import Colors from './common/Colors'

const mockData = [
  { mood: 7, day: 'S' },
  { mood: 3, day: 'M' },
  { mood: 5, day: 'T' },
  { mood: 6, day: 'W' },
  { mood: 7, day: 'R' },
  { mood: 10, day: 'F' },
  { mood: 8, day: 'S' }
]

const animation = {
  duration: 2000,
  onLoad: { duration: 1000 }
}

const styles = {
  victoryBarStyles: {
    data: {
      width: 1,
      strokeWidth: 4,
      stroke: 'url(#linearGradient)',
      fill: 'url(#linearGradient)',
      strokeLinejoin: 'round'
    },
    parent: {
      backgroundColor: Colors.cardBackground
    }
  }
}

class Chart extends Component {
  componentWillMount() {
    console.log('hi')
  }

  render() {
    return (
      <View>
        <Text>Moods</Text>
        <VictoryChart
          domainPadding={{ x: 40, y: 0 }}
          height={200}
        >
          <Gradient
            id='linearGradient'
            topColor={Colors.moodGreenTop}
            bottomColor={Colors.moodGreenBottom}
          />
          <VictoryAxis
            style={{
              axis: { stroke: Colors.textColor, strokeWidth: 0.5 },
              ticks: { fill: Colors.textColor },
              tickLabels: { padding: 4, fill: Colors.textColor }
            }}
            offsetY={45}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[0, 10]}
            style={{
              axis: { stroke: null },
              ticks: { stroke: null },
              tickLabels: { padding: 4, fill: Colors.textColor }
            }}
          />
          <VictoryBar
            style={styles.victoryBarStyles}
            data={mockData}
            x='day'
            y='mood'
            animate={animation}
          />
        </VictoryChart>
        <CirclesSection
          compared={{
            name: 'Steps',
            topColor: '#FFEE00',
            bottomColor: '#FF00A7'
          }}
        />
      </View>
    )
  }
}

export { Chart as default }
