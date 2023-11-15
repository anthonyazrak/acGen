import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

function GenerateScreen() {
    const [price, setPrice] = useState(10);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState('');

    const locations = ['Home', 'School', 'Forest', 'Beach', 'Park'];

    const selectLocation = (location) => {
        setSelectedLocation(location);
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
                    <Text style={styles.label}>Price: ${price}</Text>
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

                {/* Additional content and buttons */}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    locationContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    locationButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        minWidth: '48%', // Ensure at least two buttons fit in one row
    },
    selectedLocation: {
        backgroundColor: '#c2f0c2', // Highlight color for selected location
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
});


export default GenerateScreen;


// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// function GenerateScreen() {
//     const [selectedId, setSelectedId] = useState(null);

//     const options = [
//         { id: 1, title: 'At home' },
//         { id: 2, title: 'Beach' },
//         { id: 3, title: 'Forest' },
//         { id: 4, title: 'Park' },
//     ];

//     const handlePress = (id) => {
//         if (selectedId === id) {
//             setSelectedId(null); // Deselect if already selected
//         } else {
//             setSelectedId(id); // Select the new option
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.headerText}>Setting</Text>
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
//                 {options.map((item) => (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[styles.option, selectedId === item.id ? styles.selectedOption : null]}
//                         onPress={() => handlePress(item.id)}
//                     >
//                         <Text style={styles.optionText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//             <Text style={styles.headerText}>Setting</Text>
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
//                 {options.map((item) => (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[styles.option, selectedId === item.id ? styles.selectedOption : null]}
//                         onPress={() => handlePress(item.id)}
//                     >
//                         <Text style={styles.optionText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//             <Text style={styles.headerText}>Setting</Text>
//             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
//                 {options.map((item) => (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[styles.option, selectedId === item.id ? styles.selectedOption : null]}
//                         onPress={() => handlePress(item.id)}
//                     >
//                         <Text style={styles.optionText}>{item.title}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: 'white',
//     },
//     headerText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginVertical: 20,
//     },
//     scrollView: {
//         flexDirection: 'row',
//     },
//     option: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius: 20,
//         marginHorizontal: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//         height: 80
//     },
//     selectedOption: {
//         backgroundColor: 'lightblue', // Change the color for selected option
//     },
//     optionText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
// });

// export default GenerateScreen;
