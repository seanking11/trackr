import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import MoodLogger from './components/MoodLogger'
import Chart from './components/Chart'

const RouterComponent = () => (
  <Router>
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
          key='log'
          component={MoodLogger}
          title='Log Mood'
        />
        <Scene
          initial
          key='chart'
          component={Chart}
          title='Charts'
        />
      </Scene>
    </Scene>
  </Router>
)

export default RouterComponent
