import {Formik} from 'formik';
import React, {memo, useEffect, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as Yup from 'yup';
import ErrorText from '../Components/ErrorText';
import {Width} from '../Utils/Dimention';
import {Navigate} from '../Services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../Zustand/handleAuth';
import {useToast} from 'react-native-toast-notifications';

const validate = Yup.object({
  username: Yup.string().required('Username is required*'),
  password: Yup.string()
    .required('Password is required*')
    .min(8, 'Password must be 8 Characters long'),
});

const Login = () => {
  const toast = useToast();
  const {setAuth, setRole} = useAuth(state => ({
    setAuth: state.setAuth,
    Auth: state.Auth,
    setRole: state.setRole,
  }));

  const handleLogin = async values => {
    if (values.username === 'username' && values.password == 'password') {
      setRole('admin');
      await AsyncStorage.setItem('role', 'admin');
      setAuth(true);
    } else if (values.username === 'staff' && values.password == 'password') {
      setRole('staff');
      await AsyncStorage.setItem('role', 'staff');
      setAuth(true);
    } else {
      toast.show('Username or password incorrect', {
        type: 'warning',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
      setAuth(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.HeadingTextContainer}>
        <Text style={styles.HeadingTextStyle}>Login</Text>
        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
          Welcome back to the IMS
        </Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Formik
          validationSchema={validate}
          initialValues={{username: '', password: ''}}
          onSubmit={values => handleLogin(values)}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.FormContainerStyle}>
                <View style={{width: '90%', margin: 10}}>
                  <TextInput
                    placeholderTextColor={'#000'}
                    placeholder="Username"
                    style={styles.input}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  {errors.username && touched.username && (
                    <ErrorText Data={errors.username} />
                  )}
                </View>
                <View style={{width: '90%', margin: 10}}>
                  <TextInput
                    placeholderTextColor={'#000'}
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <ErrorText Data={errors.password} />
                  )}
                </View>
              </View>
              {/* //Button */}
              <View
                style={{
                  width: '90%',
                  margin: 10,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.6}
                  style={styles.ButtonStyle}>
                  <Text style={styles.ButtonTextStyle}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#e4e4e4',
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: '#000',
  },
  FormContainerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  ButtonStyle: {
    height: 50,
    backgroundColor: 'royalblue',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  ButtonTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#fff',
  },
  HeadingTextContainer: {
    width: Width,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  HeadingTextStyle: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#000',
    marginVertical: 10,
  },
});

//make this component available to the app
export default memo(Login);
