import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, Alert } from 'react-native';
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
class ClientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comprador: "",
            valorCompra: '',
            id: props.navigation.state.params.cliente.id,
            nome: props.navigation.state.params.cliente.nome,
            limiteConta: parseFloat(props.navigation.state.params.cliente.conta.limiteConta),
            saldo: parseFloat(props.navigation.state.params.cliente.conta.saldo),
            totalPagar: parseFloat(props.navigation.state.params.cliente.conta.totalPagar),
            Extrato: []
        }
    }
    componentDidMount() {
        firebase.database().ref('clientes/' + this.state.id + '/conta/compras/').on('value', (response) => {
            this.setState({ Extrato: response.val() })
        })
    }
    render() {
        return (
            <View>
                <View>
                    <Text>nome: {this.state.nome} </Text>
                    <Text>Limite: {this.state.limiteConta}</Text>
                    <Text>Saldo: {this.state.saldo}</Text>
                    <Text>Pagar: {this.state.totalPagar}</Text>
                </View>
                <View>
                    <TextInput style={styles.input}
                        placeholder="Comprador"
                        onChangeText={(comprador) => this.setState({ comprador: comprador })}
                        value={this.state.comprador}
                    />

                    <TextInput keyboardType="numeric" style={styles.input}
                        placeholder="Valor da compra"
                        onChangeText={(valor) => this.setState({ valorCompra: valor })}
                        value={this.state.valorCompra}
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => {

                        var data = new Date().getDate(); //Current Date
                        var month = new Date().getMonth() + 1; //Current Month
                        var year = new Date().getFullYear(); //Current Year
                        var hours = new Date().getHours(); //Current Hours
                        var min = new Date().getMinutes(); //Current Minutes
                        var seconds = new Date().getSeconds();

                        firebase.database().ref('clientes/' + this.state.id + '/conta/compras/').limitToLast(1).on('child_added', (snapshot) => {
                            // all records after the last continue to invoke this function
                            // get the last inserted key

                            idCompra = parseInt(snapshot.key) + 1;

                        }).bind(this);
                        const compra = {
                            comprador: this.state.comprador,
                            dataCompra: data + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + seconds,
                            funcionario: "default",
                            idCompra: idCompra,
                            valorCompra: parseFloat(this.state.valorCompra)
                        }

                        if (compra.valorCompra <= this.state.saldo) {
                            firebase.database().ref('clientes/' + this.state.id + '/conta/compras/' + idCompra).set(
                                compra
                            ).then(() => {
                                var saldoReal = this.state.saldo - compra.valorCompra
                                var totalPagarReal = this.state.limiteConta - saldoReal
                                var totalPagarArrendondado = totalPagarReal.toFixed(2)
                                firebase.database().ref('clientes/' + this.state.id + '/conta/').update(
                                    {
                                        saldo: saldoReal.toFixed(2),
                                        totalPagar: totalPagarArrendondado,
                                    }

                                ).then(() => {
                                    this.setState({ saldo: saldoReal.toFixed(2) })
                                    this.setState({ totalPagar: totalPagarArrendondado })
                                    Alert.alert('Compra concluída com sucesso!')

                                }).catch((error) => {
                                    console.log(error)
                                })
                            }).catch((error) => {
                                console.log(error)
                            })

                        }
                        else {
                            Alert.alert('Saldo insuficiente')
                        }

                    }}>
                        <Text style={{ color: 'white', fontWeight: "bold" }}> Adicionar conta </Text>
                    </TouchableOpacity>
                </View>
                {this.state.Extrato.map((extrato) => {
                    return <View style={styles.extrato}>
                        <Text>{"Comprador: " + extrato.comprador}</Text>
                        <Text>{"Valor " + extrato.valorCompra}</Text>
                        <Text>{"Data: " + extrato.dataCompra}</Text>
                        <Text>Status:Statico</Text>

                    </View>
                })}
            </View>
        );
    }
}
ClientPage.navigationOptions = {
    title: 'Cliente',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};
export default ClientPage;