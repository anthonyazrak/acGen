import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { markActivityAsCompleted } from "../services/activity"; // Adjust the path as necessary

function ActivityScreen({ route }) {
  const { response } = route.params; // Assuming response is already a JSON string
  const activityDetails = JSON.parse(response); // Parsing the JSON string to an object
  const navigation = useNavigation();
  const handleMarkAsCompleted = async () => {
    try {
      console.log("Marking Activity as Completed:", activityDetails.id); // Log the ID for debugging
      await markActivityAsCompleted(activityDetails.id);
      alert("Activity marked as completed"); // Provide user feedback
      navigation.navigate("MainTabs");
    } catch (error) {
      console.error("Error marking activity as completed:", error);
      alert("Failed to mark activity as completed"); // Error feedback
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
          style={styles.completeButton}
        >
          <Text style={styles.completeButtonText}>Complete Activity</Text>
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
    backgroundColor: "#DEC0F1",
    padding: "20px",
    borderRadius: "10px",
  },
  backButtonText: {
    fontSize: 24,
    color: "#eff7f6",
  },
});

export default ActivityScreen;
