import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { LoginProgramModel } from '../models/login-program.model';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<LoginProgramModel>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) {

  }

  getCardDetail(cardNumber: any, headers: any){
    return this.http.get<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/card`, {headers: headers, params: {number: cardNumber }, observe: 'response' })
    // return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/card`, loginForm, { observe: 'response' })
  }

  checkTransfer(transferFromNumber: any, transferToNumber: any, money: any,  headers: any){
    const body = { 
      transferFromNumber:transferFromNumber, 
      transferToNumber: transferToNumber, 
      money :money, 
      id:"172.92.16.42"
    }
    return this.http.post(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/transaction/transfer/check`, body, {headers: headers, observe: 'response', responseType: 'text' })
  }

  transfer(transferFromNumber: any, transferToNumber: any, money: any,  headers: any){
    const body = { 
      transferFromNumber:transferFromNumber, 
      transferToNumber: transferToNumber, 
      money :money, 
      id:"172.92.16.42"
    }
    return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/transaction/transfer`, body, {headers: headers, observe: 'response' })
    // return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/card`, loginForm, { observe: 'response' })
  }

  withdraw(accNumber: any, money: any,  headers: any){
    const body = {
      "number":accNumber,
      "ip":"172.92.16.42",
      "money":money
    }
    return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/transaction/withdraw`, body, {headers: headers, observe: 'response' })  
  }
  checkWithdraw(accNumber: any, money: any,  headers: any){
    const body = {
      "number":accNumber,
      "ip":"172.92.16.42",
      "money":money
    }
    return this.http.post(`${environment.ATM_API_GATEWAY}${environment.ATM_BANK}/transaction/withdraw/check`, body, {headers: headers, observe: 'response', responseType: 'text' })
  }

  withdrawATM(card: any, amount: any,  headers: any){
    const body = {
      "amount":amount,
      "card":card
    }
    return this.http.post(`${environment.ATM_API_GATEWAY}${environment.ATM_CARD_DISPENSER}/withdraw`, body, {headers: headers, observe: 'response' })
  }

  printInvoice(amount: any, created_at: any, src_card: any, dst_card: any,  headers: any){
    const body = {
      "receipt_type": dst_card ? 1 : 0,
      "amount": amount,
      "atm_ip": "172.92.16.42",
      "created_at": created_at,
      "src_card": src_card,
      "dst_card": dst_card
    }
    return this.http.post<any>(`${environment.ATM_API_GATEWAY}${environment.ATM_CARD_DISPENSER}/receipt`, body, {headers: headers, observe: 'response' })
  }
  downloadInvoice(url:any,  headers: any){
    return this.http.get(url, {headers: headers, responseType: 'blob' })
  }
}