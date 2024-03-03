import currencyapi from "@everapi/currencyapi-js";

class ApiService {
  private client: any;
  public constructor() {
    this.client = new currencyapi(process.env.VUE_APP_API_KEY);
  }

  public async getCurrencyList(): Promise<string[]> {
    try {
      return this.client.currencies().then((response: any) => {
        return Object.keys(response.data);
      });
    } catch (error) {
      console.error("Ошибка при получении всех курсов валют:", error);
      throw error;
    }
  }

  public async getCurrencyRate(
    baseCurrency: string,
    currency: string
  ): Promise<number> {
    try {
      return this.client
        .latest({
          base_currency: baseCurrency,
          currencies: currency,
        })
        .then((response: any) => {
          return response.data[currency].value;
        });
    } catch (error) {
      console.error("Ошибка при получении всех курсов валют:", error);
      throw error;
    }
  }

  public async getAllCurrenciesRates(baseCurrency: string) {
    try {
      return this.client
        .latest({
          base_currency: baseCurrency,
        })
        .then((response: any) => {
          return response.data;
        });
    } catch (error) {
      console.error("Ошибка при получении всех курсов валют:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
