import React, { Component } from 'react'
import { View, Slider } from 'react-native'
import { Button, CardSection } from './common'
import DataList from './DataList'

const styles = {
  containerStyles: {
    marginTop: 40
  }
}

class MoodLogger extends Component {
  state = { sliderVal: 5 }

  componentDidMount() {
    console.log(this.state.sliderVal)
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
            onSlidingComplete={this.onSlide}
          />
        </View>

        <CardSection>
          <Button onPress={console.log(this.state.sliderVal)}>Log Data</Button>
        </CardSection>

        <CardSection>
          <DataList />
        </CardSection>
      </View>
    )
  }
}

export default MoodLogger
