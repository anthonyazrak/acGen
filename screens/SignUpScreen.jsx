import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  auth,
} from "../services/firebase";

function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    age: "",
    city: "",
    confirmPassword: "", // New password input
    password: "",
  });
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState("");
  const [user, setUser] = useState(null); // To store the authenticated user

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
        navigation.navigate("MainTabs");
      } else {
        // Redirect to the root path if there's no signed-in user
        // navigation.navigate("SignUp");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleInputChange = (text, field) => {
    setFormData({ ...formData, [field]: text });
  };

  const addActivity = () => {
    if (currentActivity.trim()) {
      setFavoriteActivities([...favoriteActivities, currentActivity.trim()]);
      setCurrentActivity("");
    }
  };

  const handleSignUpWithEmailAndPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    registerWithEmailAndPassword(auth, formData);
  };

  const back = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange(text, "name")}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange(text, "lastName")}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange(text, "email")}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleInputChange(text, "password")}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => handleInputChange(text, "confirmPassword")}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={formData.age}
        onChangeText={(text) => handleInputChange(text, "age")}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => handleInputChange(text, "city")}
      />

      <View style={styles.activityInputContainer}>
        <TextInput
          style={[styles.input, styles.activityInput]}
          placeholder="Favorite Activity"
          value={currentActivity}
          onChangeText={setCurrentActivity}
        />
        <Button title="Add" onPress={addActivity} color="#007AFF" />
      </View>

      <View style={styles.activitiesContainer}>
        {favoriteActivities.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityButton}>
            <Text style={styles.activityButtonText}>{activity}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        title="Sign Up"
        onPress={handleSignUpWithEmailAndPassword}
        color="#007AFF"
      />
      <View style={{ marginTop: "10px" , width: "100%"}}>
        <Button title="Back to Sign In" onPress={back} color="#007AFF" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50, // Extra padding at the top
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center", // Center title text horizontally
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  activityInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  activityInput: {
    flex: 1,
    marginRight: 10, // Add margin between the input and the button
  },
  activitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  activityButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  activityButtonText: {
    color: "white",
  },
});

export default SignUpScreen;
