<template>
  <div class="container">
    <h1 class="text-left">Planejando benefícios trabalhistas sendo MEI</h1>
    <div
      class="text-left pb-2"
      style="margin-top:6px;font-weight:500;font-size:14px;color: #b5b5c3!important;"
    >
      De um modo análogo à CLT, propomos que seu salário bruto seja dividido em
      “provisões” para todos os benefícios trabalhistas. Algumas empresas
      oferecem 13º e férias aos funcionários PJ; em todo caso, calculemos sobre
      o montante pago por ano.
    </div>

    <div class="card">
      <div class="form__control">
        <label for="receitaBrutaAnual"
          >Receita Bruta Anual (salário mensal * 12)</label
        >
        <input
          type="tel"
          name="receitaBrutaAnual"
          v-model.lazy="receitaBrutaAnual"
          v-money="money"
        />
      </div>

      <div class="form__control">
        <h2 class="text-left">13º salário</h2>
        <div class="description text-left">
          Se quiser um salário a mais no Natal, precisaria poupar 1/12 da sua
          renda cada mês.
        </div>
        <input
          type="tel"
          name="decimoTerceiro"
          v-money="money"
          :value="Math.ceil(decimoTerceiro * 100)"
          disabled
        />
      </div>

      <div class="form__control">
        <h2 class="text-left">Férias</h2>
        <div class="description text-left">
          Com ou sem o “descanso remunerado anual” do PJ, caso queira ter um
          dinheiro extra para fazer uma viagem, comprar um eletrônico ou coisa
          do tipo, precisaria poupar 1/12 de um terço do salário.
        </div>
        <input
          type="tel"
          name="ferias"
          v-money="money"
          :value="Math.ceil(ferias * 100)"
          disabled
        />
      </div>

      <div class="form__control">
        <h2 class="text-left">FGTS</h2>
        <div class="description text-left">
          É uma espécie de reserva para emergências bancada pelo empregador, a
          qual fica nas mãos do Governo, e é devolvida ao trabalhador em caso de
          demissão. Pela CLT, corresponde a 8% do salário base. O PJ pode
          guardar mais ou menos do que isso, como preferir.
        </div>
        <input
          type="tel"
          name="fgts"
          v-money="money"
          :value="Math.ceil(fgts * 100)"
          disabled
        />
      </div>

      <div class="form__control">
        <h2 class="text-left">Total de Gastos</h2>
        <div class="description text-left">
          Para ter esses benefícios você deveria guardar por mês:
        </div>
        <input
          type="tel"
          name="totalGastos"
          v-money="money"
          :value="Math.ceil(totalGastos * 100)"
          disabled
        />
      </div>

      <div class="form__control">
        <div :class="showChart" class="total-spend-chart" />
      </div>

      <div class="featured text-left">
        <span>Fonte: </span>
        <a
          href="https://www.contratopj.com.br/pj-x-clt-como-organizar-o-seu-dinheiro/"
          target="_blank"
          >https://www.contratopj.com.br/pj-x-clt-como-organizar-o-seu-dinheiro/</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { convertMoneyMaskToNumber } from "@/utils/utils.js";
import { VMoney } from "v-money";
import Chartist from "chartist";
require("chartist-plugin-legend");

export default {
  data() {
    return {
      chart: null,
      receitaBrutaAnual: 0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
      },
    };
  },
  mounted() {
    this.setUpChart();
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
    track() {
      this.$ga.page("/beneficios");
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
    decimoTerceiro() {
      const receitaBrutaAnual = convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      const receitaMensal = receitaBrutaAnual / 12;
      return receitaMensal / 12;
    },
    ferias() {
      const receitaBrutaAnual = convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      const receitaMensal = receitaBrutaAnual / 12;
      const umTercoDoSalario = receitaMensal / 3;
      const ferias = umTercoDoSalario / 12;
      return ferias;
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
