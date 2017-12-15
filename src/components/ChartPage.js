import React from 'react'
import { View } from 'react-native'
import Chart from './Chart'
import CompareList from './CompareList'

const ChartPage = () => (
  <View style={{ flex: 1, marginTop: 40 }}>
    <Chart />
    <CompareList />
  </View>
)

export { ChartPage as default }
