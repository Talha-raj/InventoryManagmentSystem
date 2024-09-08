import React from 'react';
import {StyleSheet, Text} from 'react-native';

const ErrorText = ({Data}) => {
  return <Text style={styles.txt}>{Data}</Text>;
};

const styles = StyleSheet.create({
  txt: {
    color: 'tomato',
    fontSize: 14,
    marginHorizontal: 10,
  },
});

export default ErrorText;
