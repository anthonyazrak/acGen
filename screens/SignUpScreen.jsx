import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function SignUpScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    age: '',
    city: '',
  });
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState('');

  const handleInputChange = (text, field) => {
    setFormData({ ...formData, [field]: text });
  };

  const addActivity = () => {
    if (currentActivity.trim()) {
      setFavoriteActivities([...favoriteActivities, currentActivity.trim()]);
      setCurrentActivity('');
    }
  };

  const submitForm = () => {
    // Submit form logic here
    console.log(formData, favoriteActivities);
    navigation.navigate('MainTabs');
    // You would typically send this data to a backend server for processing
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange(text, 'name')}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => handleInputChange(text, 'lastName')}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange(text, 'email')}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={formData.age}
        onChangeText={(text) => handleInputChange(text, 'age')}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => handleInputChange(text, 'city')}
      />

      <View style={styles.activityInputContainer}>
        <TextInput
          style={[styles.input, styles.activityInput]}
          placeholder="Favorite Activity"
          value={currentActivity}
          onChangeText={setCurrentActivity}
        />
        <Button title="Add" onPress={addActivity} color="#007AFF" />
      </View>

      <View style={styles.activitiesContainer}>
        {favoriteActivities.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityButton}>
            <Text style={styles.activityButtonText}>{activity}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Sign Up" onPress={submitForm} color="#007AFF" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50, // Extra padding at the top
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop : 20,
    alignSelf: 'center', // Center title text horizontally
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  activityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  activityInput: {
    flex: 1,
    marginRight: 10, // Add margin between the input and the button
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  activityButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  activityButtonText: {
    color: 'white',
  },
  // ... other styles ...
});

export default SignUpScreen;
