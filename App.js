import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; // Import createStackNavigator
import SignInScreen from "./screens/SignInScreen"; // Make sure to import SignInScreen
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import SignUpScreen from "./screens/SignUpScreen";
import GenerateScreen from "./screens/GenerateScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AccountScreen from "./screens/AccountScreen";
import StackNavigation from "./StackNavigation";
import { Button } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, logOut } from "./services/firebase";
import idea from "./assets/idea.svg";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const logout = async (navigation) => {
  // Implement your logout logic here
  // This might include clearing user data from storage and navigating to the sign-in screen
  await logOut(); // Call the logout function to sign the user out
  navigation.navigate("SignIn");
};

const screenOptions = ({ navigation }) => ({
  headerRight: () => (
    <Button onPress={() => logout(navigation)} title="Log Out" color="#000" />
  ),
});

// Define the main tab navigator as a separate component
function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color="black" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Saved Activities"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={24} color="black" />
          ),
        }}
        component={StackNavigation}
      />
      <Tab.Screen
        name="Generate"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <img style={{ height: "35px" }} src={idea} />
          ),
        }}
        component={GenerateScreen}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-circle" size={24} color="black" />
          ),
        }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}
function SignInStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SignInStack />
    </NavigationContainer>
  );
}
