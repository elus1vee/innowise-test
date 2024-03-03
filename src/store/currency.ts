import { apiService } from "@/service/api.service";
import { defineStore } from "pinia";
import { ref } from "vue";

type CurrenciesItem = {
  currency: string;
  value: number;
};

type CurrencyRateList = {
  baseCurrency: string;
  currencies: CurrenciesItem[];
};

type CurrencyData = {
  baseCurrency: string;
  data: {
    [currencyCode: string]: {
      code: string;
      value: number;
    };
  };
};

export const useCurrencyStore = defineStore("currency", () => {
  const currencyList = ref<string[]>([]);
  const currencyRateList = ref<CurrencyRateList>();
  const allRatesForCurrency = ref<CurrencyData>();

  const fetchCurrencyList = async () => {
    if (!currencyList.value.length) {
      const result = await apiService.getCurrencyList();
      currencyList.value = result;
    }
  };

  const fetchCurrencyRate = async (baseCurrency: string, currency: string) => {
    function needsUpdate(baseCurrency: string): boolean {
      if (!currencyRateList.value) {
        return true; // Если currencyRateList пустой, нужно выполнить запрос
      }

      return currencyRateList.value.baseCurrency !== baseCurrency;
    }
    function isCurrencyNotExist(currency: string): boolean {
      if (!currencyRateList.value) {
        return true;
      }
      if (!currencyRateList.value.currencies) {
        return true;
      }

      return !currencyRateList.value.currencies.some(
        (item) => item.currency === currency
      );
    }
    if (needsUpdate(baseCurrency) || isCurrencyNotExist(currency)) {
      const result = await apiService.getCurrencyRate(baseCurrency, currency);
      if (currencyRateList.value?.baseCurrency === baseCurrency) {
        currencyRateList.value.currencies.push({
          currency,
          value: result,
        });
      } else {
        currencyRateList.value = {
          baseCurrency,
          currencies: [{ currency, value: result }],
        };
      }
    }
  };

  const fetchAllCurrenciesRates = async (baseCurrency: string) => {
    if (
      !allRatesForCurrency.value ||
      allRatesForCurrency.value.baseCurrency !== baseCurrency ||
      !allRatesForCurrency.value.data
    ) {
      const result = await apiService.getAllCurrenciesRates(baseCurrency);
      allRatesForCurrency.value = {
        baseCurrency,
        data: result,
      };
    }
  };

  return {
    currencyList,
    currencyRateList,
    allRatesForCurrency,
    fetchCurrencyList,
    fetchCurrencyRate,
    fetchAllCurrenciesRates,
  };
});
