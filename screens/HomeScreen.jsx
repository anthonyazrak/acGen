import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function HomeScreen() {
  const [activities, setActivities] = useState([
    { id: '1', name: 'Painting Alone', imageUri: null },
    { id: '2', name: 'Football with Friends', imageUri: null },
    // ... other activities
  ]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
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
  
    console.log(result); // Log the result to see what data is returned
  
    if (!result.cancelled) {
      // Extract the uri from the first item in the assets array
      const uri = result.assets[0].uri;
      console.log('Updating activity with ID:', id, 'with URI:', uri); // Log the URI being set
  
      setActivities(currentActivities => currentActivities.map(activity => {
        if (activity.id === id) {
          return { ...activity, imageUri: uri };
        }
        return activity;
      }));
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center', margin: 20 }}>
            {item.imageUri ? (
              <Image source={{ uri: item.imageUri }} style={{ width: 200, height: 200 }} />
            ) : (
              <TouchableOpacity onPress={() => pickImage(item.id)} style={{ alignItems: 'center', justifyContent: 'center', height: 200, width: 200, backgroundColor: '#ddd' }}>
                <Text>Add a picture</Text>
              </TouchableOpacity>
            )}
            <Text style={{ marginTop: 10 }}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default HomeScreen;
