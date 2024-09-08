//import liraries
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useItems} from '../../Zustand/handleItems';
import ItemCard from '../Components/ItemsCard';
import {Width} from '../Utils/Dimention';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Softnav} from '../Services/NavigationService';
import {shallow} from 'zustand/shallow';
// create a component
const AllItems = () => {
  const {AllItems} = useItems(state => ({
    AllItems: state.AllItems,
  }));
  return (
    <View style={styles.container}>
      <View style={{width: Width, alignItems: 'center', paddingHorizontal: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          data={AllItems}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => <ItemCard item={item} />}
        />
      </View>
      <TouchableOpacity
        style={styles.FloatPlustBtn}
        activeOpacity={0.85}
        onPress={() => Softnav('search')}>
        <Icons name={'search'} size={28} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  FloatPlustBtn: {
    position: 'absolute',
    width: Width / 7,
    height: Width / 7,
    borderRadius: Width / 3.5,
    zIndex: 1,
    backgroundColor: 'royalblue',
    top: Width * 1.6,
    bottom: 0,
    right: '6%',
    //   left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default AllItems;
