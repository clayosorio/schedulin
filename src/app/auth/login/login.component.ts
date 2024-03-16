import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm = this.formBuilder.group({
  userName: ['',[Validators.required]],
  password: ['', [Validators.required]]
})
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}
ngOnInit(): void {
}
get userName(){
  return this.loginForm.controls.userName
}
get password(){
  return this.loginForm.controls.password
}
  loging(){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (loginData) => {
          console.log('loginData :>> ', loginData);
        },
        error: (errorData) => {
          alert(errorData);
          console.log(errorData);
          this.router.navigateByUrl('/login');
          this.loginForm.reset();
          this.loginForm.markAllAsTouched();
        },
        complete: () => {
          console.log('Login successfully');
          this.router.navigateByUrl('/start')
        }
      }
      );
  }
}
