import { createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/Home';
import Clients from '../screens/Clients'
import Relatorios from '../screens/Relatorios'
import RegistrarCliente from '../screens/RegistrarCliente'

const AllNavigator = createStackNavigator({
    Login: LoginScreen,
    Home: HomeScreen,
    Clients: Clients,
    Relatorios:Relatorios, 
    RegistrarCliente: RegistrarCliente
    
});

export default createAppContainer(AllNavigator);