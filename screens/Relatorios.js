import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import firebase from 'firebase';
const styles = StyleSheet.create({
    hearderDay:{
        color:"#707070",
        fontSize:22,
        fontWeight: '800',
        marginLeft:25,
        marginTop:15
    },
    comprasTotal:{
        color:"#707070",
        fontSize:24,
        fontWeight: 'bold',
        marginLeft:45,
        marginTop:10
    },
    valor:{
        color:"#707070",
        fontSize:20,
        fontWeight: 'bold',
        marginLeft:45,
        marginTop:10
    }
})
class Relatorios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            contas: [],
            comprasDoDia: 0,
            comprasDoDiaValor: 0,
            pagamentosDoDia: 0,
            pagamentosDoDiaValor: 0,
        }
    }
    componentDidMount() {
        firebase.database().ref('clientes/').on('value', (response) => {
            this.setState({ clientes: response.val() }, () => {
                this.runRelatorios();
            })
        })
    }

    runRelatorios = () => {
        var comprasDoDia = 0;
        var comprasDoDiaValor = 0;
        var pagamentosDoDia = 0;
        var pagamentosDoDiaValor = 0
        var comprasDoMes = 0;
        var comprasDoMesValor = 0;
        var pagamentosDoMes = 0;
        var pagamentosDoMesValor = 0;
        var comprasDoAno = 0;
        var comprasDoAnoValor = 0;
        var pagamentosDoAno = 0;
        var pagamentosDoAnoValor = 0;

        this.state.clientes.map((cli) => {
            cli.conta.compras.map((compra) => {
                var hoje = new Date();
                var compraData = compra.dataCompra.split(" ");
                var data = compraData[0].split("/");

                console.log('---------------------hoje')
                console.log(hoje.getDate().toString())
                console.log((hoje.getMonth() + 1).toString())
                console.log(hoje.getFullYear().toString())

                console.log('---------------------data da compra')
                console.log(data[0])
                console.log(data[1])
                console.log(data[2])
                if (hoje.getDate().toString() == data[0] && (hoje.getMonth() + 1).toString() == data[1] && hoje.getFullYear().toString() == data[2]) {
                    if (compra.status == 'compra') {
                        console.log('******************entrou***************88')
                        comprasDoDia += 1;
                        comprasDoDiaValor = comprasDoDiaValor + compra.valorCompra
                    }
                    if (compra.status == 'Pagamento') {
                        pagamentosDoDia += 1;
                        pagamentosDoDiaValor = pagamentosDoDiaValor + compra.valorPagamento
                    }
                }
                if ((hoje.getMonth() + 1).toString() == data[1] && hoje.getFullYear().toString() == data[2]) {
                    if (compra.status == 'compra') {

                        comprasDoMes += 1;
                        comprasDoMesValor = comprasDoMesValor + compra.valorCompra
                    }
                    if (compra.status == 'Pagamento') {
                        pagamentosDoMes += 1;
                        pagamentosDoMesValor = pagamentosDoMesValor + compra.valorPagamento
                    }
                }
                if (hoje.getFullYear().toString() == data[2]) {
                    if (compra.status == 'compra') {

                        comprasDoAno += 1;
                        comprasDoAnoValor = comprasDoAnoValor + compra.valorCompra
                    }
                    if (compra.status == 'Pagamento') {
                        pagamentosDoAno += 1;
                        pagamentosDoAnoValor = pagamentosDoAnoValor + compra.valorPagamento
                    }
                }

            })
        })
        this.setState({ comprasDoDia: comprasDoDia })
        this.setState({ comprasDoDiaValor: comprasDoDiaValor.toFixed(2) })
        this.setState({ pagamentosDoDia: pagamentosDoDia })
        this.setState({ pagamentosDoDiaValor: pagamentosDoDiaValor.toFixed(2) })
        this.setState({ comprasDoMes: comprasDoMes })
        this.setState({ comprasDoMesValor: comprasDoMesValor.toFixed(2) })
        this.setState({ pagamentosDoMes: pagamentosDoMes })
        this.setState({ pagamentosDoMesValor: pagamentosDoMesValor.toFixed(2) })
        this.setState({ comprasDoAno: comprasDoAno })
        this.setState({ comprasDoAnoValor: comprasDoAnoValor.toFixed(2) })
        this.setState({ pagamentosDoAno: pagamentosDoAno })
        this.setState({ pagamentosDoAnoValor: pagamentosDoAnoValor.toFixed(2) })
    }

    render() {
        return (
            <View>
                <View>
                    <Text style={styles.hearderDay}>Diário</Text>
                    <Text style={styles.comprasTotal}>{this.state.comprasDoDia} Compras </Text>
                    <Text style={styles.comprasTotal}>{this.state.pagamentosDoDia} Pagamentos </Text>
                    <Text style={styles.valor}>Vendas: R$ {this.state.comprasDoDiaValor}</Text>
                    <Text style={styles.valor}>Pago: R$ {this.state.pagamentosDoDiaValor}</Text>
                </View>
                <View>
                    <Text style={styles.hearderDay}>Mensal</Text>
                    <Text style={styles.comprasTotal}>{this.state.comprasDoMes} Compras </Text>
                    <Text style={styles.comprasTotal}>{this.state.pagamentosDoMes} Pagamentos</Text>
                    <Text style={styles.valor}>Vendas: R$ {this.state.comprasDoMesValor}</Text>        
                    <Text style={styles.valor}>Pago: R$ {this.state.pagamentosDoMesValor}</Text>
                </View>
                <View>
                    <Text style={styles.hearderDay}>Anual</Text>
                    <Text style={styles.comprasTotal}>{this.state.comprasDoAno} Compras </Text>
                    <Text style={styles.comprasTotal}>{this.state.pagamentosDoAno} Pagamentos</Text>
                    <Text style={styles.valor}>Vendas: R$ {this.state.comprasDoAnoValor}</Text> 
                    <Text style={styles.valor}>Pago: R$ {this.state.pagamentosDoAnoValor}</Text>
                </View>
            </View>
        );
    }
}
Relatorios.navigationOptions = {
    title: 'Relatórios',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#22B573',
    }
};
export default Relatorios;