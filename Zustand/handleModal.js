import {create} from 'zustand';
import {Softnav} from '../src/Services/NavigationService';

export const useModal = create((set, get) => ({
  EditItem: {},
  setEditItem: async item => {
    set({EditItem: item});
    Softnav('upload');
  },
}));
