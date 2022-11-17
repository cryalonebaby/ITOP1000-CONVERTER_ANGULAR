import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exchange-input',
  templateUrl: './exchange-input.component.html',
  styleUrls: ['./exchange-input.component.scss']
})
export class ExchangeInputComponent implements OnInit {
  @Input() isGive: any | boolean
  @Input() onChangeGive: any | ((args: any) => void)
  @Input() onChangeTake: any | ((args: any) => void)
  @Input() control = new FormControl()

  label: any | string
  changeFn: any | (() => void)

  constructor() { }

  ngOnInit(): void {
    this.label = this.isGive ? 'Give Amount' : 'Take Amount'
    this.changeFn = this.isGive ? this.onChangeGive : this.onChangeTake
  }

}
