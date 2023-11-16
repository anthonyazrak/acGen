import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function SavedScreen({ navigation }) {
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

  let demoData = [
    {
      id: 1,
      title: "aodsdjfklsdfjksldfjlkhhhhhhhhhhhhhs",
      description: "ddsdsflsjdfklsjflkjjjjjjjjjjsjfdlksjdflkjsdf",
      materialsNeeded: "odsdlfjskdlfjskldfjskljdflks",
    },
    {
      id: 2,
      title: "Jane Doe",
      description: "iiiiijouoiuoiuoiuiiiiiiii",
      materialsNeeded: "",
    },
    {
      id: 3,
      title: "John Smith",
      description: "",
      materialsNeeded: "",
    },
    {
      id: 4,
      title: "Jane Smith",
      description: "",
      materialsNeeded: "",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <ScrollView>
        {demoData.map((item) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", {
                id: item.id,
                title: item.title,
                description: item.description,
                materialsNeeded: item.materialsNeeded,
              })
            }
            key={item.id}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              width: "100%",
              height: "100%",
              padding: 20,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>{item.title}</Text>
            <Text style={{ color: "white", textAlign: "center" }}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default SavedScreen;
