import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  auth,
  fetchUserDetails,
  updateUserDetails,
} from "../services/firebase";
import { useFocusEffect } from "@react-navigation/native";

function AccountScreen({ navigation }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate("SignIn");
      }
    });
    return () => unsubscribe();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        fetchUserDetails(user.uid)
          .then((userDetails) => {
            setName(userDetails.name);
            setLastName(userDetails.lastName);
            setAge(userDetails.age.toString());
            setCity(userDetails.city);
            setActivities(userDetails.activities || []);
          })
          .catch((error) =>
            console.error("Error fetching user details:", error)
          );
      }
    }, [user])
  );

  const addActivity = () => {
    if (newActivity) {
      setActivities([...activities, newActivity]);
      setNewActivity("");
    }
  };

  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (user) {
      const updatedDetails = {
        name: name,
        lastName: lastName,
        age: age,
        city: city,
        activities: activities,
      };

      try {
        await updateUserDetails(user.uid, updatedDetails);
        console.log("User details updated successfully");
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Your last name"
            />
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              placeholder="Your age"
            />
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Your city"
            />
            <Text style={styles.label}>Favorite Activities:</Text>
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
            <TouchableOpacity style={styles.addButton} onPress={addActivity}>
              <Text style={styles.addButtonLabel}>Add Activity</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    borderRadius: 10,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    marginLeft: 10,
    borderRadius: 15,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 40,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#000",
    borderRadius: 40,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AccountScreen;
