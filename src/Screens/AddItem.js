import {useFormikContext, Formik} from 'formik';
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {useItems} from '../../Zustand/handleItems';
import ErrorText from '../Components/ErrorText';
import {Width} from '../Utils/Dimention';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Item name is required').trim(),
  quantity: Yup.number()
    .positive('Quantity must be positive')
    .required('Quantity is required'),
  location: Yup.string().required('Location is required').trim(),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be 20 Characters Long')
    .trim(),
  owner: Yup.string().required('Owner name is required').trim(),
});

const AddItem = ({item}) => {
  const quantityRef = useRef(null);
  const {UploadItem, UpdateItem} = useItems(state => state);

  const parseAndHandleChange = (value, setFieldValue, id) => {
    const parsed = parseInt(value, 10);
    setFieldValue(id, parsed);
  };
  useEffect(() => {
    if (item) {
      if (quantityRef.current) {
        quantityRef?.current?.setNativeProps({text: `${item.quantity}`});
      }
    }
  }, []);
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: item?.name || '',
          quantity: 0,
          location: item?.location || '',
          description: item?.description || '',
          owner: item?.owner || '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          if (!item) {
            console.log('Update');
            UploadItem(values);
          } else {
            console.log('EDIT');
            UpdateItem({Data: values, Id: item?.id});
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Item Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name && <ErrorText Data={errors.name} />}

            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Quantity"
              keyboardType="numeric"
              onChangeText={text =>
                parseAndHandleChange(text, setFieldValue, 'quantity')
              }
              ref={quantityRef}
              onBlur={handleBlur('quantity')}
              value={values.quantity}
            />
            {errors.quantity && touched.quantity && (
              <ErrorText Data={errors.quantity} />
            )}

            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Location"
              onChangeText={handleChange('location')}
              onBlur={handleBlur('location')}
              value={values.location}
            />
            {errors.location && touched.location && (
              <ErrorText Data={errors.location} />
            )}

            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Description"
              multiline={true}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
            />
            {errors.description && touched.description && (
              <ErrorText Data={errors.description} />
            )}
            <TextInput
              style={styles.input}
              placeholderTextColor={'grey'}
              placeholder="Owner"
              onChangeText={handleChange('owner')}
              onBlur={handleBlur('owner')}
              value={values.owner}
            />
            {errors.owner && touched.owner && <ErrorText Data={errors.owner} />}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                width: Width / 2,
                height: Width / 8,
                borderRadius: 10,
                backgroundColor: 'royalblue',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 18}}>
                {!item ? 'Upload' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
  },
  input: {
    height: Width / 8,
    padding: 10,
    backgroundColor: '#e4e4e4',
    marginVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: '#000',
    borderColor: 'grey',
    borderBottomWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});

export default AddItem;
