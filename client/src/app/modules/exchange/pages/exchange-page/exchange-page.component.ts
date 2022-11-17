import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ICurrencies } from 'src/app/shared/models/currencies';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.scss']
})
export class ExchangePageComponent implements OnInit {

  selectedGive: ICurrencies | any = {}
  selectedTake: ICurrencies | any = {}

  givePrice: number = this.selectedGive.price
  takePrice: number = this.selectedTake.price

  form = new FormGroup({
    give: new FormControl(''),
    take: new FormControl(''),
  })

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe(() => {
      this.selectedGive = this.currencyService.eurCurrency
      this.selectedTake = this.currencyService.uahCurrency

      this.givePrice = this.selectedGive.price
      this.takePrice = this.selectedTake.price      
    })
  }

  get giveAmount() {
    return this.form.get('give')?.value
  }

  get takeAmount() {
    return this.form.get('take')?.value
  }

  isError() {
    if(!this.giveAmount || !this.takeAmount || this.selectedGive.symbol === this.selectedTake.symbol) {
      return true
    }
    return false
  }

  changeDisable(type: string = 'enable') {
    if(type === 'disable') {
      this.form.get('give')?.disable()
      this.form.get('take')?.disable()
      return true
    }
    if(type === 'enable') {
      this.form.get('give')?.enable()
      this.form.get('take')?.enable()
    }
    return false
  }

  onChangeGive(val: string) {  
    // formulas
    const firstFormula = +val * this.givePrice * this.takePrice
    const secondFormula = +val / this.givePrice / this.takePrice

    let takeAmount = firstFormula
    if(this.selectedGive.symbol === 'UAH') {
      takeAmount = secondFormula
    }

    this.form.get('take')?.setValue(takeAmount.toFixed(2).toString())
  }

  onChangeTake(val: string) {
    // formulas
    const firstFormula = +val / this.givePrice / this.takePrice
    const secondFormula = +val * this.givePrice * this.takePrice

    let giveAmount = firstFormula
    if(this.selectedGive.symbol === 'UAH') {
      giveAmount = secondFormula
    }

    this.form.get('give')?.setValue(giveAmount.toFixed(2).toString())
  }

  // TODO Organize Formulas
  setSelectedGive(newCurrency: ICurrencies) {
    this.changeDisable('enable')
    this.takePrice = this.selectedTake.price
    this.givePrice = newCurrency.price

    // formulas
    const firstFormula = this.takeAmount ? +this.takeAmount / this.takePrice / newCurrency.price : 0
    const secondFormula = this.takeAmount ? +this.takeAmount * this.takePrice * newCurrency.price : 0

    let newPrice = firstFormula
    if(newCurrency.symbol === 'UAH') {
      newPrice = secondFormula
    }
    if(newCurrency.symbol === this.selectedTake.symbol) {
      newPrice = this.takeAmount ? +this.takeAmount : 0
      this.changeDisable('disable')
    }

    this.form.get('give')?.setValue(newPrice.toFixed(2).toString())
    this.selectedGive = newCurrency
  }

  setSelectedTake(newCurrency: ICurrencies) {
    this.changeDisable('enable')
    this.givePrice = this.selectedGive.price
    this.takePrice = newCurrency.price

    // formulas
    const firstFormula = this.giveAmount ? +this.giveAmount * newCurrency.price / this.givePrice : 0
    const secondFormula = this.takeAmount ? +this.takeAmount * this.takePrice * newCurrency.price : 0

    let newPrice = firstFormula
    if(newCurrency.symbol === 'UAH') {
      newPrice = secondFormula
    }
    if(newCurrency.symbol === this.selectedGive.symbol) {
      newPrice = this.giveAmount ? +this.giveAmount : 0
      this.changeDisable('disable')
    }

    this.form.get('take')?.setValue(newPrice.toFixed(2).toString())
    this.selectedTake = newCurrency
  }

  swap() {
    const tmpGive = this.selectedGive

    this.setSelectedGive(this.selectedTake)
    this.setSelectedTake(tmpGive)
    
    this.givePrice = this.selectedGive.price
    this.takePrice = this.selectedTake.price
  }

}
