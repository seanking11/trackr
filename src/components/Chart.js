import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryBar,
  VictoryAxis,
  VictoryGroup,
  VictoryLabel
} from 'victory-native'
import { View } from 'react-native'
import Svg, { G } from 'react-native-svg'
import { moodsFetch } from '../actions'
import selectors from '../selectors/selectors'
import { Gradient, CirclesSection } from './index'
import Colors from './common/Colors'
import { createDateArray } from '../utility'

const animation = {
  duration: 2000,
  onLoad: { duration: 1000 }
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

const domainPadding = { x: 30, y: 15 }

class Chart extends Component {
  componentWillMount() {
    this.props.moodsFetch()
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
                tickLabels: { padding: 4, fill: Colors.textColor },
                axisLabel: { fill: Colors.textColor }
              }}
              offsetX={50}
              label='Mood'
              axisLabelComponent={<VictoryLabel dy={-120} textAnchor='start' />}
            />
            <VictoryAxis
              dependentAxis
              orientation='right'
              standalone={false}
              tickValues={this.props.compared.domain}
              domain={this.props.compared.domain}
              style={{
                axis: { stroke: null },
                ticks: { stroke: null },
                tickLabels: { padding: 4, fill: Colors.textColor },
                axisLabel: { fill: Colors.textColor }
              }}
              label={this.props.compared.category}
              axisLabelComponent={<VictoryLabel dy={-133} />}
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

export default connect(mapStateToProps, { moodsFetch })(Chart)
