import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';

const HomeScreen = () => {
  return <Home></Home>;
};

const ProfileScreen = () => {
  return <Profile></Profile>;
};

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
