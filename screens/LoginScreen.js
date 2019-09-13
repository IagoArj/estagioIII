import React from 'react';
import firebase from 'firebase';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';

const LoginScreen = props => {

    navigationOptions = {
    title: 'Login',
    headerStyle: { backgroundColor: 'red' },
    headerTitleStyle: { color: 'green' },
  }
  return (

    <View style={styles.container}>
      <View style={styles.iconProfile} />
      <TextInput style={styles.input}
        placeholder="Login" />
      <TextInput style={styles.input}
        placeholder="Senha"
      />
      <TouchableOpacity style={styles.btn} onPress={() => {
        props.navigation.navigate({ routeName: 'Home' })
      }} >
        <Text style={{ color: 'white' }}> 1 </Text>
      </TouchableOpacity>
    </View>
  );


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a50a3',
    alignItems: 'center',
    paddingTop: '45%'
  },
  input: {
    backgroundColor: '#531a6b',
    width: 300,
    marginTop: 15,
    borderWidth: 0.1,
    borderColor: "#c4e092",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,

  },
  iconProfile: {
    backgroundColor: "#f5f5f5",

    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 15,
  },
  btn: {
    width: 200,
    alignItems: 'center',
    backgroundColor: '#b300ff',
    padding: 10,
    marginTop: 20,
    borderRadius: 30
  },

});
export default LoginScreen;


