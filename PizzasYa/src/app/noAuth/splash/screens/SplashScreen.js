import React, {useEffect} from 'react'
import {StyleSheet, Image} from 'react-native'

//Dependencies
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from 'react-native-animatable'
import { CommonActions } from '@react-navigation/native'
//utils
import {Colors} from '../../../helpers/Colors'

export default function SplashScreen (props) {
  useEffect(() => {
    //Esto solo es para que se vea el splash por mas tiempo y puedan apreciarlo
    setTimeout(() => {
      getToken()
    }, 1500)
  }, [])
  async function getToken () {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'MainStack',
              
            },
          ],
        }),
      )
    } else {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'LoginScreen',
              
            },
          ],
        }),
      )
    }
  }
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[
        Colors.principalColors.primary,
        Colors.principalColors.secondary,
      ]}
      style={styles.container}>
      <Animatable.View
        animation={'pulse'}
        duration={1500}
        iterationCount={'infinite'}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.image}
        />
      </Animatable.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
})
