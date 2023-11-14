import React from 'react';
import { View, Text } from 'react-native';

function DetailsScreen({ route }){
    // Extract the passed parameters from the route
    const { title, description, materialsNeeded } = route.params;

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>{title}</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>{description}</Text>
            <Text style={{ fontSize: 16 }}>{materialsNeeded}</Text>
        </View>
    )
}

export default DetailsScreen;
