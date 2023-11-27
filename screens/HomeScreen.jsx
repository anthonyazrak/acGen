import React, { useState, useEffect, useCallback} from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  Image as RNImage, // Rename the React Native Image component
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  RefreshControl,
  Share,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LogBox } from "react-native";
import * as FileSystem from "expo-file-system";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { getDownloadURL, ref } from "firebase/storage";
import { auth } from "../services/firebase";
import {
  getCompletedActivitiesByUid,
  addImageDocumentToDoc,
  updateActivityImage
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
        setActivities(fetchedActivities);
      } catch (error) {
        console.error("Error fetching completed activities:", error);
      }
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("User state changed:", currentUser); // Add this line
      setUser(currentUser);
      if (currentUser) {
        fetchActivities();
      }
    });
    return () => unsubscribe();
  }, []);
  

  // Fetch activities when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchActivities();
    }, [user]) // Dependency array includes 'user' if 'fetchActivities' depends on it
  );


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
      // Convert image to base64
      // const base64Image = await imageToBase64(uri);
      // addImageDocumentToDoc(id, base64Image);
      await updateActivityImage(id, uri);

      setActivities((currentActivities) =>
        currentActivities.map((activity) => {
          if (activity.id === id) {
            return { ...activity, image: uri };
          }
          return activity;
        })
      );
    }
  };

// const imageToBase64 = async (imageFile) => {
//   try {
//     if (Platform.OS === "web") {
//       // For web, fetch the image and convert it to base64
//       const response = await fetch(imageFile);
//       const blob = await response.blob();

//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = async () => {
//           const img = new Image();
//           img.onload = () => {
//             const canvas = document.createElement("canvas");
//             const ctx = canvas.getContext("2d");

//             // Calculate the new dimensions to maintain aspect ratio
//             let width = img.width;
//             let height = img.height;
//             const maxFileSize = 10 * 1024 * 1024; // 10MB
//             const maxDimension = Math.sqrt(maxFileSize / (4 / 3)); // Assuming 4:3 aspect ratio

//             if (width > maxDimension || height > maxDimension) {
//               const aspectRatio = width / height;

//               if (width > height) {
//                 width = maxDimension;
//                 height = width / aspectRatio;
//               } else {
//                 height = maxDimension;
//                 width = height * aspectRatio;
//               }
//             }

//             // Set canvas dimensions
//             canvas.width = width;
//             canvas.height = height;

//             // Draw the image on the canvas with downsampling
//             ctx.drawImage(img, 0, 0, width, height);

//             // Convert the canvas content to base64
//             const base64String = canvas.toDataURL("image/jpeg", 0.9); // Adjust the quality if needed
//             resolve(base64String.split(",")[1]);
//           };
//           img.onerror = reject;
//           img.src = URL.createObjectURL(blob);
//         };
//         reader.onerror = reject;
//         reader.readAsArrayBuffer(blob);
//       });
//     } else {
//   // For mobile, use expo-file-system
//   const maxFileSize = 10 * 1024 * 1024; // 10MB
//   const encoding = FileSystem.EncodingType;

//   // Read the file as an ArrayBuffer to check its size
//   const arrayBuffer = await FileSystem.readAsStringAsync(imageFile, { encoding: encoding.Binary });
//   const fileSize = arrayBuffer.byteLength;

//   // Check if downsampling is needed
//   if (fileSize > maxFileSize) {
//     // If the file size exceeds the maximum, calculate new dimensions to maintain aspect ratio
//     const imageBlob = await FileSystem.readAsStringAsync(imageFile, { encoding: encoding.Base64 });
//     const img = new Image();
//     img.src = `data:image/png;base64,${imageBlob}`;

//     let width = img.width;
//     let height = img.height;
//     const aspectRatio = width / height;

//     // Calculate new dimensions while maintaining aspect ratio
//     width = Math.sqrt(maxFileSize * aspectRatio);
//     height = width / aspectRatio;

//     // Resize the image
//     const resizedBase64 = await ImageManipulator.manipulateAsync(
//       `data:image/png;base64,${imageBlob}`,
//       [{ resize: { width, height } }],
//       { base64: true, compress: 0.9 }
//     );

//     return resizedBase64.base64;
//   } else {
//     // If downsampling is not needed, read the file as base64 directly
//     const base64 = await FileSystem.readAsStringAsync(imageFile, { encoding: encoding.Base64 });
//     return base64;
//   }
//     }
//   } catch (error) {
//     console.error("Error converting image to base64:", error);
//     throw error;
//   }
// };
const imageToBase64 = async (uri) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};



  const onShare = async (id, material, description) => {
    try {
      const result = await Share.share({
        message:
          `Check out this activity I generated!` +
          "\n" +
          "\n" +
          `Title: ${id}` +
          "\n" +
          "\n" +
          `Materials needed: ${material}` +
          "\n" +
          "\n" +
          `Description:` +
          "\n" +
          `${description}`,
      });
    } catch (error) {
      console.error("Error sharing activity:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user && <Text style={styles.welcomeText}>Welcome, {user.email}</Text>}
      <Text style={styles.welcomeText}>Favorite Activities</Text>
      <FlatList
  data={activities}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.activityContainer}>
      <TouchableOpacity>
        {item.image ? (
          <RNImage
            source={{ uri: item.image }}
            style={styles.activityImage}
            onError={(error) =>
              console.error("Image loading error:", error.nativeEvent.error, item.image)
            }
          />        ) : (
          // Placeholder for when there is no image
          <View style={styles.activityImagePlaceholder}>
            <Text>Add Picture</Text>
          </View>
        )}
      </TouchableOpacity>
            <TouchableOpacity
                onPress={() => pickImage(item.id)}
                style={styles.addButton}
              >
                <MaterialIcons name="add-a-photo" size={24} color="black" />
              </TouchableOpacity>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
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
              }}>
              <View>
                <Text style={styles.activityTitle}>{item.title}</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  onShare(item.title, item.materialsNeeded, item.description)
                }
                style={{
                  padding: 10,
                  borderRadius: 8,
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                <Feather name="share" size={24} color="black" />
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center', // Added for centering content
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Ensure the text color is visible
    marginBottom: 10
  },
  activityContainer: {
    alignItems: "center",
    marginVertical: 5,
    marginLeft: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,   // Set the width of the border
    borderColor: "#000",
    width: "94%"
  },
  activityImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#fff",
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
    backgroundColor: "#b5cffd",
    padding: 10,
    marginLeft:53,
    borderRadius: 10,
    color: "#333",
  },
});

export default HomeScreen;
