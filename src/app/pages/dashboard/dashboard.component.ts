import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/services/auth/login.response';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  userLoginOn:boolean = false;
  loginResponse?:LoginResponse;

  constructor(private loginService: LoginService) {}
  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) =>{
          this.userLoginOn = userLoginOn
        }
      }
    );
    this.loginService.currentUserData.subscribe(
      {
        next:(loginData) => {
          this.loginResponse = loginData
        }
      }
    );
  }
}
