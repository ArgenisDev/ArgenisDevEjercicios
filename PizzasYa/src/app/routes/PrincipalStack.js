import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native'

//Dependencies
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack'

//Routes
import AuthStack from './AuthStack'
import MainStack from './MainStack'
//utils
import {Colors} from '../helpers/Colors'

const Stack = createStackNavigator()

export default function PrincipalStack () {
  return (
    <NavigationContainer>
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.principalColors.primary}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={Colors.principalColors.primary}
        />
        <Stack.Navigator initialRouteName='AuthStack' headerMode={null}>
          <Stack.Screen name='AuthStack' component={AuthStack} />
          <Stack.Screen
            name='MainStack'
            component={MainStack}
            options={{...TransitionPresets.SlideFromRightIOS}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}
