//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Width} from '../Utils/Dimention';
import {useAuth} from '../../Zustand/handleAuth';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigate} from '../Services/NavigationService';
// create a component
const Header = () => {
  const {Role, setAuth} = useAuth(state => ({
    Role: state.Role,
    setAuth: state.setAuth,
  }));
  return (
    <View style={styles.container}>
      <View
        style={{
          // height: '40%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 34, color: '#fff', fontWeight: 'bold'}}>
          Hello, {Role}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setAuth(false);
            AsyncStorage.clear();
            Navigate('login');
          }}>
          <Icons name={'logout'} color={'#fff'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: Width,
    height: Width / 3,
    backgroundColor: 'royalblue',
    paddingVertical: 40,
    padding: 10,
  },
});

//make this component available to the app
export default Header;
