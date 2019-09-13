import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const Relatorio = props => {
    return (
        
            <View style={styles.backgroundCard}>
                <Text style={styles.text}>Relatorios</Text>
            </View>
        
    );
}
const styles = StyleSheet.create({
    backgroundCard: {
        backgroundColor: '#fff',
        width: 250,
        height: 60,
        justifyContent: "center",
        alignItems: "center"

    },
    text: {
        color: 'black',
        fontWeight: "bold"
    },
    btn:{
        marginBottom:40
    }
})
export default Relatorio;