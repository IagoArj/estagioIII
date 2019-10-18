import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/Home';
import Clients from '../screens/Clients'
import Relatorios from '../screens/Relatorios'
import RegistrarCliente from '../screens/RegistrarCliente'
import ClientPage from '../screens/ClientPage';

const AllNavigator = createStackNavigator({
    Login: LoginScreen,
    Home: HomeScreen,
    Relatorios: Relatorios,
    RegistrarCliente: RegistrarCliente,
    Clients: Clients,
    ClientPage: ClientPage,




});

export default createAppContainer(AllNavigator);