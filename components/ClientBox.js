import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const ClientBox = props => {
    return (
        
        <View style={styles.cliente}>
            <Text style={styles.text} >{props.nome}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    cliente: {
        height: 50,
        width: 300,
        backgroundColor: '#641e82',
        justifyContent: 'center',
        alignItems:'center',
        marginTop: 15,
        borderRadius: 10
    },
    text:{
        color: '#fff',
        fontWeight: "bold"
    }
})
export default ClientBox;