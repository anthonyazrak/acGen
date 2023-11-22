import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  RefreshControl,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { auth } from "../services/firebase";
import {
  getCompletedActivitiesByUid,
  addImageDocumentToDoc,
} from "../services/activity"; // Adjust the path as necessary
import { StyleSheet } from "react-native";
import { storage } from "../services/activity";

function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // New state for refresh control

  const fetchActivities = async () => {
    if (user && user.uid) {
      try {
        const fetchedActivities = await getCompletedActivitiesByUid(user.uid);

        // Fetch download URL for each activity's image
        const activitiesWithUrls = await Promise.all(
          fetchedActivities.map(async (activity) => {
            if (activity.imageUrl) {
              const storageRef = ref(storage, activity.imageUrl);
              activity.imageUrl = await getDownloadURL(storageRef);
            }

            return activity;
          })
        );

        // Update the state once all URLs are fetched and downloaded
        setActivities(activitiesWithUrls);
      } catch (error) {
        console.error("Error fetching completed activities:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchActivities();
      } else {
        // Handle no user signed in
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [user]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchActivities();
    setRefreshing(false);
  }, [user]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async (id) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      addImageDocumentToDoc(id, uri);

      setActivities((currentActivities) =>
        currentActivities.map((activity) => {
          if (activity.id === id) {
            return { ...activity, imageUri: uri };
          }
          return activity;
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}!</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityContainer}>
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
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.activityImage}
                onError={(error) =>
                  console.error("Image loading error:", error.nativeEvent.error)
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage(item.id)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add a picture</Text>
            </TouchableOpacity>
            <Text style={styles.activityTitle}>{item.title}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efd9ce",
    alignItems: "center",
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "center",
  },
  activityContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  activityImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#dec0f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#b79ced",
    padding: 10,
    borderRadius: 10,
    color: "#333",
  },
});

export default HomeScreen;
