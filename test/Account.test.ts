import Account from "../src/Account";
import CurrencyAPI from "../src/CurrencyAPI";
import CurrentyAPIFake from "../src/CurrentyAPIFake";
import sinon from "sinon";

let account: Account;
let currencyAPI: CurrencyAPI;

beforeEach(() => {
  currencyAPI = new CurrentyAPIFake();
  account = new Account(currencyAPI);
});

test("Criar uma nova conta", () => {
  const balance = account.getBalance();
  expect(balance).toBe(0);
});

test("Criar uma novo credito de R$100", () => {
  account.credit(100);
  const balance = account.getBalance();
  expect(balance).toBe(100);
});

test("Criar uma novo debito de R$50", () => {
  account.credit(100);
  account.debit(50);
  const balance = account.getBalance();
  expect(balance).toBe(50);
});

test("Criar uma novo debito de U$100 com fake", () => {
  account.credit(100, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(500);
});

test("Criar uma novo debito de U$500 com stub", () => {
  sinon.stub(currencyAPI, "convert").returns(600);
  account.credit(100, "USD");
  const balance = account.getBalance();
  expect(balance).toBe(600);
});

test("Criar uma conta com spy", () => {
  const spy = sinon.spy(account, "getBalance");
  account.getBalance();
  account.getBalance();
  sinon.assert.calledTwice(spy);
});

test("Criar uma novo debito de U$500 com mock", () => {
  const mock = sinon.mock(account);
  mock.expects("credit").once().withArgs(100, "USD");
  mock.expects("getBalance").once().returns(500);
});
