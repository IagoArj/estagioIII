import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import firebase from 'firebase';

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
        var pagamentosDoMesValor = 0
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
    }

    render() {
        return (
            <View>
                <Text>Todas as transações do Dia {this.state.comprasDoDia}  </Text>
                <Text>Total de Vendas diaria {this.state.comprasDoDiaValor}</Text>
                <Text>Total de Pagamentos do dia {this.state.pagamentosDoDia}</Text>
                <Text>Total de Pagamentos {this.state.pagamentosDoDiaValor}</Text>
                <Text>Todas as transações do mes {this.state.comprasDoMes}  </Text>
                <Text>Total de Vendas mensal {this.state.comprasDoMesValor}</Text>
                <Text>Total de Pagamentos do mes {this.state.pagamentosDoMes}</Text>
                <Text>Total de Pagamentos mensais{this.state.pagamentosDoMesValor}</Text>
            </View>
        );
    }
}
Relatorios.navigationOptions = {
    title: 'Relatórios',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#641e82',
    }
};
export default Relatorios;