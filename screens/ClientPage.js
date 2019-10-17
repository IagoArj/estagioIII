import React from 'react';

import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const ClientPage = props => {

    const nome = props.navigation.state.params.cliente.nome
    const limiteConta = props.navigation.state.params.cliente.conta.limiteConta
    const saldo = props.navigation.state.params.cliente.conta.saldo
    const totalPagar = props.navigation.state.params.cliente.conta.totalPagar

    return (

        <View>
            <Text>nome: {nome} </Text>
            <Text>Limite: {limiteConta}</Text>
            <Text>Saldo: {saldo}</Text>
            <Text>Pagar: {totalPagar}</Text>
            <Text></Text>
        </View>
    );
}
ClientPage.navigationOptions = {
    title: 'Cliente',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};
const styles = StyleSheet.create({
    cliente: {
        height: 50,
        width: 300,
        backgroundColor: '#641e82',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 10
    }
})
export default ClientPage;
