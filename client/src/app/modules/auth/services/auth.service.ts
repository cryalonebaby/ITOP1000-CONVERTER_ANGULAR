import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    public router: Router,
    public errorService: ErrorService
  ) { }

  endpoint: string = 'http://localhost:4000/api';

  handleError(error: HttpErrorResponse) {
    let msg = ''
    if(error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message
    } else {
      // server-side error
      msg = `Error Code ${error.status}\nMessage: ${error.message}`
    }
    this.errorService.handle('Input data is incorrect!')
    return throwError(msg)
  }

  // Sign-up
  signUp(user: User) {
    let api = `${this.endpoint}/register-user`

    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe((res: any) => {
        this.router.navigate(['signin'])
      })
  }

  // Sign-in
  singIn(user: User) {
    let api = `${this.endpoint}/signin`

    return this.http
      .post<any>(api, user)
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        window.location.reload()
        this.router.navigate(['exchange'])
      })
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken()
    const res = authToken === null ? false : true
    return true
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token')
    if(removeToken === null) {
      this.router.navigate([''])
    }
  }
}
