import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native';
import AddItem from '../Screens/AddItem';
import AllItems from '../Screens/AllItems';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Searchscreen from '../Screens/SearchScreen';
import SplashScreen from '../Screens/SplashScreen';
import ViewItem from '../Screens/ViewItem';

const Stack = createNativeStackNavigator();

export function StackNav() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen
          name="View"
          component={ViewItem}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTitle: 'Details',
          }}
        />
        <Stack.Screen
          name="search"
          component={Searchscreen}
          options={{
            animation: 'slide_from_bottom',
            headerShown: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="upload"
          component={AddItem}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTitle: 'Add Item',
          }}
        />
        <Stack.Screen
          name="allitem"
          component={AllItems}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            headerTitle: 'All Items',
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
