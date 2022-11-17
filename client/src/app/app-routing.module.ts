import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangePageComponent } from './modules/exchange/pages/exchange-page/exchange-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';
import { SigninPageComponent } from './modules/auth/pages/signin-page/signin-page.component';
import { ExchangeGuard } from './shared/guards/exchange.guard';
import { SignPageGuard } from './shared/guards/sign-page.guard';

const routes: Routes = [
  {path: '', component: HomePageComponent, canActivate: [SignPageGuard]},
  {path: 'signin', component: SigninPageComponent, canActivate: [SignPageGuard]},
  {path: 'signup', component: RegisterPageComponent, canActivate: [SignPageGuard]},
  {path: 'exchange', component: ExchangePageComponent, canActivate: [ExchangeGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
