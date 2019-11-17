import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const ClientBox = props => {
    return (

        <View style={styles.cliente}>
            <Text style={styles.text} >{props.nome}</Text>
            <View style={styles.pagar}>
                <Text style={styles.textGreen}>R$ {props.totalPagar}</Text>
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    cliente: {
        flexDirection: "column",
        backgroundColor: '#F9F9F9',
        marginTop: 7.5,
        marginBottom:7.5,
        marginLeft: 2.5,
        marginRight: 2.5,
        borderRadius: 10,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    pagar: {
        flex: 1,
        flexDirection: "row-reverse",
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#707070',
        fontSize:22,
        marginTop:10,
        marginBottom:15
    },
    textGreen: {
        color: '#45AE50',
        fontWeight: "bold",
        fontSize:20,
        marginRight:15,
        marginBottom:15
    }
})
export default ClientBox;