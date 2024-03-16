import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from './login.response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  currentUserData: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>({success: false,token: '', tokenRefresh: '', message: '', })

  constructor(private http:HttpClient) { }
  
  urlAPI:string = environment.url_api;
  
  login(credentials:LoginRequest): Observable<LoginResponse>{

    const body = JSON.stringify(credentials);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<LoginResponse>(`${this.urlAPI}Auth/Login`, body, { headers }).pipe(
      tap((loginResponse: LoginResponse) => {
        this.currentUserData.next(loginResponse);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse)
  {
    if (error.status === 0) {
      console.log('Se ha producido un error :>> ', error.error);
    }else{
      console.error('Backend error response', error.status, error.message)
    }

    return throwError(() => new Error('Algo falló, por favor intentelo de nuevo'));
  }

  get userData(): Observable<LoginResponse>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
