import {
  StackActions,
  useNavigationContainerRef,
} from '@react-navigation/native';

export const NavgationRef = useNavigationContainerRef();

export function Navigate(name, params) {
  if (NavgationRef.isReady()) {
    NavgationRef.dispatch(StackActions.replace(name, params));
  }
}
export function Softnav(name, params) {
  if (NavgationRef.isReady()) {
    NavgationRef.navigate(name, params);
  }
}

export function Goback() {
  if (NavgationRef.isReady()) {
    NavgationRef.goBack();
  }
}
