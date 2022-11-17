import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() usdToUah: number | undefined
  @Input() eurToUah: number | undefined

  constructor(
    public currencyService: CurrencyService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.doLogout()
    window.location.reload()
  }

}
