import { createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/Home';
import Clients from '../screens/Clients'
import Relatorios from '../screens/Relatorios'
import RegistrarCliente from '../screens/RegistrarCliente'
import ClientPage from '../screens/ClientPage';

const AllNavigator = createStackNavigator({
    Clients: Clients,
    Home: HomeScreen,
    
    RegistrarCliente: RegistrarCliente,
    Login: LoginScreen,
    ClientPage:ClientPage, 
    Relatorios:Relatorios, 
    
    
    
});

export default createAppContainer(AllNavigator);