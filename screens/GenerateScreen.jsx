import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useContext } from 'react';


function GenerateScreen() {
  const API_KEY = "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";

  const [price, setPrice] = useState(10);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [timeOfDay, setTimeOfDay] = useState(12); // New state for time of the day
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [response, setResponse] = useState("");
  const locations = ["Home", "School", "Forest", "Beach", "Park", "Lake"];

  const selectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleGeneratePress = () => {
    console.log("Generate button pressed");
  };

  const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

  const sendPromptToChatGPT = async (prompt) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an activity recommendation engine, you must generate an activity that is tailored to my situation in this current moment.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const chatGPTResponse = result.choices[0].message.content;

      return chatGPTResponse;
    } catch (error) {
      console.error("Error sending prompt to ChatGPT:", error);
      throw error;
    }
  };

  const handleGenerateActivity = async () => {
    try {
      setLoadingActivity(true);
      const prompt = `Suggest an activity for me. My current setting is ${selectedLocation}, my price range for budget is ${price}. and I am in a group of ${numberOfPeople}.`;
      console.log(prompt);
      await sendPromptToChatGPT(prompt)
        .then((response) => {
          setResponse(response);
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error generating activity:", error);
    } finally {
      setLoadingActivity(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Choose a location</Text>
        <View style={styles.locationContainer}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location}
              style={[
                styles.locationButton,
                selectedLocation === location && styles.selectedLocation,
              ]}
              onPress={() => selectLocation(location)}
            >
              <Text style={styles.locationText}>{location}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Budget: ${price}</Text>
          <Slider
            style={styles.slider}
            value={price}
            onValueChange={setPrice}
            minimumValue={0}
            maximumValue={100}
            step={10}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Number of People: {numberOfPeople}</Text>
          <Slider
            style={styles.slider}
            value={numberOfPeople}
            onValueChange={setNumberOfPeople}
            minimumValue={1}
            maximumValue={10}
            step={1}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Time of the Day: {timeOfDay}h</Text>
          <Slider
            style={styles.slider}
            value={timeOfDay}
            onValueChange={setTimeOfDay}
            minimumValue={0}
            maximumValue={24}
            step={1}
          />
        </View>

        <TouchableOpacity
          style={
            !loadingActivity ? styles.generateButton : styles.loadingButton
          }
          onPress={handleGenerateActivity}
          disabled={loadingActivity}
        >
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  locationButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    minWidth: "48%", // Ensure at least two buttons fit in one row
  },
  selectedLocation: {
    backgroundColor: "#c2f0c2", // Highlight color for selected location
  },
  locationText: {
    fontSize: 16,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    height: 40,
  },
  generateButton: {
    backgroundColor: "#000", // Black background
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loadingButton: {
    backgroundColor: "gray", // Black background
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  generateButtonText: {
    color: "#ffffff", // White text color
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GenerateScreen;
