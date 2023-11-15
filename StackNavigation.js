// // In your App.js or a separate file for navigators
// import { createStackNavigator } from '@react-navigation/stack';
// import SavedScreen from './screens/SavedScreen';
// import DetailsScreen from './screens/DetailsScreen';

// const SavedStack = createStackNavigator();

// const SavedStackScreen = () => (
//   <SavedStack.Navigator>
//     <SavedStack.Screen name="Saved" component={SavedScreen} />
//     <SavedStack.Screen name="Details" component={DetailsScreen} />
//   </SavedStack.Navigator>
// );

// export default SavedStackScreen;

// In SavedStackScreen.js or your navigation file
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native'; // Make sure Button is imported
import SavedScreen from './screens/SavedScreen';
import DetailsScreen from './screens/DetailsScreen';

const SavedStack = createStackNavigator();

const logout = (navigation) => {
  // Implement your logout logic here
  // This might include clearing user data from storage and navigating to the sign-in screen
  navigation.navigate('SignIn');
};

const SavedStackScreen = ({ navigation }) => (
  <SavedStack.Navigator>
    <SavedStack.Screen 
      name="Saved" 
      component={SavedScreen} 
      options={{
        headerRight: () => (
          <Button
            onPress={() => logout(navigation)}
            title="Log Out"
            color="#000"
          />
        ),
        headerLeft: null, // To hide the back button if it exists
      }} 
    />
    <SavedStack.Screen name="Details" component={DetailsScreen} />
  </SavedStack.Navigator>
);

export default SavedStackScreen;
