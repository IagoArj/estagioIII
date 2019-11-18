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
        backgroundColor: '#F9F9F9',
        width: 300,
        height: 40,
        marginTop: 15,
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }, btnGreen: {
        width: 250,
        alignItems: 'center',
        backgroundColor: '#22B573',
        padding: 10,
        marginTop: 22,
        marginLeft: 2.5,
        borderRadius: 30,
    },
    btnRed: {
        width: 250,
        alignItems: 'center',
        backgroundColor: '#E43E6B',
        padding: 10,
        marginTop: 22,
        marginLeft: 2.5,
        borderRadius: 30
    },
    modal: {
        marginTop: 150,
        backgroundColor: "#fff",
        width: 350,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }, modalCentralizado: {
        justifyContent: "center",
        alignItems: "center"
    },
    btnBox: {
        flexDirection: "row",
        justifyContent: 'center',

    }, bntRow: {
        alignItems: "center",
        flexDirection: "column"
    }, extrato: {
        backgroundColor: '#F9F9F9',
        marginTop: 15,
        width: 350,
        marginLeft: 30
    }, infoCard: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#F9F9F9',
        width: 350,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    saldoInfo: {
        justifyContent: "space-around",
        flexDirection: "row",
        marginBottom: 15,
        marginTop: 15
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
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, color: '#707070' }}>Compra</Text>
                                <TextInput keyboardType="numeric" style={styles.input}
                                    placeholder="Valor"
                                    onChangeText={(valor) => this.setState({ valorCompra: valor })}
                                    value={this.state.valorCompra}
                                />
                                <View style={styles.bntRow}>
                                    <TouchableOpacity style={styles.btnGreen} onPress={() => {

                                        var data = new Date().getDate(); //Current Date
                                        var month = new Date().getMonth() + 1; //Current Month
                                        var year = new Date().getFullYear(); //Current Year
                                        var hours = new Date().getHours(); //Current Hours
                                        var min = new Date().getMinutes(); //Current Minutes
                                        var seconds = new Date().getSeconds();

                                        firebase.database().ref('relatorios/diario/compra').limitToLast(1).on('child_added', (snapshot) => {
                                            // all records after the last continue to invoke this function
                                            // get the last inserted key

                                            idRelatorioCompra = parseInt(snapshot.key) + 1;
                                            console.log(idRelatorioCompra)
                                        }).bind(this);

                                        firebase.database().ref('clientes/' + this.state.id + '/conta/compras/').limitToLast(1).on('child_added', (snapshot) => {
                                            // all records after the last continue to invoke this function
                                            // get the last inserted key

                                            idCompra = parseInt(snapshot.key) + 1;

                                        }).bind(this);

                                        const compra = {
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
                                                    this.setState({ comprarVisible: false })
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
                                        <Text style={{ color: 'white', fontWeight: "bold" }}> Adicionar </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.btnRed} onPress={() => {
                                        this.setState({ comprarVisible: false })
                                    }}>
                                        <Text style={{ color: 'white', fontWeight: "bold" }}> Cancelar </Text>
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
                            <Text style={{ fontSize: 22, color: '#707070' }}>Pagamento</Text>
                            <TextInput keyboardType="numeric" style={styles.input}
                                placeholder="Valor Do Pagamento"
                                onChangeText={(valor) => this.setState({ valorPagamento: valor })}
                                value={this.state.valorPagamento}
                            />
                            <View style={styles.bntRow}>
                                <TouchableOpacity style={styles.btnGreen} onPress={() => {

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
                                    if (pagamento.valorPagamento <= this.state.totalPagar && pagamento.valorPagamento > 0) {
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
                                        Alert.alert('Não foi possivel concluir')
                                    }

                                }}>
                                    <Text style={{ color: 'white', fontWeight: "bold" }}> Adicionar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnRed} onPress={() => {
                                    this.setState({ pagarVisible: false })
                                }}>
                                    <Text style={{ color: 'white', fontWeight: "bold" }}> Cancelar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <ScrollView>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.infoCard}>
                            <Text style={{ color: '#707070', fontSize: 18, marginBottom: 10, marginTop: 15 }}>{this.state.nome} </Text>
                            <Text style={{ color: '#707070', fontWeight: 'bold', fontSize: 12 }}>Limite: R$ {this.state.limiteConta}</Text>
                            <View style={styles.saldoInfo}>
                                <Text style={{ marginRight: 15, color: '#45AE50', fontWeight: 'bold', fontSize: 12 }}>Saldo: R$ {this.state.saldo}</Text>
                                <Text style={{ color: '#DE3A3A', fontWeight: 'bold', fontSize: 12 }}>Pagar: R$ {this.state.totalPagar}</Text>
                            </View>
                        </View>
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

                    {this.state.Extrato.map((extrato) => {
                        console.log(extrato.status)
                        if (extrato.status == 'Pagamento') {

                            return <View style={styles.extrato}>
                                <View style={{ justifyContent: "space-between", flexDirection: 'row', margin: 15 }}>
                                    <Text style={{ color: '#22B573', fontWeight: "bold", fontSize: 18 }}>{"R$ " + extrato.valorPagamento}</Text>
                                    <Text style={{ color: '#22B573', fontWeight: "bold" }}>Pagamento</Text>
                                </View>
                                <Text style={{ color: '#707070', fontWeight: "bold", marginLeft: 15, marginBottom: 15 }}>{"Data: " + extrato.dataCompra}</Text>
                            </View>
                        }
                        else {
                            return <View style={styles.extrato}>
                                <View style={{ justifyContent: "space-between", flexDirection: 'row', margin: 15 }}>
                                    <Text style={{ color: '#22B573', fontWeight: "bold", fontSize: 18 }}>{"R$ " + extrato.valorCompra}</Text>
                                    <Text style={{ color: '#707070', fontWeight: "bold" }}>Compra</Text>
                                </View>
                                <Text style={{ color: '#707070', fontWeight: "bold", marginLeft: 15, marginBottom: 15 }}>{extrato.dataCompra}</Text>
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
        backgroundColor: '#22B573',
    }
};
export default ClientPage;