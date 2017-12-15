import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import LoginForm from './components/LoginForm'
import MoodLogger from './components/MoodLogger'
import ChartPage from './components/ChartPage'
import Colors from './components/common/Colors'

const TabIcon = ({ focused, title, iconName }) => {
  const color = focused ? '#24e98a' : '#DDD'
  const styles = {
    viewStyles: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    iconStyles: {
      color
    },
    textStyles: {
      color,
      fontSize: 12
    }
  }

  return (
    <View style={styles.viewStyles}>
      <Icon
        style={styles.iconStyles}
        name={iconName || 'circle'}
        size={18}
      />
      <Text
        style={styles.textStyles}
      >
        {title}
      </Text>
    </View>
  )
}

class RouterComponent extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content', true)
  }

  render() {
    return (
      <Router
        sceneStyle={{ backgroundColor: Colors.backgroundGray }}
      >
        <Scene key='root' hideNavBar>
          <Scene key='auth'>
            <Scene
              key='login'
              component={LoginForm}
              title='Login'
            />
          </Scene>

          <Scene
            key='main'
            tabs
            tabBarStyle={{
              backgroundColor: Colors.cardBackground
            }}
            statusBarStyle='light-content'
            showLabel={false}
          >
            <Scene
              initial
              hideNavBar
              key='log'
              component={MoodLogger}
              title='Log Mood'
              icon={TabIcon}
              iconName='smile-o'
            />
            <Scene
              key='chart'
              hideNavBar
              component={ChartPage}
              title='Chart'
              icon={TabIcon}
              iconName='bar-chart-o'
            />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default RouterComponent
