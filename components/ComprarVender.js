import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const ComprarVender = props => {
    return (
        <View style={styles.backgroundCard}  >
            <Icon name={props.icon} size={60} color='white' ></Icon>
            <Text style={styles.text}>{props.titulo}</Text>
        </View>
    );
    
}
const styles = StyleSheet.create({
    backgroundCard: {
        backgroundColor: '#22B573',
        width: 155,
        height: 125,
        justifyContent:'center',
        alignItems: "center",
        marginBottom:30,
        marginRight:15,
        marginLeft:15,
        borderRadius:10,
        marginTop:15
    },
    text: {
        marginTop:10,
        color: '#fff',
        fontSize:18,
        fontWeight: "bold",

    },
})
export default ComprarVender;