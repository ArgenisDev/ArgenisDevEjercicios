import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

//Helpers
import {Colors} from '../../../helpers/Colors'

//Dependencies
import AntDesing from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {CommonActions} from '@react-navigation/native'

export default function Header ({navigation, setModalVisible, numOrders}) {
  async function LogOut () {
    await AsyncStorage.clear()
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AuthStack',
            state: {
              routes: [
                {
                  name: 'LoginScreen',
                },
              ],
            },
          },
        ],
      }),
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.logout}>
        <AntDesing name={'plus'} size={20} color={'#fff'} />
      </TouchableOpacity>

      <Text style={styles.text}>Ordenes Activas: {numOrders && numOrders}</Text>
      <TouchableOpacity onPress={() => LogOut()} style={styles.logout}>
        <AntDesing name={'logout'} size={20} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.principalColors.primary,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  num: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    top: -10,
  },
  logout: {
    marginHorizontal: 24,
    padding:8
  },
})
