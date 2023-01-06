import Account from "../src/Account"
import CurrencyAPIFake from "../src/CurrencyAPIFake"
import sinon from "sinon"
import CurrencyApi from "../src/CurrencyAPI"

let account: Account
let currencyAPI: CurrencyApi

beforeEach(() => {
    currencyAPI = new CurrencyAPIFake
    account = new Account(currencyAPI)
})

test('deve criar uma conta', () => {
    const balance = account.getBalance()
    expect(balance).toBe(0)
})

test('deve adicionar um credito de R$100,00', () => {
    account.credit(100)
    const balance = account.getBalance()
    expect(balance).toBe(100)
})

test('deve adicionar um debito de R$50,00', () => {
    account.credit(100)
    account.debit(50)
    const balance = account.getBalance()
    expect(balance).toBe(50)
})

test('deve adicionar um credito de U$500,00', () => {
    account.credit(100, 'USD')
    const balance = account.getBalance()
    expect(balance).toBe(500)
})

test('deve adicionar um credito de U$600,00', () => {
    sinon.stub(currencyAPI, 'convert').returns(600)
    account.credit(100, 'USD')
    const balance = account.getBalance()
    expect(balance).toBe(600)
})