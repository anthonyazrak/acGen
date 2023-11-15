import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


function SavedScreen() {

    demoData = [
        {
            id: 1,
            title: "aodsdjfklsdfjksldfjlks",
            description: "ddsdsflsjdfklsjflksjfdlksjdflkjsdf",
            materialsNeeded: "odsdlfjskdlfjskldfjskljdflks",
        },
        {
            id: 2,
            title: "Jane Doe",
            description: "",
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
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {
            demoData.map((item, index) => {
                return (
                    <View key={index} styles={{
                        backgroundColor: "black",
                        width: "100%",
                        height: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        marginVertical: 10,
                        borderRadius: 10,
                        padding: 10,

                    }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Details", {
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                materialsNeeded: item.materialsNeeded,
                            })
                        }
                        }>
                            <Text style={{ color: "white", fontSize: 20 }}>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                        
                        
                        
                    </View>
                )
            })
        }
      </View>
    );
  }

export default SavedScreen;
