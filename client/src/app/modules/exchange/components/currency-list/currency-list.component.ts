import { Component, OnInit, Input } from '@angular/core';
import { ICurrencies } from 'src/app/shared/models/currencies';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  @Input() currencies: ICurrencies[] = []
  @Input() selectedSymbol = ''
  @Input() isGive: any | boolean
  @Input() setSelectedGive: any | ((currency: ICurrencies) => void)
  @Input() setSelectedTake: any | ((currency: ICurrencies) => void)

  selectFn: any | ((currency: ICurrencies) => void) 

  constructor() { }

  ngOnInit(): void {
    this.selectFn = this.isGive ? this.setSelectedGive : this.setSelectedTake  
  }

}
