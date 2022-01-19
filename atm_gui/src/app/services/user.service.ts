import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { LoginProgramModel } from '../models/login-program.model';

type EntityResponseType = HttpResponse<LoginProgramModel>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) {

  }

  getCardDetail(cardNumber: any, headers: any){
    return this.http.get<any>(`http://localhost:8080${environment.ATM_BANK}/card`, {headers: headers, params: {number: cardNumber }, observe: 'response' })
    // return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/card`, loginForm, { observe: 'response' })
  }

}
