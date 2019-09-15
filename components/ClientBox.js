import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const ClientBox = props =>{
    console.log(props)
return(
    <View style={styles.cliente}>
        <Text >{this.props.clientes.carlos.nome}</Text>
    </View>
);
}
const styles = StyleSheet.create({
    cliente:{
        height:50,
        width:200,
        backgroundColor:'blue',
        justifyContent:'center'
    }
})
export default ClientBox;