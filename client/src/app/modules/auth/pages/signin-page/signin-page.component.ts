import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get username() {
    return this.form.controls.username as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    const username = this.username.value
    const password = this.password.value
    
    if(username && password) {
      this.authService.singIn({password, username})
    }
  }
}
