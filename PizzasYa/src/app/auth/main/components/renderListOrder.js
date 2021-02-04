import React from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

//Dependencies
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

//helpers
import {fetchDeleteOrder} from '../../../helpers/fetch/fetchDeleteOrder';
import {Colors} from '../../../helpers/Colors';

export default function renderListOrder({item, postFetch, setPostFetch}) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={[
        Colors.principalColors.primary,
        Colors.principalColors.secondary,
      ]}
      style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Alerta', 'Seguro que desea eliminar esta orden?', [
            {
              text: 'NO',
            },
            {
              text: 'SI',
              onPress: () => {
                fetchDeleteOrder(item.item.Order_ID), setPostFetch(!postFetch);
              },
            },
          ])
        }
        style={styles.buttonClose}>
        <AntDesign name={'close'} size={20} color={'#fff'} />
      </TouchableOpacity>
      <View style={{...styles.containerText}}>
        <Text style={styles.orderID}>Sabor:</Text>
        <Text style={styles.textTitle}>{item.item.Flavor}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.orderID}>Corteza:</Text>
        <Text style={styles.textTitle}>{item.item.Crust}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.orderID}>Tamaño:</Text>
        <Text style={styles.textTitle}>{item.item.Size}</Text>
      </View>
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.image}
      />
      <View
        style={{
          ...styles.containerText,
          alignSelf: 'flex-end',
          marginRight: 16,
        }}>
        <Text style={styles.orderID}>Order No:</Text>
        <Text style={{...styles.textTitle, width: 30}}>
          {item.item.Order_ID}
        </Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    borderRadius: 15,
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
    width: '65%',
    marginLeft: 8,
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
    width: 40,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    top: 16,
    right: 24,
  },
  image: {
    width: 30,
    height: 30,
    position: 'absolute',
    left: 30,
    bottom: 20,
  },
});
