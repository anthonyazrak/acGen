
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import SavedScreen from './screens/SavedScreen';
import GenerateScreen from './screens/GenerateScreen';
import PictureScreen from './screens/PictureScreen';
import AccountScreen from './screens/AccountScreen';
import StackNavigation from './StackNavigation';

import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" options={
          {
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={24} color="black" />
            ),
            
          }
        
        } component={HomeScreen} />
        <Tab.Screen name="Savec Activities" options={
          {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="bookmark" size={24} color="black" />
            ),
          }
        
        
        } component={StackNavigation} />
        <Tab.Screen name="Generate" options={
          {
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
                 <MaterialIcons name="bolt" size={48} color="black" />
            ),
          }
        
        } component={GenerateScreen} />
        <Tab.Screen name="Picture" options={
          {
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="images-outline" size={24} color="black" />
            ),
          }

        } component={PictureScreen} />
        <Tab.Screen name="Account" options={
          {
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-circle" size={24} color="black" />
            ),
          }

        } component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}