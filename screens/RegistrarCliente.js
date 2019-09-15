import React from 'react';
import firebase from 'firebase';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const RegistrarCliente = props => {
    state={
        nomeState:nome,
        emailState:email
    }


    var [nome, onChangeNome] = React.useState('nome');
    var [email, onChangeEmail] = React.useState("email");
    
return(
    <View>
        <TextInput style={styles.input}
        onChangeText={text => onChangeNome(text)}
        value={nome}
        />
        <TextInput style={styles.input}
        onChangeText={text => onChangeEmail(text)}
        keyboardType ='numeric'
        value={email}
        />
        <TouchableOpacity style={styles.btn} onPress={() => {
        firebase.database().ref('clientes/'+ nome).set(
            {
                nome:nome,
                email:email
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