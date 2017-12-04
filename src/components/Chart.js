import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryBar,
  VictoryAxis,
  VictoryGroup
} from 'victory-native'
import { View } from 'react-native'
import Svg, { G } from 'react-native-svg'
import { moodsFetch } from '../actions'
import selectors from '../selectors/selectors'
import { Gradient, CirclesSection } from './index'
import Colors from './common/Colors'

const animation = {
  duration: 2000,
  onLoad: { duration: 1000 }
}

const mockData = [
  { day: 'Su', steps: 4230 },
  { day: 'M', steps: 3230 },
  { day: 'T', steps: 8230 },
  { day: 'W', steps: 1070 },
  { day: 'R', steps: 2230 },
  { day: 'F', steps: 5630 },
  { day: 'Sa', steps: 6230 }
]

const styles = {
  victoryBarStyles: {
    data: {
      width: 1,
      strokeWidth: 4,
      stroke: 'url(#linearGradient)',
      fill: 'url(#linearGradient)',
      strokeLinejoin: 'round',
      marginLeft: 10
    },
    parent: {
      backgroundColor: Colors.cardBackground
    }
  },
  victoryBarStyles2: {
    data: {
      width: 1,
      strokeWidth: 4,
      stroke: 'url(#linearGradient2)',
      fill: 'url(#linearGradient2)',
      strokeLinejoin: 'round'
    },
    parent: {
      backgroundColor: Colors.cardBackground
    }
  },
  viewStyles: {
    backgroundColor: Colors.cardBackground,
    margin: 20,
    borderRadius: 5,
    maxHeight: 325,
    flex: 1
  },
  svgStyles: {
    flex: 1
  }
}

const domainPadding = { x: 30, y: 10 }

class Chart extends Component {
  componentWillMount() {
    this.props.moodsFetch()
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Svg
          style={styles.svgStyles}
          viewBox='0 0 375 300'
          preserveAspectRatio='xMidYMin meet'
        >
          <G>
            <Gradient
              id='linearGradient'
              topColor={Colors.moodGreenTop}
              bottomColor={Colors.moodGreenBottom}
            />
            <Gradient
              id='linearGradient2'
              topColor={Colors.stepsTop}
              bottomColor={Colors.stepsBottom}
            />
            <VictoryAxis
              style={{
                axis: { stroke: Colors.textColor, strokeWidth: 0.5 },
                ticks: { fill: Colors.textColor },
                tickLabels: { padding: 4, fill: Colors.textColor }
              }}
              offsetY={45}
              standalone={false}
              tickValues={['Su', 'M', 'T', 'W', 'R', 'F', 'Sa']}
              domainPadding={domainPadding}
            />
            <VictoryAxis
              dependentAxis
              orientation='left'
              standalone={false}
              tickValues={[0, 10]}
              domain={[0, 10]}
              style={{
                axis: { stroke: null },
                ticks: { stroke: null },
                tickLabels: { padding: 4, fill: Colors.textColor }
              }}
              offsetX={50}
            />
            <VictoryAxis
              dependentAxis
              orientation='right'
              standalone={false}
              tickValues={[0, 1000]}
              domain={[0, 1000]}
              style={{
                axis: { stroke: null },
                ticks: { stroke: null },
                tickLabels: { padding: 4, fill: Colors.textColor }
              }}
            />
            <VictoryGroup
              standalone={false}
              offset={10}
              domainPadding={domainPadding}
            >
              <VictoryBar
                style={styles.victoryBarStyles}
                data={this.props.moods}
                x='day'
                y='moodAverage'
                animate={animation}
                standalone={false}
              />
              <VictoryBar
                style={styles.victoryBarStyles2}
                data={mockData}
                x='day'
                y={(d) => d.steps / 1000}
                animate={animation}
                standalone={false}
              />
            </VictoryGroup>
          </G>
        </Svg>
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

const mapStateToProps = state => ({
  moods: selectors.pastWeek(state)
})

export default connect(mapStateToProps, { moodsFetch })(Chart)
