<template>
  <div class="container">
    <h1 class="text-left">Cálculos referêntes a CLT</h1>
    <div
      class="text-left pb-2"
      style="margin-top:6px;font-weight:500;font-size:14px;color: #b5b5c3!important;"
    >
      De um modo análogo à CLT, propomos que seu salário bruto seja dividido em
      “provisões” para todos os benefícios trabalhistas. Algumas empresas
      oferecem 13º e férias aos funcionários PJ; em todo caso, calculemos sobre
      o montante pago por ano.
    </div>
    <div class="grid">
      <div class="card">
        <div class="form__control">
          <label for="salarioBruto">Salário Bruto</label>
          <input
            type="tel"
            name="salarioBruto"
            v-model.lazy="salarioBruto"
            v-money="money"
          />
        </div>

        <div class="form__control">
          <h2 class="text-left">INSS</h2>
          <div class="description text-left">
            O INSS , ou Contribuição para Previdência Social, é um valor que
            você paga sempre que recebe salário. Esse valor vai para o INSS
            (Instituto Nacional do Seguro Social) para que ele possa pagar
            benefícios como seguro desemprego e aposentadoria.
          </div>
          <input
            type="tel"
            name="inss"
            v-money="money"
            :value="Math.ceil(inss * 100)"
            disabled
          />
        </div>

        <div class="form__control">
          <h2 class="text-left">IRPF</h2>
          <div class="description text-left">
            Blablabla
          </div>
          <input
            type="tel"
            name="irpf"
            v-money="money"
            :value="Math.ceil(irpf * 100)"
            disabled
          />
        </div>

        <div class="form__control">
          <h2 class="text-left">Total de descontos</h2>
          <div class="description text-left">
            O total de descontos no seu salário será de:
          </div>
          <input
            type="tel"
            name="totalGastos"
            v-money="money"
            :value="Math.ceil(totalGastos * 100)"
            disabled
          />
        </div>
      </div>

      <div class="card">
        <div>
          <h3 class="text-left">
            A tabela com as faixas de INSS vigentes a partir de 1 de janeiro de
            2021 é a seguinte:
          </h3>

          <table class="pb-2">
            <tr class="border-bottom">
              <th>Faixa Salarial</th>
              <th>Alíquota</th>
            </tr>
            <tr
              v-for="aliquota in aliquotas"
              :key="aliquota.id"
              :id="aliquota.id"
              :class="{ 'row--selected': aliquota.id === valorDaAliquota.id }"
            >
              <td class="text-left">{{ aliquota.text }}</td>
              <td v-if="!aliquota.isFixed">{{ aliquota.percentage }}%</td>
              <td v-else>R$ {{ aliquota.percentage }}</td>
            </tr>
          </table>
        </div>

        <div>
          <h3 class="text-left">
            Em teoria, a tabela do IRRF deveria ser atualizada conforme a
            inflação e economia do país. Contudo, ela não sofre nenhuma mudança
            desde 2015, devendo as empresas se guiarem por essa mesma tabela em
            2021.
          </h3>

          <table class="pb-2">
            <tr class="border-bottom">
              <th>Faixa Salarial</th>
              <th>Alíquota</th>
            </tr>
            <tr
              v-for="aliquota in aliquotasIRPF"
              :key="aliquota.id"
              :id="aliquota.id"
              :class="{ 'row--selected': aliquota.id === valorDaAliquota.id }"
            >
              <td class="text-left">{{ aliquota.text }}</td>
              <td v-if="!aliquota.isFixed">{{ aliquota.percentage }}%</td>
              <td v-else>R$ {{ aliquota.percentage }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { convertMoneyMaskToNumber } from "@/utils/utils.js";
import { VMoney } from "v-money";
import Chartist from "chartist";
require("chartist-plugin-legend");

export default {
  data() {
    return {
      chart: null,
      salarioBruto: 0,
      receitaBrutaAnual: 0,
      aliquotas: [],
      aliquotasIRPF: [],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
      },
    };
  },
  mounted() {
    this.getTabelaAliquotas();
    this.getTabelaIRPF();
  },
  watch: {
    receitaBrutaAnual() {
      const data = {
        series: this.chartSerie,
      };
      const receitaBrutaAnual = convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      if (receitaBrutaAnual === 0) {
      }
      this.updateChart(data);
    },
  },
  methods: {
    async getTabelaAliquotas() {
      await axios.get("/tabela-aliquota-inss-2021.json").then((response) => {
        this.aliquotas = response.data.aliquotas;
      });
    },
    async getTabelaIRPF() {
      await axios
        .get("/tabela-aliquota-irpf-clt-2021.json")
        .then((response) => {
          this.aliquotasIRPF = response.data.aliquotasIRPF;
        });
    },
    convert2Real(valor) {
      return valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
    track() {
      this.$ga.page("/clt");
    },
  },
  directives: { money: VMoney },
  computed: {
    inss() {
      const salarioBruto = convertMoneyMaskToNumber(this.salarioBruto);
      let aliq1 = 0;
      let aliq2 = 0;
      let aliq3 = 0;
      let aliq4 = 0;
      let aliq5 = 0;
      let aliqTotal = 0;

      // Fonte: https://www.idinheiro.com.br/calculadoras/calculadora-inss/

      if (this.valorDaAliquota.id >= 1) {
        if (salarioBruto > this.aliquotas[0].end) {
          aliq1 =
            (this.aliquotas[0].end - this.aliquotas[0].start) *
            (this.aliquotas[0].percentage / 100);
        } else {
          aliq1 = salarioBruto * (this.aliquotas[0].percentage / 100);
        }
      }

      if (this.valorDaAliquota.id >= 2) {
        if (salarioBruto > this.aliquotas[1].end) {
          aliq2 =
            (this.aliquotas[1].end - this.aliquotas[1].start) *
            (this.aliquotas[1].percentage / 100);
        } else {
          aliq2 =
            (salarioBruto - this.aliquotas[0].end) *
            (this.aliquotas[1].percentage / 100);
        }
      }

      if (this.valorDaAliquota.id >= 3) {
        if (salarioBruto > this.aliquotas[2].end) {
          aliq3 =
            (this.aliquotas[2].end - this.aliquotas[2].start) *
            (this.aliquotas[2].percentage / 100);
        } else {
          aliq3 =
            (salarioBruto - this.aliquotas[1].end) *
            (this.aliquotas[2].percentage / 100);
        }
      }

      if (this.valorDaAliquota.id >= 4) {
        if (salarioBruto > this.aliquotas[3].end) {
          aliq4 =
            (this.aliquotas[3].end - this.aliquotas[3].start) *
            (this.aliquotas[3].percentage / 100);
        } else {
          aliq4 =
            (salarioBruto - this.aliquotas[2].end) *
            (this.aliquotas[3].percentage / 100);
        }
      }

      if (this.valorDaAliquota.id >= 5) {
        if (salarioBruto > this.aliquotas[4].end) {
          aliq5 =
            (this.aliquotas[4].end - this.aliquotas[4].start) *
            (this.aliquotas[4].percentage / 100);
        } else {
          aliqTotal = 751.99;
          return aliqTotal;
        }
      }

      aliqTotal = aliq1 + aliq2 + aliq3 + aliq4 + aliq5;

      return aliqTotal;
    },
    valorDaAliquota() {
      let faixaAliquota = {};
      const salarioBruto = convertMoneyMaskToNumber(this.salarioBruto);

      for (const iterator of this.aliquotas) {
        if (salarioBruto >= iterator.start && salarioBruto <= iterator.end) {
          faixaAliquota = iterator;
        }
      }

      return faixaAliquota;
    },
    irpfTax() {
      let faixaAliquota = {};
      const salarioBruto = convertMoneyMaskToNumber(this.salarioBruto);

      for (const iterator of this.aliquotas) {
        if (salarioBruto >= iterator.start && salarioBruto <= iterator.end) {
          faixaAliquota = iterator;
        }
      }

      return faixaAliquota;
    },
    irpf() {
      return 1000;
      //   const receitaBrutaAnual = convertMoneyMaskToNumber(
      //     this.receitaBrutaAnual
      //   );
      //   const receitaMensal = receitaBrutaAnual / 12;
      //   const umTercoDoSalario = receitaMensal / 3;
      //   const ferias = umTercoDoSalario / 12;
      //   return ferias;
    },
    fgts() {
      const receitaBrutaAnual = convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      const receitaMensal = receitaBrutaAnual / 12;
      const fgts = receitaMensal * 0.08;
      return fgts;
    },
    totalGastos() {
      return this.decimoTerceiro + this.ferias + this.fgts;
    },
    chartSerie() {
      const annualIncome = convertMoneyMaskToNumber(this.receitaBrutaAnual);
      if (annualIncome >= 0) {
        const annualSpends = this.totalGastos * 12;
        const annualIncomeRest = annualIncome - annualSpends;
        return [annualIncomeRest, annualSpends];
      }
      return [];
    },
    haveChartSeriesData() {
      return this.chartSerie.length > 0;
    },
    showChart() {
      return this.haveChartSeriesData ? "block" : "hidden";
    },
  },
};
</script>

<style lang="scss">
.total-spend__container {
  display: grid;
  grid-template-columns: 1fr 280px;
  align-content: center;
}

.total-spend-chart {
  .ct-legend {
    position: relative;
    z-index: 10;
    list-style: none;
    font-size: 10pt;
    text-align: center;

    li {
      position: relative;
      padding-left: 23px;
      margin-right: 10px;
      margin-bottom: 3px;
      display: inline-block;

      &:before {
        width: 8px;
        height: 8px;
        position: absolute;
        left: 0;
        content: "";
        border: 3px solid transparent;
        border-radius: 2px;
      }
      .inactive:before {
        background: transparent;
      }

      &:nth-child(1)::before {
        background-color: #ff4757;
      }

      &:nth-child(2)::before {
        background-color: #5cec6d;
      }
    }
  }

  .ct-series-b .ct-slice-pie {
    fill: #ff4757;
  }
  .ct-series-a .ct-slice-pie {
    fill: #5cec6d;
  }

  .ct-label {
    fill: #413c3c;
    font-weight: 500;
    font-size: 9pt;
  }
}
</style>
