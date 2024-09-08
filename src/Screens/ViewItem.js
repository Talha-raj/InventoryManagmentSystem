//import liraries
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../Zustand/handleAuth';
import {useItems} from '../../Zustand/handleItems';
import {Width} from '../Utils/Dimention';
import AddItem from './AddItem';
// create a component
const ViewItem = ({route}) => {
  const item = route?.params?.item ?? {};
  const {DeleteItem, DeleteLoading} = useItems(state => state);
  const {Role} = useAuth(state => ({
    Role: state.Role,
  }));
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View style={{width: Width * 0.8, padding: 20}}>
          <Text style={styles.ItemTextStyle}>Name {item?.name}</Text>
          <Text style={styles.ItemTextStyle}>Location {item?.location}</Text>
          <Text style={styles.ItemTextStyle}>Owned By {item?.owner}</Text>

          <View style={{width: Width * 0.9}}>
            <Text style={styles.ItemTextStyle}>Description</Text>
            <View
              style={{
                minHeight: Width / 2.5,
                padding: 10,
                borderRadius: 10,
                backgroundColor: '#eee',
              }}>
              <Text style={{color: '#000'}}>{item?.description}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: Width,
          minHeight: Width / 2,
          backgroundColor: '#3a6ea5',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icons name={'settings'} size={24} color={'#fff'} />
          <Text
            style={{
              fontSize: 24,
              marginHorizontal: 10,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Manage Item
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View
            style={[
              styles.ActionContainerStyle,
              {
                display:
                  Role == 'admin'
                    ? 'flex'
                    : 'none' || modalVisible
                    ? 'none'
                    : 'flex',
              },
            ]}>
            <Text style={{color: '#fff', fontSize: 24}}>Delete</Text>
            <TouchableOpacity
              disabled={DeleteLoading}
              onPress={() => DeleteItem(item.id)}
              activeOpacity={0.85}
              style={[styles.ButtonStyle, {backgroundColor: 'red'}]}>
              {DeleteLoading ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                <Icons name={'delete'} size={24} color={'#fff'} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.ActionContainerStyle}>
            <Text style={{color: '#fff', fontSize: 24}}>Edit Item</Text>
            <TouchableOpacity
              disabled={DeleteLoading}
              onPress={() => setModalVisible(!modalVisible)}
              activeOpacity={0.85}
              style={[styles.ButtonStyle, {backgroundColor: 'green'}]}>
              {!modalVisible ? (
                <Text style={{color: '#fff'}}>Update</Text>
              ) : (
                <Icons name={'close'} size={24} color={'#fff'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {modalVisible ? (
        <View
          style={{
            width: Width,
            position: 'absolute',
            zIndex: 1,
            backgroundColor: '#fff',
          }}>
          <AddItem item={item} />
        </View>
      ) : null}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    position: 'relative',
  },
  ItemTextStyle: {color: '#000', fontSize: 24, marginVertical: 10},
  ButtonStyle: {
    width: Width / 3.5,
    height: Width / 10,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 10,
  },
  ActionContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

//make this component available to the app
export default ViewItem;
