import React, { Component } from 'react'
import _ from 'lodash'
import { FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import { moodsFetch } from '../actions'

class DataList extends Component {
  componentWillMount() {
    this.props.moodsFetch()
  }

  componentWillReceiveProps() {
    console.log(this.props)
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({ item }) => <Text>{item.moodValue} - {new Date(item.dateLogged).toString()}</Text>}
      />
    )
  }
}

const mapStateToProps = state => {
  const data = _.map(state.log.moods, (val, uid) => {
    return { ...val, uid }
  })

  return { data }
}

export default connect(mapStateToProps, { moodsFetch })(DataList)
