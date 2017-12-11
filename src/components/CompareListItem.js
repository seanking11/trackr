import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements'
import { updateComparedId } from '../actions'
import GradientCircle from './GradientCircle'
import Colors from './common/Colors'

class CompareListItem extends Component {
  onRowPress = () => {
    this.props.updateComparedId(this.props.id)
  }

  render() {
    return (
      <ListItem
        title={this.props.category}
        titleStyle={{
          color: Colors.textColor,
          paddingLeft: 10
        }}
        leftIcon={
          <GradientCircle
            topColor={this.props.colors.top}
            bottomColor={this.props.colors.bottom}
          />
        }
        hideChevron={!(this.props.comparedId === this.props.id)}
        containerStyle={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.cardBackground,
          borderTopWidth: 0
        }}
        rightIcon={{
          name: 'check',
          style: {
            color: Colors.activeCheckmark
          }
        }}
        onPress={this.onRowPress}
        underlayColor={Colors.cardBackground}
      />
    )
  }
}

const mapStateToProps = state => ({
  comparedId: state.chart.comparedId
})

export default connect(mapStateToProps, { updateComparedId })(CompareListItem)
