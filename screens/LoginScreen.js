import React from 'react';
import firebase from 'firebase';
import { Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '35%'
  },
  input: {
    backgroundColor: '#F9F9F9',
    width: 300,
    color: '#707070',
    marginTop: 15,
    borderWidth: 0.1,
    borderColor: "#c4e092",
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
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
    height: 60,
    alignItems: 'center',
    backgroundColor: '#22B573',
    padding: 10,
    justifyContent: "center",
    marginTop: 35,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.22,

    elevation: 3,
  },

});
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'Lucas',
      senha: 'Lucas2019',
      correct: false,
      funcionarios: []
    }
  }
  componentDidMount() {
    firebase.database().ref('funcionario').on('value', (response) => {
      this.setState({ funcionarios: response.val() })
    })
  }
  render() {
    return (
      <View style={styles.container} >
        <Image
          style={{ width: 200, height: 200, marginBottom: 20 }}
          source={require('../assets/logo.png')}
        />
        <TextInput style={styles.input}
          onChangeText={text => this.setState({ login: text })}
          placeholder='Login'
        />
        <TextInput style={styles.input}
          onChangeText={text => this.setState({ senha: text })}
          placeholder='Senha'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn} onPress={() => {

          this.state.funcionarios.map((func) => {
            if (func.login === this.state.login && func.senha === this.state.senha) {
              this.props.navigation.navigate({ routeName: 'Home' })
              this.setState({ correct: true })
              console.log(this.state.correct)
            }
          }
          )
        }

        } >

          <Text style={{ color: 'white', fontWeight: "bold", fontSize: 18 }}> Entrar </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
LoginScreen.navigationOptions = {
  header: null
};

export default LoginScreen;
