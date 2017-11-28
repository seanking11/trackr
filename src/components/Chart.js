import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis
} from 'victory-native'
import { View } from 'react-native'
import { moodsFetch } from '../actions'
import selectors from '../selectors/selectors'
import { Gradient, CirclesSection } from './index'
import Colors from './common/Colors'

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
  },
  viewStyles: {
    backgroundColor: Colors.cardBackground,
    paddingBottom: 15,
    marginRight: 20,
    marginLeft: 20,
    paddingLeft: -20,
    marginVertical: 10,
    borderRadius: 5
  }
}

class Chart extends Component {
  componentWillMount() {
    this.props.moodsFetch()
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <VictoryChart
          domainPadding={{ x: 40, y: 0 }}
          height={200}
          width={350}
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
            data={this.props.moods}
            x='day'
            y='moodAverage'
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

const mapStateToProps = state => ({
  moods: selectors.pastWeek(state)
})

export default connect(mapStateToProps, { moodsFetch })(Chart)
