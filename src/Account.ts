import CurrencyApi from "./CurrencyAPI"

export default class Account {
    balance: number
    constructor(readonly currencyAPI: CurrencyApi) {
        this.balance = 0
    }
    credit(amount: number, currency?: string) {
        if (currency) {
            amount = this.currencyAPI.convert(amount, currency)
        }
        this.balance += amount
    }
    debit(amount: number) {
        this.balance -= amount
    }
    getBalance() {
        return this.balance
    }
}