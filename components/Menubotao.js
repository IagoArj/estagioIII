import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const MenuBotao = props => {
    return (
        
            <View style={styles.backgroundCard}>
                <Text style={styles.text}>{props.titulo}</Text>
            </View>
        

    );
}
const styles = StyleSheet.create({
    backgroundCard: {
        backgroundColor: '#641e82',
        width: 250,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom:30,
        borderRadius:10

    },
    text: {
        color: '#fff',
        fontWeight: "bold"
    },
})
export default MenuBotao;