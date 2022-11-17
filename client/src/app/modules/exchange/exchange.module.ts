import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangePageComponent } from './pages/exchange-page/exchange-page.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { ExchangeInputComponent } from './components/exchange-input/exchange-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PreventDirective } from './directives/prevent.directive';

@NgModule({
  declarations: [
    ExchangePageComponent,
    CurrencyListComponent,
    ExchangeInputComponent,
    PreventDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class ExchangeModule { }
