import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const ClientBox = props => {
    return (
        
            <View style={styles.cliente}>
                <Text style={styles.text} >{props.nome}</Text>
                <View style={styles.pagar}>
                    <Text style={styles.textWhite}>Pagar: </Text>
                    <Text style={styles.textGreen}>{props.totalPagar}</Text>
                </View>
            </View>
        
    );
}
const styles = StyleSheet.create({
    cliente: {
        flexDirection: "column",
        height: 125,
        width: 125,
        backgroundColor: '#641e82',
        marginTop: 5,
        marginLeft: 2.5,
        marginRight: 2.5,
        borderRadius: 10,
        justifyContent:"center"

    },
    pagar: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#fff',
        fontWeight: "bold"
    },
    textWhite: {
        color: 'white',
        fontWeight: "bold"
    },
    textGreen: {
        color: '#03fc56',
        fontWeight: "bold"
    }
})
export default ClientBox;