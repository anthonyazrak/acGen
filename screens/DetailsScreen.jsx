import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../services/firebase";

function ActivityScreen({ route }) {
  const { response } = route.params;
  const [user, setUser] = useState(null); // To store the authenticated user

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to the root path if there's no signed-in user
        // navigation.navigate("SignIn");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.activityText}>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ActivityScreen;
