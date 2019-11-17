import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const RegistrarCliente = props => {

    state = {
        nomeState: nome,
        telefoneState: telefone,
        limiteContaState: limiteConta,
    }

    var [nome, onChangeNome] = React.useState('');
    var [telefone, onChangeTelefone] = React.useState("");
    var [limiteConta, onChangeLimiteConta] = React.useState(0);
    var [endereco, onChangeEndereco] = React.useState("")

    return (

        <View style={{alignItems:"center"}}>
            <TextInput style={styles.input}
                onChangeText={text => onChangeNome(text)}
                value={nome}
                placeholder="Nome"
            />
            <TextInput style={styles.input}
                onChangeText={text => onChangeTelefone(text)}
                keyboardType='numeric'
                value={telefone}
                placeholder="Telefone"
            />
            <TextInput style={styles.input}
                onChangeText={text => onChangeLimiteConta(text)}
                value={limiteConta}
                keyboardType='numeric'
                placeholder="Limite"
            />
            <TextInput style={styles.input}
                onChangeText={text => onChangeEndereco(text)}
                value={endereco}
                placeholder="Endereço"
            />
            <TouchableOpacity style={styles.btn} onPress={() => {

                var data = new Date().getDate(); //Current Date
                var month = new Date().getMonth() + 1; //Current Month
                var year = new Date().getFullYear(); //Current Year
                var hours = new Date().getHours(); //Current Hours
                var min = new Date().getMinutes(); //Current Minutes
                var seconds = new Date().getSeconds();
                var idUsuario = 0
                firebase.database().ref('clientes/').limitToLast(1).on('child_added', (snapshot) => {
                    // all records after the last continue to invoke this function
                    // get the last inserted key

                    idUsuario = parseInt(snapshot.key) + 1;
                    console.log(idUsuario)
                }).bind(this);
                const cliente = {
                    id: idUsuario,
                    nome: nome,
                    telefone: telefone,
                    dataConta: data + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + seconds,
                    endereco: endereco,
                    ultimaCompra: '',
                    conta: {
                        limiteConta: limiteConta,
                        totalPagar: 0,
                        saldo: limiteConta,
                        compras: [
                            {
                                comprador: '',
                                dataCompra: '',
                                funcionario: '',
                                idCompra: 1,
                                valorCompra: 0,
                            }
                        ]
                    }
                }
                console.log("usuario: " + idUsuario)
                firebase.database().ref('clientes/' + idUsuario).set(
                    cliente
                ).then(() => {
                    console.log('enviado');
                }).catch((error) => {
                    console.log(error)
                })
                props.navigation.navigate('ClientPage', {
                    cliente
                })
            }
            } >
                <Text style={{ color: 'white', fontWeight: "bold" ,fontSize:18 }}> criar </Text>
            </TouchableOpacity>
        </View>
    )
}
RegistrarCliente.navigationOptions = {
    title: 'Registrar Cliente',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#22B573',
    }
};
const styles = StyleSheet.create({
    input: {
        backgroundColor: '#F9F9F9',
        width: 350,
        height: 40,
        marginTop: 25,
        borderWidth: 0.1,
        borderColor: "#c4e092",
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
    },
    btn: {
        width: 225,
        height:45,
        alignItems: 'center',
        backgroundColor: '#22B573',
        padding: 10,
        marginTop: 20,
        borderRadius: 30
    },


})
export default RegistrarCliente;