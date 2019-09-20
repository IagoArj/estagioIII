import React from 'react';

import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const ClientPage = props =>{
    
    const nome = props.navigation.getParam('nome');
    const limite = props.navigation.getParam('limite');
    return(
    
    <View>
        <Text>nome: {nome} </Text>
        <Text>Limite: {limite}</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
    </View>
);
}
ClientPage.navigationOptions = {
    title: 'Cliente',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};
const styles = StyleSheet.create({
    cliente:{
        height:50,
        width:300,
        backgroundColor:'#641e82',
        justifyContent:'center',
        marginTop:15,
        borderRadius:10
    }
})
export default ClientPage;
