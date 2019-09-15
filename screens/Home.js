import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import MenuBotao from '../components/Menubotao';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh

this.state = {
    buttons: [
        { rota: 'Clients', titulo: "Clientes" },
        { rota: 'RegistrarCliente', titulo: "Registrar Cliente" },
        { rota: 'Relatorios', titulo: "Relatórios" }
    ]
}
const HomeScreen = props => {

    return (
        <ScrollView>
            <View style={styles.background}>
                <View style={styles.containerMenu}>

                    {this.state.buttons.map((button) => {
                        return <TouchableOpacity onPress={() => {
                            props.navigation.navigate({ routeName: button.rota })
                        }}>
                            <MenuBotao titulo={button.titulo}></MenuBotao>
                        </TouchableOpacity>
                    })}
                </View>

            </View>
        </ScrollView>
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
        height: height
    },
    containerMenu: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    },
})
export default HomeScreen;