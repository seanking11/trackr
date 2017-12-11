import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import MoodLogger from './components/MoodLogger'
import ChartPage from './components/ChartPage'
import Colors from './components/common/Colors'

const RouterComponent = () => (
  <Router
    sceneStyle={{
      backgroundColor: Colors.backgroundGray
    }}
  >
    <Scene key='root' hideNavBar>
      <Scene key='auth'>
        <Scene
          key='login'
          component={LoginForm}
          title='Login'
        />
      </Scene>

      <Scene key='main'>
        <Scene
          initial
          key='log'
          component={MoodLogger}
          title='Log Mood'
          rightTitle='Chart'
          onRight={() => Actions.chart()}
        />
        <Scene
          key='chart'
          component={ChartPage}
          title='Chart'
        />
      </Scene>
    </Scene>
  </Router>
)

export default RouterComponent
