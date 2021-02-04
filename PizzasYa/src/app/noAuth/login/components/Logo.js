import React from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'

export default function Logo () {
  return (
    <View>
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.textSlogan}> Proceed with your </Text>
      <Text style={styles.textLogin}> Login </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    margin: 16,
    marginTop: 52,
    width: 150,
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  textSlogan: {
    fontSize: 25,
    color: '#000',
    marginLeft: 16,
    fontFamily: 'Poppins-Regular',
  },
  textLogin: {
    fontSize: 30,
    color: '#000',
    marginLeft: 16,
    fontFamily: 'Poppins-Bold',
  },
})
