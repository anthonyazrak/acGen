import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  auth,
} from "../services/firebase";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // To store the authenticated user

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigation.navigate("MainTabs");
      } else {
        // navigation.navigate("SignIn");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = () => {
    // Insert sign-in logic here
    logInWithEmailAndPassword(email, password);
  };

  const handleSignUpNavigation = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUpNavigation}>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "gray",
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
  },
  signupButton: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignInScreen;
