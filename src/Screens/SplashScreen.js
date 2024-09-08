//import liraries
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Width} from '../Utils/Dimention';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigate} from '../Services/NavigationService';
import {useAuth} from '../../Zustand/handleAuth';

// create a component
const SplashScreen = () => {
  const {setAuth, setRole, Role} = useAuth(state => ({
    setAuth: state.setAuth,
    Auth: state.Auth,
    setRole: state.setRole,
    Role: state.role,
  }));

  const CheckAuth = async () => {
    const role = await AsyncStorage.getItem('role');
    if (role) {
      setRole(role);
      Navigate('Home');
      setAuth(true);
    } else {
      Navigate('login');
      setAuth(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      CheckAuth();
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Loading.json')}
        autoPlay
        loop
        style={{width: Width / 2, height: Width / 2}}
      />
      <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
        Loading ...
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default SplashScreen;
