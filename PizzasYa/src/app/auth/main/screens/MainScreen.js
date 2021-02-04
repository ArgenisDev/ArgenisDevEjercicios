import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

//Helpers
import {fetchGetOrders} from '../../../helpers/fetch/fetchGetOrders';
import {Colors} from '../../../helpers/Colors';

//Components
import Header from '../components/Header';
import ModalAddOrder from '../components/ModalAddOrder';
import RenderListOrder from '../components/renderListOrder';

export default function MainScreen(props) {
  const [listOrders, setListOrders] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [postFetch, setPostFetch] = useState(false);

  useEffect(() => {
    getListOrders();
    return () => {
      setPostFetch(false);
    };
  }, [postFetch]);

  renderlistOrderFunction = (item) => {
    return (
      <RenderListOrder
        item={item}
        postFetch={postFetch}
        setPostFetch={setPostFetch}
      />
    );
  };
  async function getListOrders() {
    setListOrders(await fetchGetOrders());
  }
  function renderFooter() {
    return <View style={{marginBottom: 10}}></View>;
  }
  function renderEmpty() {
    return (
      <Text
        style={{
          fontSize: 18,
          flex: 0.9,
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          textAlignVertical: 'center',
        }}>
        No hay datos para mostrar
      </Text>
    );
  }
  return (
    <View style={styles.container}>
      <Header
        setModalVisible={setModalVisible}
        navigation={props.navigation}
        numOrders={listOrders ? listOrders.length : 0}
      />

      {listOrders ? (
        <FlatList
          data={listOrders}
          renderItem={renderlistOrderFunction}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          keyExtractor={(item) => item.Order_ID.toString()}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      ) : (
        <View style={styles.containerLoading}>
          <ActivityIndicator size={40} color={Colors.principalColors.primary} />
        </View>
      )}
      <ModalAddOrder
        visible={modalVisible}
        setModalVisible={setModalVisible}
        numOrders={listOrders ? listOrders.length : 0}
        listOrders={listOrders}
        navigation={props.navigation}
        postFetch={postFetch}
        setPostFetch={setPostFetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  containerLoading: {
    alignSelf: 'center',
    marginTop: 120,
  },
});
