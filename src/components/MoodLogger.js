import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Slider, Text } from 'react-native'
import { Button, CardSection } from './common'
import DataList from './DataList'
import { logMood, updateSlider } from '../actions'

class MoodLogger extends Component {
  state = { sliderVal: 5 }

  onButtonPress = () => {
    const { moodValue } = this.props
    const dateLogged = new Date().getTime()

    this.props.logMood({ moodValue, dateLogged })
  }

  sliderValueChange = value => {
    this.setState({
      sliderVal: value
    })
  }

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <View>
          <Text style={{ color: 'white' }}>{this.state.sliderVal}</Text>
          <Slider
            maximumValue={10}
            minimumValue={0}
            step={1}
            value={this.state.sliderVal}
            onValueChange={value => this.sliderValueChange(value)}
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
  const { moodValue } = state.log

  return { moodValue }
}

export default connect(mapStateToProps, { updateSlider, logMood })(MoodLogger)
