<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <img
          src="https://www.intelliad.com/wp-content/themes/intelliad/img/logo_intelliad_2x.png"
          alt="LogoIntelliad"
        />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="headline text-uppercase">
        <p>Currency Converter</p>
      </div>
    </v-toolbar>

    <v-content>
      <currency-converter
        :to-currencies="output.countries"
        :from-currency="output.fromCurrency"
      >
      </currency-converter>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.vue";

export default {
  name: "App",
  components: {
    CurrencyConverter
  },
  async created() {
    // fetch data from node express
    await axios
      .get("http://localhost:3000/api/getRatesFromSql")
      .then(response => {
        const data = response.data;
        this.output.countries[1].rate = data[0].rate;
        this.output.countries[0].rate = data[1].rate;
      })
      .catch(e => {
        console.log(e);
      });
  },
  data() {
    return {
      output: {
        fromCurrency: {
          name: "Euro",
          currency: "EUR",
          flag: "eu",
          rate: 1
        },
        countries: [
          {
            name: "United States",
            currency: "USD",
            flag: "usa",
            rate: 1.12
          },
          {
            name: "Swissland",
            currency: "CHF",
            flag: "che",
            rate: 1.10164
          }
        ]
      }
    };
  }
};
</script>
