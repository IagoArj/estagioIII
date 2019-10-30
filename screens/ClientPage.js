import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, Alert } from 'react-native';

const ClientPage = props => {
    const id = props.navigation.state.params.cliente.id
    const nome = props.navigation.state.params.cliente.nome
    const limiteConta = parseInt(props.navigation.state.params.cliente.conta.limiteConta)
    const saldo = parseInt(props.navigation.state.params.cliente.conta.saldo)
    const totalPagar = parseInt(props.navigation.state.params.cliente.conta.totalPagar)

    var [comprador, onChangeComprador] = React.useState('Comprador');
    var [valorDaCompra, onChangeValorDaCompra] = React.useState(0);
    return (
        <View>
            <View>
                <Text>nome: {nome} </Text>
                <Text>Limite: {limiteConta}</Text>
                <Text>Saldo: {saldo}</Text>
                <Text>Pagar: {totalPagar}</Text>
            </View>
            <View>
                <TextInput style={styles.input}
                    onChangeText={text => onChangeComprador(text)}
                    value={comprador}
                />
                <TextInput keyboardType="numeric" style={styles.input}
                    onChangeText={text => onChangeValorDaCompra(text)}
                    value={valorDaCompra}
                />
                <TouchableOpacity style={styles.btn} onPress={() => {

                    var data = new Date().getDate(); //Current Date
                    var month = new Date().getMonth() + 1; //Current Month
                    var year = new Date().getFullYear(); //Current Year
                    var hours = new Date().getHours(); //Current Hours
                    var min = new Date().getMinutes(); //Current Minutes
                    var seconds = new Date().getSeconds();

                    firebase.database().ref('clientes/' + id + '/conta/compras/').limitToLast(1).on('child_added', (snapshot) => {
                        // all records after the last continue to invoke this function
                        // get the last inserted key

                        idCompra = parseInt(snapshot.key) + 1;
                       
                    }).bind(this);
                    const compra = {
                        comprador: comprador,
                        dataCompra: data + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + seconds,
                        funcionario: "default",
                        idCompra: idCompra,
                        valorCompra: valorDaCompra
                    }
                    if (compra.valorCompra <= saldo) {
                        firebase.database().ref('clientes/' + id + '/conta/compras/' + idCompra).set(
                            compra
                        ).then(() => {
                           var saldoReal = saldo - compra.valorCompra
                            firebase.database().ref('clientes/' + id + '/conta/').update(
                                {saldo :saldoReal,
                                totalPagar:limiteConta-saldoReal,
                                }
                            ).then(() => {
                                console.log(compra.valorCompra);
                            }).catch((error) => {
                                console.log(error)
                            })
                        }).catch((error) => {
                            console.log(error)
                        })

                    }
                    else{
                        Alert.alert('Saldo insuficiente')
                    }

                }}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}> Adicionar conta </Text>
                </TouchableOpacity>
            </View>
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
    }, input: {
        backgroundColor: '#531a6b',
        width: 300,
        marginTop: 15,
        borderWidth: 0.1,
        borderColor: "#c4e092",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30,
    }, btn: {
        width: 200,
        alignItems: 'center',
        backgroundColor: '#b300ff',
        padding: 10,
        marginTop: 20,
        borderRadius: 30
    },

})
export default ClientPage;
