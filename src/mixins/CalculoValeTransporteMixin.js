const CalculoValeTransporteMixin = {
    computed: {
        totalValeTransporte() { //Testar para ver se esta certo
            const porcentagemVT = 6 / 100;
            const VT = this.salarioBruto * porcentagemVT;
            return VT;
        }
    }
};

export default CalculoValeTransporteMixin;