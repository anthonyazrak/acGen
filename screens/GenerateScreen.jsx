import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function GenerateScreen() {
    const [selectedId, setSelectedId] = useState(null);

    const options = [
        { id: 1, title: 'At home' },
        { id: 2, title: 'Beach' },
        { id: 3, title: 'Forest' },
        { id: 4, title: 'Park' },
    ];

    const handlePress = (id) => {
        if (selectedId === id) {
            setSelectedId(null); // Deselect if already selected
        } else {
            setSelectedId(id); // Select the new option
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Setting</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.option, selectedId === item.id ? styles.selectedOption : null]}
                        onPress={() => handlePress(item.id)}
                    >
                        <Text style={styles.optionText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={styles.headerText}>Setting</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.option, selectedId === item.id ? styles.selectedOption : null]}
                        onPress={() => handlePress(item.id)}
                    >
                        <Text style={styles.optionText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={styles.headerText}>Setting</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.option, selectedId === item.id ? styles.selectedOption : null]}
                        onPress={() => handlePress(item.id)}
                    >
                        <Text style={styles.optionText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    scrollView: {
        flexDirection: 'row',
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 80
    },
    selectedOption: {
        backgroundColor: 'lightblue', // Change the color for selected option
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default GenerateScreen;
