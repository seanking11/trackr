import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Slider, Text } from 'react-native'
import { Button, CardSection } from './common'
import DataList from './DataList'
import { logMood, updateSlider } from '../actions'

class MoodLogger extends Component {
  state = { sliderVal: 5 }

  onButtonPress = () => {
    const { moodValue, dateLogged } = this.props

    this.props.logMood({ moodValue, dateLogged })
  }

  render() {
    return (
      <View>
        <View>
          <Text style={{ color: 'white' }}>{this.props.moodValue || 5}</Text>
          <Slider
            maximumValue={10}
            minimumValue={0}
            step={1}
            value={this.state.sliderVal}
            onSlidingComplete={value => this.props.updateSlider(value)}
          />
        </View>

        <CardSection>
          <Button onPress={this.onButtonPress}>Log Data</Button>
        </CardSection>

        <CardSection style={{ padding: 0 }}>
          <DataList />
        </CardSection>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const { moodValue, dateLogged } = state.log

  return { moodValue, dateLogged }
}

export default connect(mapStateToProps, { updateSlider, logMood })(MoodLogger)
