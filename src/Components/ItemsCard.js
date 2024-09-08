import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Softnav} from '../Services/NavigationService';
import {Width} from '../Utils/Dimention';

const ItemCard = ({item}) => {
  return (
    <View>
      <View style={{width: Width, marginVertical: 20}}>
        <TouchableOpacity
          onPress={() => Softnav('View', {item: item})}
          activeOpacity={1}
          style={styles.CardContainer}>
          <View>
            <View>
              <Text style={styles.ItemnameTextStyle}>{item.name}</Text>
            </View>
            <View style={styles.ItemDetailsContainer}>
              <Icons name={'numbers'} size={14} color={'#000'} />
              <Text style={styles.QunatityTextStyle}>
                Quantity {item.quantity}
              </Text>
            </View>
            <View style={styles.LocationDetailContainer}>
              <Icons name={'location-on'} size={14} color={'#000'} />
              <Text style={{color: '#000', marginHorizontal: 5}}>
                Location Shelf {item.location}
              </Text>
            </View>
            <View style={styles.ItemDetailsContainer}>
              <Icons name={'person'} size={14} color={'#000'} />
              <Text style={{color: '#000', marginHorizontal: 5}}>
                Owned By{' '}
                <Text style={styles.OwnernameTextStyle}>{item.owner}</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => Softnav('View')}
              style={styles.TouchableIconStyle}>
              <Icons name={'chevron-right'} color={'#000'} size={34} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  CardContainer: {
    width: Width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 1.5,
    borderColor: 'royalblue',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ItemnameTextStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  OwnernameTextStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'green',
  },
  ItemDetailsContainer: {flexDirection: 'row', alignItems: 'center'},
  LocationDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  QunatityTextStyle: {
    color: 'royalblue',
    fontWeight: 'bold',
    marginBottom: 5,
    marginHorizontal: 5,
  },
  TouchableIconStyle: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default ItemCard;
