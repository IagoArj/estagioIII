import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const RegistrarCliente = props => {
    state={
        nomeState:nome,
        telefoneState:telefone,
        limiteContaState:limiteConta,
        permissaoState:permissao
    }
    
    var [nome, onChangeNome] = React.useState('Nome');
    var [telefone, onChangeTelefone] = React.useState("Telefone");
    var [limiteConta, onChangeLimiteConta] = React.useState("Limite Da Conta");
    var [permissao, onChangePermissao] = React.useState('Permissão');
    
return(
    <View>
        <TextInput style={styles.input}
        onChangeText={text => onChangeNome(text)}
        value={nome}
        />
        <TextInput style={styles.input}
        onChangeText={text => onChangeTelefone(text)}
        keyboardType ='numeric'
        value={telefone}
        />
        <TextInput style={styles.input}
        onChangeText={text => onChangeLimiteConta(text)}
        value={limiteConta}
        keyboardType ='numeric'
        />
        <TextInput style={styles.input}
        onChangeText={text => onChangePermissao(text)}
        value={permissao}
        />
        <TouchableOpacity style={styles.btn} onPress={() => {
            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes

        firebase.database().ref('clientes/'+ nome).set(
            {
                nome:nome,
                telefone:telefone,
                limiteConta:limiteConta,
                permissao:{

                },
                conta:{
                    valorTotal:0,
                    dataCriação: date + '/' + month + '/' + year + ' ' + hours + ':' +min,
                    dividas:[]
                }
            }
        ).then(()=>{
            console.log('enviado');
        }).catch((error)=>{
            console.log(error)
        })

        }
      } >
        <Text style={{ color: 'white' ,  fontWeight:"bold"}}> criar </Text>
      </TouchableOpacity>
    </View>
)
}
RegistrarCliente.navigationOptions={
    title:'Registrar Cliente',
    headerTintColor: '#fff',
    headerStyle:{
        backgroundColor:'#641e82',
    }
  };
  const styles = StyleSheet.create({
    input:{
        backgroundColor: '#531a6b',
        width: 300,
        marginTop: 15,
        borderWidth: 0.1,
        borderColor: "#c4e092",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30,
    },
    btn: {
        width: 200,
        alignItems: 'center',
        backgroundColor: '#b300ff',
        padding: 10,
        marginTop: 20,
        borderRadius: 30
      },


})
export default RegistrarCliente;