import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap, catchError, throwError } from 'rxjs';
import { PASS_TOKEN } from '../interceptors/authconfig.interceptor';
import { IApiRates, ICurrencies } from '../models/currencies';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  currencyArray: ICurrencies[] = []
  uahCurrency: any | ICurrencies
  eurCurrency: any | ICurrencies

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }

  getCurrencies(): Observable<ICurrencies[]> {
    return this.http.get('https://api.exchangerate.host/latest', {
      params: {
        base: 'USD',
        symbols: 'UAH,USD,EUR'
      },
      context: new HttpContext().set(PASS_TOKEN, true)
    }).pipe(
      tap((res: any) => {
        const rates: IApiRates = res.rates

        // change format from {key: value} to {symbol: key, price: value}
        const ratesArray: ICurrencies[] = Object.entries(rates).map(([symbol, price]) => ({ symbol, price }))
        this.currencyArray = [...ratesArray]

        this.uahCurrency = ratesArray.find(i => i.symbol === 'UAH')
        this.eurCurrency = ratesArray.find(i => i.symbol === 'EUR')
      }),
      catchError(this.errorHandler.bind(this))
    )
  }
}
