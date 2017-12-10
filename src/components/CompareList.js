import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { List } from 'react-native-elements'
import CompareListItem from './CompareListItem'
import Colors from './common/Colors'

const styles = {
  textStyles: {
    color: Colors.textColor,
    fontSize: 16
  },
  listContainerStyles: {
    backgroundColor: Colors.backgroundGray,
    borderTopColor: Colors.cardBackground
  },
  viewContainerStyles: {
    margin: 20
  }
}

const CompareList = ({ comparedOptions }) => (
  <View style={styles.viewContainerStyles}>
    <Text style={styles.textStyles}>
      Compare
    </Text>
    <List
      containerStyle={styles.listContainerStyles}
    >
      {comparedOptions.map(item => (
        <CompareListItem
          key={item.id}
          category={item.category}
          colors={item.colors}
          id={item.id}
        />
      ))}
    </List>
  </View>
)

const mapStateToProps = state => ({
  comparedOptions: state.chart.comparedOptions
})

export default connect(mapStateToProps, null)(CompareList)
