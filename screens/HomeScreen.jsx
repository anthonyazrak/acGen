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
  console.log(activities);

  const pickImage = async (id) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result); // Log the result to see what data is returned

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      // console.log("Updating activity with ID:", id, "with URI:", uri); // Log the URI being set
      addImageDocumentToDoc(id, uri);

      // setActivities((currentActivities) =>
      //   currentActivities.map((activity) => {
      //     if (activity.id === id) {
      //       return { ...activity, imageUri: uri };
      //     }
      //     return activity;
      //   })
      // );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}!</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
                onError={(error) =>
                  console.error("Image loading error:", error.nativeEvent.error)
                }
              />
            ) : (
              <TouchableOpacity
                onPress={() => pickImage(item.id)}
                style={styles.imageButton}
              >
                <Text>Add a picture</Text>
              </TouchableOpacity>
            )}
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
              <Text style={styles.activityTitle}>{item.title}</Text>
            </TouchableOpacity>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    margin: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 200,
    backgroundColor: "#ddd",
  },
  activityTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#CBC3E3",
    padding: 10,
    borderRadius: 10,
    color: "#333",
  },
});
export default HomeScreen;
