import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { markActivityAsCompleted, toggleActivityCompleteness,getActivityCompletionStatus } from "../services/activity"; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing Icon

function ActivityScreen({ route }) {
  const [favorite, setFavorite] = useState(null); // Initialize 'favorite' state
  const { response } = route.params; // Assuming response is already a JSON string
  const activityDetails = JSON.parse(response); // Parsing the JSON string to an object
  const navigation = useNavigation();
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const status = await getActivityCompletionStatus(activityDetails.id);
        setFavorite(status); // Directly set 'favorite' to the boolean value returned
        console.log(favorite)
      } catch (error) {
        console.error("Error fetching favorite status:", error);
      }
    };
  
    fetchFavoriteStatus();
  }, [activityDetails.id]);
  const handleMarkAsCompleted = async () => {
    try {
      console.log("Marking Activity as Completed:", activityDetails.id); // Log the ID for debugging
      await toggleActivityCompleteness(activityDetails.id);
      alert("Activity marked as favorite"); // Provide user feedback
      navigation.navigate('MainTabs')
    } catch (error) {
      console.error("Error marking activity as completed:", error);
    }
  };
  
  return (
    <ScrollView style={styles.scrollViewStyle}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Recommended Activity</Text>
        <Text style={styles.secondTitle}>{activityDetails.Title}</Text>
        <Text style={styles.sectionTitle}>Materials</Text>
        <Text style={styles.activityText}>{activityDetails.Material}</Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.activityText}>{activityDetails.Description}</Text>
        <TouchableOpacity onPress={handleMarkAsCompleted} style={styles.completeButton}>
        <View style={styles.buttonContent}>
        <Icon name={favorite ? "heart" : "heart-o"} size={20} color="#fff" />
        <Text style={styles.favoriteButtonText}>
          {favorite ? "Unmark as Favorite" : "Mark as Favorite"}
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
    backgroundColor: "#0052ff",
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
    // maxWidth: "600px",
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
    // maxWidth: "600px",
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
    // maxWidth: "600px",
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
