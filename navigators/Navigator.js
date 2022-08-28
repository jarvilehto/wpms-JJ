import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';

const HomeScreen = () => {
  return <Home></Home>;
};

const ProfileScreen = () => {
  return <Profile></Profile>;
};

const SingleScreen = () => {
  return <Single></Single>
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return(
      <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
          <Tab.Screen name="Profile" component={ProfileScreen}/>
      </Tab.Navigator>
  );
}

const StackScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen  name="Tabs" component={TabScreen} options='hide header'/>
            <Stack.Screen  name="Single" component={SingleScreen}/>
        </Stack.Navigator>
    );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen/>
    </NavigationContainer>
  );
};

export default Navigator;
