export interface IApi {
  base: string,
  rates: IApiRates
}

export interface IApiRates {
  [symbol: string]: number
}

export interface ICurrencies {
  symbol: string,
  price: number,
}