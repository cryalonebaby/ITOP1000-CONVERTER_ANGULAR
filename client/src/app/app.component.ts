import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './shared/services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public currencyService: CurrencyService) {}

  usdToUah: any | number
  eurToUah: any | number

  ngOnInit(): void {    
    this.currencyService.getCurrencies().subscribe(() => {
      this.usdToUah = this.currencyService.uahCurrency.price
      this.eurToUah = this.usdToUah * this.currencyService.eurCurrency.price
    })
  }
}
