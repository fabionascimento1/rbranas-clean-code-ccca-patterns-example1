import CurrencyApi from "./CurrencyAPI";

export default class CurrencyAPIFake implements CurrencyApi {
  convert(amount: number, currency: string): number {
    return amount * 5
  }
}