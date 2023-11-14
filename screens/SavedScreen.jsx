import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


function SavedScreen({navigation}) {

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
    ]

    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems:"center" }}>
            {demoData.map(item => (
                <TouchableOpacity onPress={
                    () => navigation.navigate("Details", {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        materialsNeeded: item.materialsNeeded,
                    })
                } key={item.id} style={{
                    backgroundColor: "black",
                    width: "90%",
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 10,
                    borderRadius: 20,
                    padding: 10,
                }}>
                    <Text style={{ color: "white", fontSize: 20}}>{item.title}</Text>
                    <Text style={{ color: "white", textAlign:"center" }}>{item.description}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
  }

export default SavedScreen;
