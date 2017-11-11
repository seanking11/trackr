import React, { Component } from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme
} from 'victory-native'
import { View, Text } from 'react-native'

const data1992 = [
  { quarter: 3, earnings: 14250 },
  { quarter: 2, earnings: 16500 },
  { quarter: 1, earnings: 13000 },
  { quarter: 4, earnings: 19000 }
]

const animation = {
  duration: 2000,
  onLoad: { duration: 1000 }
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
          domainPadding={40}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`$${x / 1000}k`)}
          />
          <VictoryBar
            style={{
              data: { width: 13, strokeWidth: 0, fill: 'navy' },
              labels: { fill: 'white' }
            }}
            data={data1992}
            x='quarter'
            y='earnings'
            animate={animation}
          />
        </VictoryChart>
      </View>
    )
  }
}

export { Chart as default }
