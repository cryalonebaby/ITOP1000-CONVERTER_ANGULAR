import { Component, OnInit, Input } from '@angular/core';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() usdToUah: number | undefined
  @Input() eurToUah: number | undefined

  constructor(public currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

}
