import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
//Dependencies
import {TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

//Helpers
import {Colors} from '../../../helpers/Colors';
import Button from '../../../helpers/Button';
import {fetchCreateOrder} from '../../../helpers/fetch/fetchCreateOrder';

export default function ModalAddOrder({
  navigation,
  setModalVisible,
  numOrders,
  visible,
  setPostFetch,
  postFetch,
}) {
  const [token, setToken] = useState(null);
  const [flavor, setFlavor] = useState('');
  const [crust, setCrust] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  async function getToken() {
    const item = await AsyncStorage.getItem('token');
    setToken(item);
  }
  async function createOrder() {
    if (!flavor.trim() || !crust.trim() || !size.trim()) {
      setMessage('Por favor complete todos los campos');
      return;
    }
    if (flavor.length>20 || crust.length>20 || size.trim>20){
      setMessage('Los campos no pueden contener mas de 20 caracteres');
      return;
    }
    setLoading(true);

    response = await fetchCreateOrder(token, crust, flavor, size, numOrders);
    if (response.status === 401) {
      Alert.alert(
        'Error',
        'Su sesion ha expirado, por favor inicie Sesion nuevamente',
        [
          {
            text: 'OK',
            onPress: () => {
              AsyncStorage.clear(),
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
                );
            },
          },
        ],
        {cancelable: false},
      );
    }
    if (response.status === 201) {
      setModalVisible(false),
        setPostFetch(!postFetch),
        setLoading(false),
        setMessage(null),
        setFlavor('');
      setCrust('');
      setSize('');
    }
  }
  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity
        activeOpacity={0}
        onPress={() => setModalVisible(false)}
        style={styles.container}>
        <Animatable.View
          animation={'bounceInLeft'}
          iterationCount={1}
          style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.buttonClose}>
            <AntDesign name={'close'} size={25} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Añadir una nueva orden</Text>
          <View style={styles.containerInput}>
            <TextInput
              placeholder={'Sabor'}
              style={styles.input}
              onChangeText={(text) => setFlavor(text)}
              value={flavor}
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              placeholder={'Corteza'}
              style={styles.input}
              onChangeText={(text) => setCrust(text)}
              value={crust}
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.containerInput}>
            <TextInput
              placeholder={'Tamaño'}
              style={styles.input}
              onChangeText={(text) => setSize(text)}
              value={size}
              placeholderTextColor={'grey'}
            />
          </View>
          {<Text style={styles.message}>{message && message}</Text>}
          <View style={styles.containerButton}>
            <Button
              loading={loading}
              label="Añadir"
              onPress={() => createOrder()}
            />
          </View>
        </Animatable.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000A',
    justifyContent: 'center',
  },
  centeredView: {
    width: '90%',
    height: 420,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.principalColors.secondary,
  },
  textTitle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    color: Colors.principalColors.secondary,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    left: 10,
    width: '90%',
  },
  containerInput: {
    width: '90%',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonClose: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  containerButton: {
    width: '80%',
    alignSelf: 'center',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    textAlign: 'center',
    color: Colors.principalColors.alert,
  },
});
