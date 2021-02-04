import React from 'react'

//Dependencies
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'

//Routes
import MainScreen from '../auth/main/screens/MainScreen'

const Stack = createStackNavigator()

export default function AuthStack () {
  return (
    <Stack.Navigator initialRouteName='MainScreen' headerMode={null}>
      <Stack.Screen
        name='MainScreen'
        component={MainScreen}
      />
    </Stack.Navigator>
  )
}
