import React, { useState, useEffect }  from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../services/firebase";
import { getNotCompletedActivitiesByUid } from '../services/activity'; 

function SavedScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]); // State to store activities

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const fetchedActivities = await getNotCompletedActivitiesByUid(user.uid);
          setActivities(fetchedActivities);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
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
  <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
    <ScrollView>
      {activities.map((item) => (
        <TouchableOpacity
          onPress={() => {
            const activityDetails = {
              id: item.id,
              Title: item.title,
              Material: item.materialsNeeded,
              Description: item.description,
            };
            navigation.navigate("DetailsScreen", { response: JSON.stringify(activityDetails) });
          }}
          key={item.id}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            width: "100%",
            height: "100%", // Adjust the height as needed
            marginVertical: 10, // Added margin for spacing
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);
}

export default SavedScreen;
