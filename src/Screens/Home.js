import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Header from '../Components/Header';
import ItemCard from '../Components/ItemsCard';
import {Softnav} from '../Services/NavigationService';
import {Width} from '../Utils/Dimention';
import {useItems} from '../../Zustand/handleItems';
import {shallow} from 'zustand/shallow';
import {useAuth} from '../../Zustand/handleAuth';

const Home = () => {
  const {GetItems, GetItemsLoading, AllItems} = useItems(state => ({
    AllItems: state.AllItems,
    GetItems: state.GetItems,
  }));

  const {Role} = useAuth(state => ({
    Role: state.Role,
  }));

  useEffect(() => {
    GetItems();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.HeaderParent}>
        <Header />
        <TouchableOpacity
          onPress={() => Softnav('search')}
          activeOpacity={0.95}
          style={styles.SearchBarContainerStyle}>
          <Text style={{color: 'silver'}}>
            Search by item's name, owner, Quantity
          </Text>
          <Icons name={'search'} color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: Width,
          padding: 20,
        }}>
        <View style={styles.HeadingContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icons name={'inventory'} size={18} color={'#000'} />
            <Text style={styles.HeadingTextStyle}>Inventory</Text>
          </View>
          <TouchableOpacity
            onPress={() => Softnav('allitem')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'green'}}>See all</Text>
            <Icons name={'chevron-right'} size={24} color={'#000'} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          data={
            AllItems.length > 5 ? AllItems.slice(0, 4)?.reverse() : AllItems
          }
          keyExtractor={item => item.id}
          renderItem={({item, index}) => <ItemCard item={item} />}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.FloatPlustBtn,
          {display: Role == 'admin' ? 'flex' : 'none'},
        ]}
        activeOpacity={0.85}
        onPress={() => Softnav('upload')}>
        <Icons name={'add'} size={28} color={'#fff'} />
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
  HeaderParent: {
    position: 'relative',
    width: Width,
    height: Width / 2.5,
  },
  HeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  SearchBarContainerStyle: {
    width: Width * 0.9,
    height: Width / 7,
    backgroundColor: '#eee',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    top: Width / 4,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
  },
  HeadingTextStyle: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 24,
    marginHorizontal: 10,
    bottom: '10%',
  },
  FloatPlustBtn: {
    position: 'absolute',
    width: Width / 5,
    height: Width / 5,
    borderRadius: Width / 2.5,
    zIndex: 1,
    backgroundColor: 'royalblue',
    top: Width * 1.8,
    bottom: 0,
    right: '6%',
    //   left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Home;
