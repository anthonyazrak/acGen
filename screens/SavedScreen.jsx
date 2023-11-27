import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { auth } from "../services/firebase";
import { getNotCompletedActivitiesByUid } from "../services/activity";
import { useFocusEffect } from "@react-navigation/native";

function SavedScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  const fetchActivities = async (uid) => {
    try {
      const fetchedActivities = await getNotCompletedActivitiesByUid(uid);
      setActivities(fetchedActivities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate("MainTabs");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch activities when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchActivities(user.uid);
      }
    }, [user])
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {activities.map((item) => (
          <TouchableOpacity
            onPress={() => {
              const activityDetails = {
                id: item.id,
                Title: item.title,
                Material: item.materialsNeeded,
                Description: item.description,
              };
              navigation.navigate("DetailsScreen", {
                response: JSON.stringify(activityDetails),
              });
            }}
            key={item.id}
            style={{
              width: "100%",
              marginVertical: 10,
              padding: 20,
              borderRadius: 15,
              backgroundColor: "#b5cffd",
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
        <Text style={{ color: "#000", fontSize: 20, fontWeight: "normal", textAlign: "center" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default SavedScreen;
