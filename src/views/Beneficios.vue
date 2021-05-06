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
import { VMoney } from "v-money";
export default {
  data() {
    return {
      receitaBrutaAnual: 0,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
      },
    };
  },
  methods: {
    track() {
      this.$ga.page("/beneficios");
    },
    convertMoneyMaskToNumber(maskedMoney) {
      if (typeof maskedMoney === "string") {
        const thousandFixed = maskedMoney
          .replace(/(R\$)/g, "")
          .trim()
          .replace(/(.+)[.,](\d+)$/g, "$1x$2")
          .replace(/[.,]/g, "")
          .replace("x", ".");
        return parseFloat(thousandFixed);
      }
    },
  },
  directives: { money: VMoney },
  computed: {
    decimoTerceiro() {
      const receitaBrutaAnual = this.convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      const receitaMensal = receitaBrutaAnual / 12;
      return receitaMensal / 12;
    },
    ferias() {
      const receitaBrutaAnual = this.convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      const receitaMensal = receitaBrutaAnual / 12;
      const umTercoDoSalario = receitaMensal / 3;
      const ferias = umTercoDoSalario / 12;
      return ferias;
    },
    fgts() {
      const receitaBrutaAnual = this.convertMoneyMaskToNumber(
        this.receitaBrutaAnual
      );
      const receitaMensal = receitaBrutaAnual / 12;
      const fgts = receitaMensal * 0.08;
      return fgts;
    },
    totalGastos() {
      return this.decimoTerceiro + this.ferias + this.fgts;
    },
  },
};
</script>

<style></style>
