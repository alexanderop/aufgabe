<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row wrap justify-space-around>
              <v-flex xs12 md11>
                <h1>Currency Converter</h1>
              </v-flex>
              <v-flex xs12 md1>
                <v-select
                  label="Select"
                  v-bind:items="countries"
                  v-model="toCurrencyName"
                  item-text="name"
                  item-value="name"
                  max-height="auto"
                  @change="updateToCountry"
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                <p>From: {{ fromCurrencyName }}</p>
                <country-flag v-bind:country="fromCurrencyFlag" size="big"></country-flag>
                <v-container>
                  <currency-input
                    v-model="fromCurrencyValue"
                    v-bind:currency="fromCurrencyCurrency"
                    locale="de"
                    @keyup="calculateToCurrency"
                  ></currency-input>
                </v-container>
              </v-flex>
              <v-flex xs12 md6>
                <p>To: {{ toCurrencyName }}</p>
                <country-flag
                  v-bind:country="toCurrency.flag"
                  size="big"
                ></country-flag>
                <v-container>
                  <currency-input
                    v-model="toCurrencyValue"
                    v-bind:currency="toCurrency.currency"
                    locale="de"
                    @keyup="calculateFromCurrency"
                  ></currency-input>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CountryFlag from "vue-country-flag";

export default {
  name: "CurrencyConverter",
  components: {
    CountryFlag
  },
  props: {
    toCurrencies: Array,
    fromCurrency: Object,
  },
  created() {
    this.calculateToCurrency();
  },
  data: function() {
    return {
      toCurrencyName: this.toCurrencies[0].name,
      toCurrencyValue: "",
      fromCurrencyName: this.fromCurrency.name,
      fromCurrencyValue: this.fromCurrency.rate,
      fromCurrencyFlag: this.fromCurrency.flag,
      fromCurrencyCurrency: this.fromCurrency.currency,
      toCurrency: this.toCurrencies[0],
      countries: this.toCurrencies
    };
  },
  methods: {
    updateToCountry: function() {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.toCurrencyName === this.countries[i].name) {
          this.toCurrency = this.countries[i];
        }
      }
      this.calculateToCurrency();
    },
    calculateToCurrency: function() {
      const value = parseFloat(this.fromCurrencyValue);
      if (isNaN(value)) {
        this.fromCurrencyValue = 0;
        return;
      }
      this.toCurrencyValue = value * this.toCurrency.rate;
    },
    calculateFromCurrency: function() {
      const value = parseFloat(this.toCurrencyValue);
      if (isNaN(value)) {
        this.ToCurrencyValue = 0;
        return;
      }
      this.fromCurrencyValue = value / this.toCurrency.rate;
    }
  }
};
</script>

<style scoped></style>
