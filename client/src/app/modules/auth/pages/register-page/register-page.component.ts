import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ValidatePassword } from '../../validators/password.validator';
import { ValidateUsername } from '../../validators/username.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      ValidateUsername
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      ValidatePassword
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

  signUp() { 
    const username = this.username.value
    const password = this.password.value

    if(username && password) {  
      this.authService.signUp({password, username})
    }
  }

}
