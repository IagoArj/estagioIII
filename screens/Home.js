import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import ClientMenu from '../components/ClientMenu';
import RegisterClient from '../components/RegisterClient';
import Relatorio from '../components/Relatorio';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full heigh

const HomeScreen = props => {

    return (
        <ScrollView>
            <View style={styles.background}>
                <View style={styles.containerMenu}>

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        props.navigation.navigate({ routeName: 'Clients' })
                    }}>
                        <ClientMenu ></ClientMenu>

                    </TouchableOpacity>

                    <RegisterClient></RegisterClient>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        props.navigation.navigate({ routeName: 'Relatorios' })
                    }}>
                        <Relatorio></Relatorio>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#8a50a3',
        height: height
    },
    containerMenu: {
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default HomeScreen;