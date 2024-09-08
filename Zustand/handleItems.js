import axios from 'axios';
import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {Navigate} from '../src/Services/NavigationService';
import {BaseUrl, InventoryApi} from '../src/Utils/Apis';
import {Toast} from 'react-native-toast-notifications';
import {handleToast} from './handleAuth';

export const useItems = createWithEqualityFn(
  (set, get) => ({
    AllItems: [],
    GetItemsLoading: false,
    UploadItemLoading: false,
    DeleteLoading: false,
    FilteredQuantitiy: [],
    GetItems: async () => {
      set({GetItemsLoading: true});
      try {
        const GetAllItems = await axios.get(BaseUrl + InventoryApi);
        set({AllItems: GetAllItems.data, GetItemsLoading: false});
        console.log(GetAllItems.data, 'Get All Items');
      } catch (error) {
        console.log(error, 'Ata');
        set({GetItemsLoading: false});
      }
    },
    DeleteItem: async Id => {
      try {
        const Latest = await axios.delete(BaseUrl + InventoryApi + `/${Id}`);
        set({DeleteLoading: false, AllItems: Latest.data});
        handleToast('Item Deleted');
        Navigate('Home');
      } catch (error) {
        console.log(error, 'got any if');
        set({DeleteLoading: false});
      }
    },
    UpdateItem: async payload => {
      const {Data, Id} = payload;
      try {
        await axios.patch(BaseUrl + InventoryApi + `/` + Id, Data);

        handleToast(`${Data.name} Updated`);
        Navigate('Home');
        get().GetItems();
        UploadItemLoading({UploadItemLoading: true});
      } catch (error) {}
    },
    UploadItem: async Data => {
      try {
        await axios.post(BaseUrl + InventoryApi, Data);
        handleToast('Saved to inventory');
        set({UploadItemLoading: false});
        get().GetItems();
        Navigate('Home');
      } catch (error) {
        set({UploadItemLoading: false});
      }
    },
    FilterQuantitiy: async Range => {
      try {
        const {type, range} = Range;
        let Filter = !type ? 'gt' : 'lt';
        const FilteredData = await axios.get(
          BaseUrl + InventoryApi + `?quantity_${Filter}=` + range,
        );
        console.log(FilteredData.config.url, 'url');
        set({FilteredQuantitiy: FilteredData.data});
      } catch (error) {}
    },
  }),
  shallow,
);
