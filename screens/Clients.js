import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import ClientBox from '../components/ClientBox';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh

const styles = StyleSheet.create({
    inputBox: {
        marginLeft: width / 7.3,
    },
    clientBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#531a6b',
        width: 300,
        height: 50,
        marginTop: 15,
        borderWidth: 0.1,
        borderColor: "#c4e092",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30,
        marginBottom: 40
    },
})


class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clientes: [],
            ClientesTest: [
                {
                    id: 1,
                    nome: 'Carlos alberto lima de araujo',
                    telefone: '85988159600',
                    dataConta: '07/08/2019',
                    endereco: 'rua juvencio barroso 818',
                    autCompra: ['Emerson Iago Beserra De Araujo', 'Maria Lúcia Beserra De Araujo'],
                    ultimaCompra: '16/10/2019',
                    conta: {
                        limiteConta: 2000,
                        totalPagar: 130,
                        saldo: 2000,
                        compras: [
                            {
                                idCompra: 1,
                                valorCompra: 150.35,
                                comprador: 'Carlos Alberto',
                                funcionario: 'luzia',
                                dataCompra: '14/10/2019 15:26:42'
                            },
                            {
                                idCompra: 2,
                                valorCompra: 31.15,
                                comprador: 'Emerson Iago Beserra De Araujo',
                                funcionario: 'Átila',
                                dataCompra: '16/10/2019 11:21:12'
                            }
                        ]
                    },
                }, {
                    id: 2,
                    nome: 'Emerson Iago Beserra De Araujo',
                    telefone: '85988159600',
                    dataConta: '07/08/2019',
                    endereco: 'rua juvencio barroso 818',
                    autCompra: ['Emerson Iago Beserra De Araujo', 'Maria Lúcia Beserra De Araujo'],
                    ultimaCompra: '16/10/2019',
                    conta: {
                        limiteConta: 2000,
                        totalPagar: 0,
                        saldo: 2000,
                        compras: [
                            {
                                idCompra: 1,
                                valorCompra: 150.35,
                                comprador: 'Carlos Alberto',
                                funcionario: 'luzia',
                                dataCompra: '14/10/2019 15:26:42'
                            },
                            {
                                idCompra: 2,
                                valorCompra: 31.15,
                                comprador: 'Emerson Iago Beserra De Araujo',
                                funcionario: 'Átila',
                                dataCompra: '16/10/2019 11:21:12'
                            }
                        ]
                    },
                }, {
                    id: 3,
                    nome: 'Maria Lúcia Beserra De Araujo',
                    telefone: '85988159600',
                    dataConta: '07/08/2019',
                    endereco: 'rua juvencio barroso 818',
                    autCompra: ['Emerson Iago Beserra De Araujo', 'Maria Lúcia Beserra De Araujo'],
                    ultimaCompra: '16/10/2019',
                    conta: {
                        limiteConta: 2000,
                        totalPagar: 0,
                        saldo: 2000,
                        compras: [
                            {
                                idCompra: 1,
                                valorCompra: 150.35,
                                comprador: 'Carlos Alberto',
                                funcionario: 'luzia',
                                dataCompra: '14/10/2019 15:26:42'
                            },
                            {
                                idCompra: 2,
                                valorCompra: 31.15,
                                comprador: 'Emerson Iago Beserra De Araujo',
                                funcionario: 'Átila',
                                dataCompra: '16/10/2019 11:21:12'
                            }
                        ]
                    },
                },

            ]
        }
    }
    componentDidMount() {
        firebase.database().ref('clientes').on('value', (response) => {
            this.setState({ Clientes: response.toJSON() })
        })
    }

    render() {


        //var [nome, onChangeNome] = React.useState('pesquisar');
        return (
            <ScrollView >
                <View style={styles.inputBox}>
                    <TextInput style={styles.input}
                        onChangeText={text => onChangeNome(text)}

                    //value={nome}
                    />
                </View>
                <View style={styles.clientBox}>
                    {this.state.ClientesTest.map((cliente) => {
                        return <TouchableOpacity style={styles.cliente} onPress={() =>
                            this.props.navigation.navigate('ClientPage', {
                                cliente:cliente


                            })

                        }>
                            <ClientBox nome={cliente.nome} totalPagar={cliente.conta["totalPagar"]}></ClientBox>

                        </TouchableOpacity>
                    })}
                </View>


            </ScrollView>
        );

    }



}
Clients.navigationOptions = {
    header: null
};
export default Clients;