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
            <ScrollView >
                <View style={styles.inputBox}>
                    <TextInput style={styles.input}
                        onChangeText={text => onChangeNome(text)}

                    //value={nome}
                    />
                </View>
                <View style={styles.clientBox}>
                    {this.state.Clientes.map((cliente) => {
                        return <TouchableOpacity style={styles.cliente} onPress={() =>
                            this.props.navigation.navigate('ClientPage', {
                                cliente:cliente


                            })

                        }>
                            <ClientBox id ={cliente.id} nome={cliente.nome} totalPagar={cliente.conta.totalPagar}></ClientBox>

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