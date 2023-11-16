import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { markActivityAsCompleted } from '../services/activity'; // Adjust the path as necessary

function ActivityScreen({ route }) {
  console.log(route)
  const { response } = route.params; // Assuming response is already a JSON string
  const activityDetails = JSON.parse(response); // Parsing the JSON string to an object
  const navigation = useNavigation();
  const handleMarkAsCompleted = async () => {
    try {
      console.log("Marking Activity as Completed:", activityDetails.id); // Log the ID for debugging
      await markActivityAsCompleted(activityDetails.id);
      alert("Activity marked as completed"); // Provide user feedback
      navigation.navigate('MainTabs')
    } catch (error) {
      console.error("Error marking activity as completed:", error);
      alert("Failed to mark activity as completed"); // Error feedback
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
          <Text style={styles.completeButtonText}>Complete Activity</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  completeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  secondTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  activityText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#0000ff',
  },
});

export default ActivityScreen;
