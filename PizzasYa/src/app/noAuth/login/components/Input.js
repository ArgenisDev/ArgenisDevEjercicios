import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

//Dependencies
import {TextInput} from 'react-native-gesture-handler'
import AntDesing from 'react-native-vector-icons/AntDesign'

export default function Input ({
  title,
  placeholder,
  icon,
  secureTextEntry,
  value,
  setValue,
}) {
  return (
    <View>
      <Text style={styles.textTitle}> {title} </Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          secureTextEntry={secureTextEntry}
          onChangeText={text => setValue(text)}
          value={value}
        />
        <View style={styles.containerIcon}>
          <AntDesing name={icon} size={20} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 28,
  },
  containerInput: {
    width: '85%',
    paddingBottom: 4,
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  containerIcon: {
    justifyContent: 'flex-end',
    marginBottom: 16,
    marginLeft: 16,
  },
  textInput: {
    width: '82%',
    maxWidth: '82%',
    height: 50,
    fontSize: 17,
  },
})
