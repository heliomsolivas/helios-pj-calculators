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
              <td>{{ aliquota.percentage }}%</td>
            </tr>
          </table>

          <!-- <h2 class="text-left pb-2">Passo 3:</h2>
        <div class="form__control">
          <label class="text-left" for="parcelaIsenta"
            >Parcela a deduzir (Lucro tributavel * porcentagem da aliquota da
            tabela)</label
          >
          <input
            type="tel"
            name="parcelaDeduzida"
            v-money="money"
            :value="parcelaDeduzida"
            disabled
          />
        </div>

        <h2 class="text-left pb-2">Passo 4:</h2>
        <div class="form__control">
          <label class="text-left" for="parcelaIsenta"
            >Total para pagar de IR (Parcela deduzida - Parcela deduzida da
            tabela)</label
          >
          <input
            type="tel"
            name="totalImpostoDeRenda"
            v-money="money"
            :value="totalImpostoDeRenda * 100"
            disabled
          />
        </div> -->
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
    convert2Real(valor) {
      return valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
    track() {
      this.$ga.page("/clt");
    },
    updateChart(data) {
      if (this.haveChartSeriesData) {
        this.setUpChart();
        this.chart.update(data);
      }
    },
    setUpChart() {
      if (this.haveChartSeriesData && !this.chart) {
        this.chart = this.getChart();
      }
    },
    getChart() {
      const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const options = {
        labelInterpolationFnc: function(value) {
          return formatter.format(value);
        },
        plugins: [
          Chartist.plugins.legend({
            legendNames: [
              "Valor guardado durante o ano",
              "Restante da receita anual",
            ],
            clickable: false,
          }),
        ],
      };

      return new Chartist.Pie(".total-spend-chart", null, options);
    },
  },
  directives: { money: VMoney },
  computed: {
    inss() {
      const salarioBruto = convertMoneyMaskToNumber(this.salarioBruto);

      console.log(this.valorDaAliquota);

      const discount = 0;
      let aliq1 = 0;
      let aliq2 = 0;
      let aliq3 = 0;
      let aliqTotal = 0;

      if (this.valorDaAliquota.id === 3) {
        aliq1 = 82.5;
        aliq2 = 99.31;
        // salarioBruto - 2203.49 = 796.51 * 12%
        aliq3 = ((salarioBruto - 2203.49) * 12) / 100;
        aliqTotal = aliq1 + aliq2 + aliq3;
      }

      //  Por exemplo, um funcionário recebe uma remuneração de R$3 mil. Ele deverá fazer o cálculo a partir do total que passar de cada limite.

      // Na prática, funciona da seguinte maneira: a contribuição da primeira faixa é para salários de até R$1.100, com alíquota de 7,5%, resultando em R$ 82,50. Em seguida, como a remuneração ultrapassa a segunda faixa, é necessário calcular a base de contribuição realizando a subtração dos limites.

      // No caso, R$ 1.100,01 de R$ 2.203,48, totalizando R$ 1.103,47. Aplicando a alíquota de 9%, a contribuição soma mais R$ 99.31.

      // Por fim, o salário se encaixa na terceira faixa salarial. Subtraindo R$ 3 mil do limite de R$ 2.203,49, o resultado é R$ 796,51. Aplicando a alíquota de 12%, chega-se ao valor de R$ 95,58.

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
