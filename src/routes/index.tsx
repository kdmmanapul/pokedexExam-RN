import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { Welcome } from '../pages/Welcome';
import { HomePage } from '../pages/HomePage';

import {logout} from '../services/firebase';

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerMenu = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      const res = await logout();
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

export function Routes() {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Welcome" component={Welcome} />
        <MainStack.Screen name="HomePage">
          {(props) => (
            <Drawer.Navigator drawerContent={() => <DrawerMenu {...props} />} >
              <Drawer.Screen name="Home" component={HomePage} />
            </Drawer.Navigator>
          )}
        </MainStack.Screen>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}