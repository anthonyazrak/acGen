import React, { useState, useEffect }  from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { auth } from "../services/firebase";

function AccountScreen() {
  const [activities, setActivities] = useState([
    "Paint",
    "Football",
    "Party",
    "Read",
  ]);
  const [newActivity, setNewActivity] = useState("");
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

  const addActivity = () => {
    if (newActivity) {
      setActivities([...activities, newActivity]);
      setNewActivity(""); // Reset the input field
    }
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Account</Text>
          </View>
          <View style={styles.form}>
            <Text>Name</Text>
            <TextInput style={styles.input} />
            <Text>Last Name</Text>
            <TextInput style={styles.input} />
            <Text>Age</Text>
            <TextInput style={styles.input} keyboardType="numeric" />
            <Text>Gender</Text>
            <TextInput style={styles.input} />
            <Text>City</Text>
            <TextInput style={styles.input} />
            <Text>Favorite Activities:</Text>
            {activities.map((activity, index) => (
              <View key={index} style={styles.activityContainer}>
                <Text style={styles.activityText}>{activity}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeActivity(index)}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              style={styles.input}
              value={newActivity}
              onChangeText={setNewActivity}
              placeholder="Add new activity..."
            />
            <Button title="Add Activity" onPress={addActivity} />
            <TouchableOpacity style={styles.saveButton}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white", // or any color that matches your design
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    backgroundColor: "#dedede",
    borderRadius: 20,
    padding: 10,
  },
  form: {
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  activities: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  activityButton: {
    backgroundColor: "#e6e6e6",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 10,
    minWidth: "40%", // Ensures the button is not too narrow
    alignItems: "center", // Centers text horizontally
    justifyContent: "center", // Centers text vertically
  },
  saveButton: {
    backgroundColor: "#5c6bc0",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  activityText: {
    // Style for the activity text
    fontSize: 16,
  },
  deleteButton: {
    // Style for the delete button
    backgroundColor: "red",
    marginLeft: 10,
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    // Style for the 'X' text
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default AccountScreen;
