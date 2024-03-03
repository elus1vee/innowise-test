import CurrencyTable from "@/components/CurrencyTable.vue";
import { mount } from "@vue/test-utils";

describe("CurrencyTable", () => {
  it("renders currency data correctly", () => {
    const data = {
      USD: { code: "USD", value: 1.23 },
      EUR: { code: "EUR", value: 1.45 },
    };
    const wrapper = mount(CurrencyTable, {
      props: { data },
    });
    const currencyCells = wrapper.findAll(".cell");
    expect(currencyCells.length).toBe(4);
    expect(currencyCells[0].text()).toBe("USD");
    expect(currencyCells[1].text()).toBe("1.23");
    expect(currencyCells[2].text()).toBe("EUR");
    expect(currencyCells[3].text()).toBe("1.45");
  });

  it("renders zero values correctly", () => {
    const data = {
      USD: { code: "USD", value: 0 },
      EUR: { code: "EUR", value: 0.0012 },
    };
    const wrapper = mount(CurrencyTable, {
      props: { data },
    });
    const currencyCells = wrapper.findAll(".cell");
    expect(currencyCells.length).toBe(4);
    expect(currencyCells[1].text()).toBe("0");
    expect(currencyCells[3].text()).toBe("0.0012");
  });
});
