import React,{useState} from 'react';
import { StyleSheet, Text, View ,Button,TextInput,TouchableOpacity} from 'react-native';
import firebase from 'firebase';


export default function App() {
  var firebaseConfig = {
    apiKey: "AIzaSyCj8ncSYh9SKZOnYNv2kcuNA2CsjYTmenA",
    authDomain: "estagio3-d9c6d.firebaseapp.com",
    databaseURL: "https://estagio3-d9c6d.firebaseio.com",
    projectId: "estagio3-d9c6d",
    storageBucket: "",
    messagingSenderId: "136453378511",
    appId: "1:136453378511:web:f0e9cd9b14ef7125"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


    
  //  firebase.database().ref('clientes/1/compra/compras').update({
  //      vendedor:"carlos",
  //      comprador:null
  //  }
  //  ).then(()=>{
  //    console.log('deu certo');
  //  }).catch((error)=>{
  //    console.log(error);
  //  })
  return (
   
    <View style={styles.container}>
      <View style={styles.iconProfile}/>
     <TextInput style={styles.input}
      placeholder="Login"
      />
       <TextInput  style={styles.input }
      placeholder="Senha"
      />
      <TouchableOpacity style={styles.btn} >
          <Text style={{color: 'white'}}> Logar</Text>
      </TouchableOpacity>
    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a50a3',
    alignItems: 'center',
    paddingTop:'45%'
  },
   input: {
     backgroundColor:'#531a6b',
     width:300,
     marginTop : 15,
     borderWidth:0.1,
     borderColor:"#c4e092",
     paddingHorizontal:30,
     paddingVertical:5,
     borderRadius:30,
     
   } ,
   iconProfile:{
     backgroundColor:"#f5f5f5",

     width:200,
     height:200,
     borderRadius:200,
     marginBottom:15,
   },
   btn:{
    width:200,
    alignItems: 'center',
    backgroundColor: '#b300ff',
    padding: 10,
    marginTop:20,
    borderRadius:30
   }
});
