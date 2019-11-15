import React from 'react';
import firebase from 'firebase';
import { Modal, View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { apisAreAvailable } from 'expo';
import ComprarVender from '../components/ComprarVender';
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
        width: 150,
        alignItems: 'center',
        backgroundColor: '#b300ff',
        padding: 10,
        marginTop: 20,
        marginLeft: 2.5,
        borderRadius: 30
    },
    modal: {
        marginTop: 150,
        backgroundColor: "#FEF8FC",
        width: 350,
        height: 350,
        justifyContent: "center",
        alignItems: "center"
    }, modalCentralizado: {
        justifyContent: "center",
        alignItems: "center"
    },
    btnBox: {
        flexDirection: "row",
        justifyContent: 'center',

    }, bntRow: {
        flexDirection: 'row'
    }, extrato: {
        backgroundColor: '#641e82',
        marginTop: 15,
        width: 300,
        justifyContent: 'space-around'
    }
})
class ClientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comprador: "",
            valorCompra: '',
            valorPagamento: '',
            id: props.navigation.state.params.cliente.id,
            nome: props.navigation.state.params.cliente.nome,
            limiteConta: parseFloat(props.navigation.state.params.cliente.conta.limiteConta),
            saldo: parseFloat(props.navigation.state.params.cliente.conta.saldo),
            totalPagar: parseFloat(props.navigation.state.params.cliente.conta.totalPagar),
            Extrato: [],
            comprarVisible: false,
            pagarVisible: false
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.comprarVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}><View style={styles.modalCentralizado}>
                        <View style={styles.modal}>
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
                                <View style={styles.bntRow}>
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
                                            valorCompra: parseFloat(this.state.valorCompra),
                                            status: 'compra'
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
                                                    this.setState({ compraVisible: false })
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

                                    <TouchableOpacity style={styles.btn} onPress={() => {
                                        this.setState({ comprarVisible: false })
                                    }}>
                                        <Text style={{ color: 'white', fontWeight: "bold" }}> Sair </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.pagarVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.modalCentralizado}>
                        <View style={styles.modal}>
                            <TextInput keyboardType="numeric" style={styles.input}
                                placeholder="Valor Do Pagamento"
                                onChangeText={(valor) => this.setState({ valorPagamento: valor })}
                                value={this.state.valorPagamento}
                            />
                            <View style={styles.bntRow}>
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
                                    const pagamento = {
                                        comprador: this.state.comprador,
                                        dataCompra: data + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + seconds,
                                        funcionario: "default",
                                        idCompra: idCompra,
                                        valorPagamento: parseFloat(this.state.valorPagamento),
                                        status: 'Pagamento'
                                    }
                                    console.log(pagamento.valorPagamento)
                                    console.log(this.state.totalPagar)
                                    if (pagamento.valorPagamento <= this.state.totalPagar) {
                                        firebase.database().ref('clientes/' + this.state.id + '/conta/compras/' + idCompra).set(
                                            pagamento
                                        ).then(() => {
                                            const saldoPagamento = this.state.saldo + pagamento.valorPagamento
                                            const totalPagarReal = this.state.limiteConta - saldoPagamento
                                            const totalPagarArrendondado = totalPagarReal.toFixed(2)
                                            firebase.database().ref('clientes/' + this.state.id + '/conta/').update(
                                                {
                                                    saldo: saldoPagamento.toFixed(2),
                                                    totalPagar: totalPagarArrendondado,
                                                }

                                            ).then(() => {
                                                this.setState({ saldo: saldoPagamento.toFixed(2) })
                                                this.setState({ totalPagar: totalPagarArrendondado })
                                                this.setState({ pagarVisible: false })
                                                this.setState({ valorPagamento: 0 })
                                                Alert.alert('Pagamento concluído com sucesso!')

                                            }).catch((error) => {
                                                console.log(error)
                                            })
                                        }).catch((error) => {
                                            console.log(error)
                                        })

                                    }
                                    else {
                                        Alert.alert('Valor do pagamento é maior que o total a')
                                    }

                                }}>
                                    <Text style={{ color: 'white', fontWeight: "bold" }}> Adicionar conta </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this.setState({ pagarVisible: false })
                                }}>
                                    <Text style={{ color: 'white', fontWeight: "bold" }}> Sair </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View>
                    <Text>nome: {this.state.nome} </Text>
                    <Text>Limite: {this.state.limiteConta}</Text>
                    <Text>Saldo: {this.state.saldo}</Text>
                    <Text>Pagar: {this.state.totalPagar}</Text>
                </View>
                <View style={styles.btnBox}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ comprarVisible: true })
                    }}>
                        <ComprarVender icon="plus" titulo="Comprar" ></ComprarVender>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.setState({ pagarVisible: true })
                    }}>
                        <ComprarVender icon="hand-holding-usd" titulo="Pagar" ></ComprarVender>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {this.state.Extrato.map((extrato) => {
                        console.log(extrato)
                        if (extrato.status == 'pagamento') {
                            console.log("status: " + extrato.status + " valor: " + extrato.valorPagamento)
                            return <View style={styles.extrato}>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>{"Comprador: " + extrato.comprador}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>{"Valor " + extrato.valorPagamento}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>{"Data: " + extrato.dataCompra}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>Status:{extrato.status}</Text>
                            </View>
                        }
                        else {
                            console.log("status: " + extrato.status + " valor: " + extrato.valorCompra)
                            return <View style={styles.extrato}>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>{"Comprador: " + extrato.comprador}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>{"Valor " + extrato.valorCompra}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>{"Data: " + extrato.dataCompra}</Text>
                                <Text style={{ color: 'white', fontWeight: "bold" }}>Status:{extrato.status}</Text>
                            </View>
                        }
                    })}
                </ScrollView>
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