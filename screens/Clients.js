import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import ClientBox from '../components/ClientBox';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh
const Clients = props => {

    state = {
        Clientes: [],
        ClientesTest:[
            {nome:'Carlos', limiteConta: 1200 },{nome:'Lucia',limiteConta: 900},{nome:'Iago', limiteConta: 350},{nome:'Romario',limiteConta: 500},{nome:'Fernando',limiteConta: 500},{nome:'Marlene',limiteConta: 350},{nome:'Jucilei',limiteConta: 100},{nome:'Otacilio',limiteConta: 600},{nome:'Cleyton',limiteConta: 750},{nome:'Roberto' , limiteConta:650},
        ]
    }
    firebase.database().ref('clientes').on('value', (response) => {
            this.state.Clientes = response
            console.log(this.state.Clientes)
    })
    var [nome, onChangeNome] = React.useState('pesquisar');
    return (
        <ScrollView style={styles.clientsBox}>
            <TextInput style={styles.input}
                onChangeText={text => onChangeNome(text)}
                value={nome}
            />
            {this.state.ClientesTest.map((cliente)=>{
                 
                return  <TouchableOpacity style={styles.cliente} onPress={() => {
                    props.navigation.navigate('ClientPage' , {
                        nome: cliente.nome,
                        limite:cliente.limiteConta
                    })
                   
                }}>
                    <ClientBox nome ={cliente.nome} ></ClientBox>
         
                </TouchableOpacity>
            })}
           

        </ScrollView>
    );
}
Clients.navigationOptions = {
    title: 'Clientes',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};
const styles = StyleSheet.create({
    clientsBox: {
        marginLeft: width / 7.3
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
export default Clients;