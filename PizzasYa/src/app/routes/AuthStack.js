import React from 'react'

//Dependencies
import {createStackNavigator} from '@react-navigation/stack'

//Routes
import LoginScreen from '../noAuth/login/screens/LoginScreen'
import SplashScreen from '../noAuth/splash/screens/SplashScreen'

const Stack = createStackNavigator()

export default function AuthStack () {
  return (
      <Stack.Navigator initialRouteName='SplashScreen' headerMode={null}>
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
      </Stack.Navigator>
   
  )
}
