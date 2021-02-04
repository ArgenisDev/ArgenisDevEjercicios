import React, {useState} from 'react'
import {Text, View, StyleSheet} from 'react-native'

//Dependencies
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Components
import Logo from '../components/Logo'
import Input from '../components/Input'
import Button from '../../../helpers/Button'

//Helpers
import {Colors} from '../../../helpers/Colors'
import {fetchLogin} from '../../../helpers/fetch/fetchLogin'

export default function LoginScreen (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [messageUser, setMessageUser] = useState(null)
  const [messagePassword, setMessagePassword] = useState(null)

  async function Login () {
    if (!username.trim()) {
      setMessageUser('Por favor ingrese un usuario valido')
      return
    }
    if (!password.trim()) {
      setMessagePassword('Por favor ingrese una contraseña valida')
      return
    }
    try {
      setLoading(true)
      setMessagePassword(null)
      setMessageUser(null)
      const response = await fetchLogin(username, password)
      if (response.access_token) {
        setLoading(false)
        await AsyncStorage.setItem('token', response.access_token)
        props.navigation.replace('MainStack')
      } else {
        setLoading(false)
        setMessagePassword('Credenciales Incorrectas')
      }
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Logo />
      <View style={styles.inputEmail}>
        <Input
          title={'username'}
          placeholder={'email@example.com'}
          icon={'mail'}
          value={username}
          setValue={setUsername}
        />
        {messageUser && <Text style={styles.alertError}>{messageUser}</Text>}
        <View style={styles.containerPassword}>
          <Input
            title={'Password'}
            placeholder={'********'}
            secureTextEntry
            icon={'lock1'}
            value={password}
            setValue={setPassword}
          />
          {messagePassword && (
            <Text style={styles.alertError}>{messagePassword}</Text>
          )}
        </View>
      </View>
      <View style={styles.containerButton}>
        <Button loading={loading} label={'Login'} onPress={() => Login()} />
      </View>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputEmail: {
    marginTop: 52,
  },
  containerPassword: {
    marginTop: 24,
  },
  alertError: {
    color: Colors.principalColors.alert,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
  },
  containerButton: {
    marginTop: 16,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
})
