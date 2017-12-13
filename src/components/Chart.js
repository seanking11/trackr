import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryBar,
  VictoryAxis,
  VictoryGroup
} from 'victory-native'
import { View } from 'react-native'
import AppleHealthKit from 'rn-apple-healthkit'
import Svg, { G } from 'react-native-svg'
import { moodsFetch, stepsFetchWeek, sleepFetch } from '../actions'
import selectors from '../selectors/selectors'
import { Gradient, CirclesSection } from './index'
import Colors from './common/Colors'
import { createDateArray } from '../utility'

const animation = {
  duration: 500,
  onLoad: { duration: 500 }
}

const styles = {
  leftBarStyles: {
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
  rightBarStyles: {
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
  cardViewStyles: {
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

const options = {
  permissions: {
    read: ['Height', 'Weight', 'StepCount', 'DateOfBirth', 'SleepAnalysis'],
    write: ['Weight', 'StepCount', 'BodyMassIndex']
  }
}

const domainPadding = { x: 30, y: 15 }

class Chart extends Component {
  componentWillMount() {
    this.props.moodsFetch()

    // eslint-disable-next-line no-unused-vars
    AppleHealthKit.initHealthKit(options: Object, (err: string, results: Object) => {
      if (err) {
        console.log('error initializing Healthkit: ', err) // eslint-disable-line no-console
      }
      this.props.stepsFetchWeek()
      this.props.sleepFetch()
    })
  }

  render() {
    return (
      <View style={styles.cardViewStyles}>
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
              topColor={this.props.compared.colors.top}
              bottomColor={this.props.compared.colors.bottom}
            />
            <VictoryAxis
              style={{
                axis: { stroke: Colors.textColor, strokeWidth: 0.5 },
                ticks: { fill: Colors.textColor },
                tickLabels: { padding: 4, fill: Colors.textColor }
              }}
              offsetY={45}
              standalone={false}
              tickValues={createDateArray(false)}
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
              tickValues={this.props.compared.tickValues || this.props.compared.domain}
              domain={this.props.compared.domain}
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
                style={styles.leftBarStyles}
                data={this.props.moods}
                x='day'
                y='moodAverage'
                animate={animation}
                standalone={false}
              />
              <VictoryBar
                style={styles.rightBarStyles}
                data={this.props.compared.data}
                x='day'
                y={this.props.compared.y}
                animate={animation}
                standalone={false}
              />
            </VictoryGroup>
          </G>
        </Svg>
        <CirclesSection
          compared={{
            name: this.props.compared.category,
            topColor: this.props.compared.colors.top,
            bottomColor: this.props.compared.colors.bottom
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  moods: selectors.pastWeek(state),
  comparedId: state.chart.comparedId,
  compared: state.chart.compared
})

export default connect(mapStateToProps, { moodsFetch, stepsFetchWeek, sleepFetch })(Chart)
