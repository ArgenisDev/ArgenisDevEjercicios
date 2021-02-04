import React from 'react'
import {Text, View, Alert, TouchableOpacity, StyleSheet} from 'react-native'
//Dependencies
import AntDesign from 'react-native-vector-icons/AntDesign'

//helpers
import {fetchDeleteOrder} from '../../../helpers/fetch/fetchDeleteOrder'
import {Colors} from '../../../helpers/Colors'

export default function renderListOrder ({item, postFetch, setPostFetch}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'Alerta',
            'Seguro que desea eliminar esta orden?',
            [
              {
                text: 'NO',
              },
              {
                text: 'SI',
                onPress: () => {
                  fetchDeleteOrder(item.item.Order_ID), setPostFetch(!postFetch)
                },
              },
            ],
            {cancelable: false},
          )
        }
        style={styles.buttonClose}>
        <AntDesign name={'close'} size={20} color={'#fff'} />
      </TouchableOpacity>
      <View style={styles.containerText}>
        <Text style={styles.orderID}>Tipo:</Text>
        <Text style={styles.textTitle}>{item.item.Flavor}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.orderID}>Sabor:</Text>
        <Text style={styles.textTitle}>{item.item.Crust}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.orderID}>Tamaño:</Text>
        <Text style={styles.textTitle}>{item.item.Size}</Text>
      </View>
      <View
        style={{
          ...styles.containerText,
          alignSelf: 'flex-end',
          marginRight: 16,
        }}>
        <Text style={styles.orderID}>Order No:</Text>
        <Text style={styles.textTitle}>{item.item.Order_ID}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.principalColors.third,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 8,
  },
  textTitle: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 8,
    textAlign: 'center',
    marginTop: 8,
    top: -14,
    fontFamily: 'Poppins-Regular',
  },
  containerText: {
    flexDirection: 'row',
  },
  orderID: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 24,
    marginTop: 8,
    fontFamily: 'Poppins-SemiBold',
    top: -16,
  },
  buttonClose: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 24,
    top: 5,
    padding: 5,
  },
})
