import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import ClientBox from '../components/ClientBox';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh

const styles = StyleSheet.create({
    inputBox: {
        marginLeft:30
    },
    clientBox: {
        flexDirection: "column",
        width:375,
    },
    input: {
        backgroundColor: '#fff',
        width: 350,
        height: 50,
        marginTop: 15,
        borderWidth: 0.1,
        borderColor: "#c4e092",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    cliente:{
        marginLeft:40
    }
})


class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Clientes: [],
        }
    }
    componentDidMount() {
        firebase.database().ref('clientes').on('value', (response) => {
            this.setState({ Clientes: response.val() })
        })
    }

    render() {


        //var [nome, onChangeNome] = React.useState('pesquisar');
        return (
            <ScrollView>
                <View style={styles.inputBox}>
                    <TextInput style={styles.input}
                        placeholder="Procurar..."
                        onChangeText={text => onChangeNome(text)}
                    />
                </View>
                <View style={styles.clientBox}>
                    {this.state.Clientes.map((cliente) => {
                        return <TouchableOpacity style={styles.cliente} onPress={() =>
                            this.props.navigation.navigate('ClientPage', {
                                cliente: cliente


                            })

                        }>
                            <ClientBox id={cliente.id} nome={cliente.nome} totalPagar={cliente.conta.totalPagar}></ClientBox>

                        </TouchableOpacity>
                    })}
                </View>


            </ScrollView>
        );

    }



}
Clients.navigationOptions = {
    title: 'Clientes',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#22B573',
    }
};
export default Clients;