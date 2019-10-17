import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import MenuBotao from '../components/Menubotao';


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh

this.state = {
    buttons: [
        { rota: 'Clients', titulo: "Clientes" , icon:'id-badge' },
        { rota: 'RegistrarCliente', titulo: "Registrar Cliente", icon:'user-plus' },
        { rota: 'Relatorios', titulo: "Relatórios", icon:'book' },
    ],
    sair: { titulo: 'Sair',icon:'sign-out-alt' }
}
const HomeScreen = props => {

    return (

        <View style={styles.background}>
            <View style={styles.containerMenu}>

                {this.state.buttons.map((button) => {
                    return <TouchableOpacity onPress={() => {
                        props.navigation.navigate({ routeName: button.rota })
                    }}>
                        <MenuBotao titulo={button.titulo} icon={button.icon}></MenuBotao>
                    </TouchableOpacity>
                })}
                <TouchableOpacity onPress={() => {
                    props.navigation.pop()
                }}>
                    <MenuBotao titulo={this.state.sair.titulo} icon={this.state.sair.icon} ></MenuBotao>
                </TouchableOpacity>
            </View>

        </View>

    );
}

HomeScreen.navigationOptions = {
    title: 'Menu',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
        height: height,
        justifyContent: "center",
        alignItems: 'center'
    },
    containerMenu: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        flexWrap: 'wrap'

    },
})
export default HomeScreen;