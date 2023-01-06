export default interface CurrencyApi {
  convert(amount: number, currency: string): number
}