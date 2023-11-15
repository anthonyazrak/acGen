import React, { useState } from 'react';
import { View, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function HomeScreen() {
  const [activities, setActivities] = useState([
    { id: '1', name: 'Painting Alone', imageUri: null },
    { id: '2', name: 'Football with Friends', imageUri: null },
    // ... other activities
  ]);

  const pickImage = async (id) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setActivities(activities.map(activity => {
        if (activity.id === id) {
          return { ...activity, imageUri: result.uri };
        }
        return activity;
      }));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "white" }}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center', margin: 20 }}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={{ width: 200, height: 200 }} />
            ) : (
              <TouchableOpacity onPress={() => pickImage(item.id)}>
                <Text>Add a picture</Text>
              </TouchableOpacity>
            )}
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default HomeScreen;
