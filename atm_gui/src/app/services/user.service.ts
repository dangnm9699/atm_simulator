import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { LoginProgramModel } from '../models/login-program.model';

type EntityResponseType = HttpResponse<LoginProgramModel>;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) {

  }

}
