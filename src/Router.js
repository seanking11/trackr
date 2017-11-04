import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import MoodLogger from './components/MoodLogger'

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
          initial
          key='log'
          component={MoodLogger}
          title='Log Mood'
        />
      </Scene>
    </Scene>
  </Router>
)

export default RouterComponent
