import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, timeout, catchError, delay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginProgramModel } from '../models/login-program.model';
import * as EventEmitter from 'events';

type EntityResponseType = HttpResponse<LoginProgramModel>;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: any): Observable<EntityResponseType> {
    return this.http.post<LoginProgramModel>(`${environment.ATM_API_GATEWAY}/login`, login, { observe: 'response' });
  }

  authenticationcate(authenticationcate: any): Observable<EntityResponseType> {
    return this.http.post<LoginProgramModel>(`${environment.ATM_API_GATEWAY}/authenticationcate`, authenticationcate, { observe: 'response' });
  }

  changePass(changePass: LoginProgramModel): Observable<EntityResponseType> {
    return this.http.post<LoginProgramModel>(`${environment.ATM_API_GATEWAY}/changePass`, changePass, { observe: 'response' });
  }
  getUserLogin() {
    return this.http.get<any>(`${environment.ATM_API_GATEWAY}/getUserName`, { observe: 'response' })
  }
  getTenant() {
    return this.http.get<any>(`${environment.ATM_API_GATEWAY}/get-tenant`, { observe: 'response' })
  }
  sendSimpleEmail(sendSimpleEmail: LoginProgramModel): Observable<EntityResponseType> {
    return this.http.post<LoginProgramModel>(`${environment.ATM_API_GATEWAY}/sendSimpleEmail`, sendSimpleEmail, { observe: 'response' });
  }

  delete(id: any) {
    return this.http.delete(`${environment.ATM_API_GATEWAY}/config-menu-items/${id}`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${environment.ATM_API_GATEWAY}/config-menu-items/allInfo/${id}`, { observe: 'response' });
  }
  fakeApiPending(ms: number): Observable<any> {
    if (ms <= 5000) {
      // return this.getUserInfo().pipe(delay(ms))
    }
    return of(ms).pipe(delay(ms))
  }

  fakeApi(ms: number): Observable<any> {
    return of(ms).pipe(() =>{
      if(ms <= 5000){
        return of(ms)
      }
      return of(ms).pipe(() => throwError("ERROR"))
    })
  }

  getUserInfo(file: File){
    let formData: FormData = new FormData()
    formData.append('token', file, file.name)
    return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_CARD_READER}/read_card/decode`, formData, { observe: 'response' })
  }

  authenticate(loginForm: any){
    console.log(loginForm);
    
    return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/card/login`, loginForm, { observe: 'response' })
    // return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/card/login`, loginForm, { observe: 'response' })
  }
}

