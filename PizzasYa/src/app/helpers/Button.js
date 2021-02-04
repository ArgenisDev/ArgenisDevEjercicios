import React from 'react'
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

//Dependencies
import LinearGradient from 'react-native-linear-gradient'
import {Colors} from './Colors'

export default function Button ({onPress = () => {}, loading, label = ''}) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[
          Colors.principalColors.primary,
          Colors.principalColors.secondary,
        ]}
        style={styles.gradient}>
        {!loading ? (
          <Text style={styles.text}>{label}</Text>
        ) : (
          <ActivityIndicator color={'#fff'} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#FFF',
  },
  container: {
    width: '100%',
    height: 50,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
