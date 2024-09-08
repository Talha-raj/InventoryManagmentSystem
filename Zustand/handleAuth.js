import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {Navigate} from '../src/Services/NavigationService';
import {Toast} from 'react-native-toast-notifications';

export const handleToast = Txt => {
  return Toast.show(Txt, {
    type: '#fff',
    placement: 'top',
    duration: 3000,
    offset: 30,
    animationType: 'slide-in',
  });
};
export const useAuth = createWithEqualityFn(
  (set, get) => ({
    Auth: false,
    Role: '',
    setAuth: status => {
      set({Auth: status});
      if (status) {
        handleToast('Welcome to IMS');
        Navigate('Home');
      }
    },
    setRole: role => {
      set({Role: role});
    },
  }),
  shallow,
);
