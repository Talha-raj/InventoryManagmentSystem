import debounce from 'lodash.debounce';
import React, {memo, useCallback, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useItems} from '../../Zustand/handleItems';
import SeachItemCard from '../Components/SearchItemCard';
import {Width} from '../Utils/Dimention';

const RenderFilterView = memo(
  ({
    FilterQuantitiy,
    filterbyowner,
    filtetbyQty,
    setfiltetbyQty,
    searchInputRef,
    setfilterbyowner,
  }) => {
    const [Range2, setRange2] = useState();
    const [lt, setlt] = useState(0);
    return (
      <View style={{width: Width * 0.9}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingRight: '5%',
          }}>
          <Text style={{fontSize: 18, color: '#000'}}>Search filters</Text>
          <Icons name={'filter-list'} color={'#000'} size={24} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setfilterbyowner(!filterbyowner)}
            style={[
              styles.ChipStyle,
              {backgroundColor: filterbyowner ? 'royalblue' : '#eee'},
            ]}>
            {filterbyowner ? (
              <Icons name={'check'} size={18} color={'#fff'} />
            ) : null}
            <Text
              style={{
                color: !filterbyowner ? '#000' : '#fff',
                marginHorizontal: 4,
              }}>
              Owner
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setfiltetbyQty(!filtetbyQty)}
            style={[
              styles.ChipStyle,
              {backgroundColor: filtetbyQty ? 'royalblue' : '#eee'},
            ]}>
            {filtetbyQty ? (
              <Icons name={'check'} size={18} color={'#fff'} />
            ) : null}
            <Text
              style={{
                color: !filtetbyQty ? '#000' : '#fff',
                marginHorizontal: 4,
              }}>
              Quantity
            </Text>
          </TouchableOpacity>
        </View>
        {filtetbyQty ? (
          <View
            style={{
              minHeight: Width / 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#000', fontSize: 14}}>Quantity Filter</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setlt(!lt)}
              style={[styles.ChipStyle, {backgroundColor: 'royalblue'}]}>
              <Text
                style={{
                  color: '#fff',
                  marginHorizontal: 4,
                }}>
                {!lt ? 'Greater' : 'Less'}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                keyboardType="numeric"
                value={Range2}
                placeholder={!lt ? 'Greater than' : 'Less than'}
                style={styles.RangeInput}
                maxLength={4}
                onChangeText={tx => {
                  setRange2(tx);
                }}
                // returnKeyLabel="Ok"
                returnKeyType="search"
                onSubmitEditing={() => {
                  FilterQuantitiy({type: lt, range: Range2});
                  searchInputRef.current?.focus();
                }}
              />
              {Range2 ? (
                <TouchableOpacity
                  onPress={() => {
                    FilterQuantitiy({type: lt, range: Range2});
                    searchInputRef.current?.focus();
                    setRange2('');
                  }}>
                  <Icons name={'chevron-right'} size={30} color={'royalblue'} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  },
);

const Searchscreen = () => {
  const {FilteredQuantitiy, FilterQuantitiy, AllItems} = useItems(state => ({
    FilteredQuantitiy: state.FilteredQuantitiy,
    FilterQuantitiy: state.FilterQuantitiy,
    AllItems: state.AllItems,
  }));

  const [searchTxt, setsearchTxt] = useState('');
  const [filterbyowner, setfilterbyowner] = useState(false);
  const [filtetbyQty, setfiltetbyQty] = useState(0);

  const searchInputRef = useRef(null);

  const handleSearch = () => {
    const cleanedSearchTxt = searchTxt?.replace(' ', '').toLowerCase();

    const Filter =
      (filtetbyQty && FilteredQuantitiy) ||
      AllItems?.filter(e => {
        const cleanedName = e.name?.replace(' ', '')?.toLowerCase();
        const cleanedOwner = e.owner?.replace(' ', '')?.toLowerCase();

        if (cleanedName.includes(cleanedSearchTxt)) {
          return true;
        }

        if (filterbyowner && filtetbyQty) {
          return cleanedOwner.includes(cleanedSearchTxt);
        }

        if (filterbyowner && cleanedOwner.includes(cleanedSearchTxt)) {
          return true;
        }

        return false;
      });

    return Filter || AllItems;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: Width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.SearchBarContainer}>
          <TextInput
            ref={searchInputRef}
            value={searchTxt}
            onChangeText={txt => setsearchTxt(txt)}
            placeholderTextColor={'#adb5bd'}
            style={{color: '#000'}}
            placeholder="Search by item's name, owner, Quantity"
            autoFocus={true}
          />
          <TouchableOpacity
            onPress={() => {
              setsearchTxt('');
              searchInputRef.current?.focus();
            }}
            activeOpacity={0.5}>
            <Icons
              name={!searchTxt ? 'search' : 'close'}
              color={'#000'}
              size={24}
            />
          </TouchableOpacity>
        </View>
        {!searchTxt ? (
          <View
            style={{
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderColor: '#adb5bd',
              paddingBottom: 10,
            }}>
            <RenderFilterView
              FilterQuantitiy={FilterQuantitiy}
              filterbyowner={filterbyowner}
              filtetbyQty={filtetbyQty}
              setfiltetbyQty={setfiltetbyQty}
              setfilterbyowner={setfilterbyowner}
              searchInputRef={searchInputRef}
            />
          </View>
        ) : null}
      </View>
      {searchTxt ? (
        <View
          style={{
            width: Width,
            alignItems: 'center',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
            keyExtractor={item => item.id}
            data={handleSearch()}
            renderItem={({item}) => <SeachItemCard item={item} />}
          />
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
  },
  SearchBarContainer: {
    marginVertical: 10,
    height: Width / 4,
    width: Width,
    paddingHorizontal: 20,
    width: Width * 0.9,
    height: Width / 7,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  FilterViewContainer: {
    width: Width * 0.9,
    alignSelf: 'center',
    minHeight: Width / 2,
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 1,
    borderRadius: 10,
  },
  ChipStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 10,
    width: Width / 5,
    height: Width / 12,
    marginVertical: 20,
    flexDirection: 'row',
    marginRight: 20,
  },
  RangeInput: {
    width: Width / 3,
    height: Width / 8,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
});

export default Searchscreen;
