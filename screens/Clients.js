import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import ClientBox from '../components/ClientBox';


const Clients = props => {

    state = {
        Clientes: []
    }

    {
        firebase.database().ref('clientes').on('value', (response) => {
            this.state.Clientes = response.toJSON()
            console.log(state.Clientes)
        })
    }
    return (
        <View>
            <ClientBox></ClientBox>
        </View>
    );
}
Clients.navigationOptions = {
    title: 'Clientes',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};
export default Clients;