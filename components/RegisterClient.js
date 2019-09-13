import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const RegisterClient = props => {
    return (
        
            <View style={styles.backgroundCard}>
                <Text style={styles.text}>Registar Cliente</Text>
            </View>
        

    );
}
const styles = StyleSheet.create({
    backgroundCard: {
        backgroundColor: '#fff',
        width: 250,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom:30

    },
    text: {
        color: 'black',
        fontWeight: "bold"
    },
})
export default RegisterClient;