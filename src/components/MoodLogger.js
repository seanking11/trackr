import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Slider } from 'react-native'
import { Button, CardSection } from './common'
import DataList from './DataList'
import { logMood, updateSlider } from '../actions'

const styles = {
  containerStyles: {
    marginTop: 40
  }
}

class MoodLogger extends Component {
  state = { sliderVal: 5 }

  onButtonPress = () => {
    const { moodValue, dateLogged } = this.props

    this.props.logMood({ moodValue, dateLogged })
  }

  render() {
    return (
      <View style={styles.containerStyles}>
        <View>
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

        <CardSection>
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
