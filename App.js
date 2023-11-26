import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import SavedScreen from "./screens/SavedScreen";
import SignUpScreen from "./screens/SignUpScreen";
import GenerateScreen from "./screens/GenerateScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AccountScreen from "./screens/AccountScreen";
import StackNavigation from "./StackNavigation";
import { Button, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { auth, logOut } from "./services/firebase";
import idea from "./assets/idea.svg";
import { TouchableOpacity } from "react-native"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const logout = async (navigation) => {
  await logOut();
  navigation.navigate("SignIn");
};

const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: "#957fef", // Set the header background color
  },
  headerTintColor: "#fff", // Set the text color in the header
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const screenOptions = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => logout(navigation)} color={"#fff"} title="Log Out" />
  ),
  ...commonHeaderOptions,
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
            // <MaterialIcons name="bolt" size={48} color="black" />
            <Image style={{ height: 35 }} src={idea} />
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
    <Stack.Navigator
      screenOptions={{ headerShown: false, ...commonHeaderOptions }}
    >
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
