//import liraries
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Width} from '../Utils/Dimention';
import {Softnav} from '../Services/NavigationService';

// create a component
const SeachItemCard = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => Softnav('View', {item: item})}
      style={{
        width: Width * 0.9,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#eee',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 10,
      }}>
      <View>
        <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
          {item.name}
        </Text>
        <Text style={{fontSize: 18, color: '#000'}}>
          Quantity {item.quantity}
        </Text>
      </View>

      <Text style={{fontSize: 18, color: '#000'}}>Owner {item.owner}</Text>
    </TouchableOpacity>
  );
};

//make this component available to the app
export default SeachItemCard;
