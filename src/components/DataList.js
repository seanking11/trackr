import React, { Component } from 'react'
import _ from 'lodash'
import { ScrollView } from 'react-native'
import { List } from 'react-native-elements'
import { connect } from 'react-redux'
import { moodsFetch } from '../actions'
import DataListItem from './DataListItem'

class DataList extends Component {
  componentWillMount() {
    this.props.moodsFetch()
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.props.data.map(item => (
            <DataListItem
              moodValue={item.moodValue}
              dateLogged={item.dateLogged}
            />
          ))}
        </List>
      </ScrollView>
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
