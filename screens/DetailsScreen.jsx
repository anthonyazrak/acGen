import React from "react";
import { View, Text } from "react-native";

function DetailsScreen({ route }) {
  // Extract the passed parameters from the route
  const { title, description, materialsNeeded } = route.params;
  const [user, setUser] = useState(null); // To store the authenticated user

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to the root path if there's no signed-in user
        navigation.navigate("MainTabs");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>{description}</Text>
      <Text style={{ fontSize: 16 }}>{materialsNeeded}</Text>
    </View>
  );
}

export default DetailsScreen;
