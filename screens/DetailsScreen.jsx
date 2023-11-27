import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { markActivityAsCompleted } from "../services/activity"; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing Icon

function ActivityScreen({ route }) {
  const { response } = route.params; // Assuming response is already a JSON string
  const activityDetails = JSON.parse(response); // Parsing the JSON string to an object
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleMarkAsCompleted = async () => {
    try {
      // If it's already favorite, we might want to unmark it
      if (isFavorite) {
        console.log("Unmarking Activity as Favorite:", activityDetails.id);
        // Here you would call a method to unmark the activity as favorite
      } else {
        console.log("Marking Activity as Favorite:", activityDetails.id);
        await markActivityAsCompleted(activityDetails.id);
      }
      setIsFavorite(!isFavorite); // Toggle the favorite status
      // Provide user feedback
      Alert.alert(isFavorite ? "Activity unmarked as favorite" : "Activity marked as favorite", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MainTabs"),
        },
      ]);
    } catch (error) {
      console.error("Error handling favorite status:", error);
      Alert.alert("Error handling favorite status", [
        {
          text: "OK",
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MainTabs")}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>{"Back"}</Text>
        </TouchableOpacity>

        <View style={styles.detailsCard}>
          <Text style={styles.mainTitle}>Recommended Activity</Text>
          <Text style={styles.secondTitle}>{activityDetails.Title}</Text>
          <Text style={styles.sectionTitle}>Materials</Text>
          <Text style={styles.activityText}>{activityDetails.Material}</Text>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.activityText}>{activityDetails.Description}</Text>
        </View>

        <TouchableOpacity
      onPress={handleMarkAsCompleted}
      style={styles.favoriteButton}
    >
      <View style={styles.buttonContent}>
        <Icon name={isFavorite ? "heart" : "heart-o"} size={20} color="#fff" />
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? "Unmark as Favorite" : "Mark as Favorite"}
        </Text>
      </View>
    </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  container: {
    padding: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxWidth: "600px",
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteButton: {
    padding: 15,
    backgroundColor: "#000",
    maxWidth: "600px",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  buttonContent: {
    flexDirection: 'row', // Align icon and text horizontally
    justifyContent: 'center', // Center the content horizontally
    alignItems: 'center', // Center the content vertically
  },
  favoriteButtonText: {
    marginLeft: 10, // Add some space between icon and text
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  completeButton: {
    padding: 15,
    backgroundColor: "#7161EF",
    maxWidth: "600px",
    borderRadius: 10,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  secondTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    color: "#000",
  },
  activityText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#666",
    textAlign: "left",
    lineHeight: 24,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#528ffb",
    padding: 10,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 15,
    color: "#eff7f6",
  },
});

export default ActivityScreen;
