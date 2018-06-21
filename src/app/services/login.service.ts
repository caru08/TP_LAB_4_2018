import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Session } from '../models';
import { JwtHelper } from '../classes/JWTHelper';

import 'rxjs/Rx';

import { GLOBAL } from './GLOBAL';
import { SnackMessage } from './snackmessage.service';

@Injectable()
export class LoginService {

  public sessionChange: Subject<Session> = new Subject();
  private session: Session = new Session();

  public url: string;

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(public _http: HttpClient,
              private snackMessage: SnackMessage) {
    this.url = GLOBAL.url;
  }

  login(user):any{
    var token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.post(this.url + '/login', user, httpOptions)
      .map(
        res => this.succesLogin(res)
      );
  }

  checkLogin():any{
    var token = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    this.logout();
    return this._http.post(this.url + '/login/check', {}, httpOptions)
      .map(
        res => this.succesLogin(res)
      );
  }

  logout(){
    this.clearAuthorizationToken();
    this.clearSession();
    this.clearLocalStorage();
    this.notify();
  }

  registryUser(user):any{
    let json = JSON.stringify(user);
    let params = 'json=' + json;
    return this._http.post(this.url + '/registrarse', params, {'headers': this.headers})
      .map(res => this.succesLogin(res));
  }

  isLogged(){
    if(localStorage.getItem('user') &&(JSON.parse(localStorage.getItem('user'))).logged){
      return true;
    }else{
      //this.showErrorMessage("No estas logueado");
      return false;
    }
  }

  getRole(){
    return this.session.user.role;
  }

  private succesLogin(response){
    try {
      if(response.code == 201){
        this.setAuthorizationHeader(response.data);
        this.setSession(response.data);
        this.setLocalStorage();
        this.notify();
        return response;
      }else{
        this.logout();
        return response;
      }
    } catch (e) {
      return response;
    }
  }

  private getToken(){
    return localStorage.getItem('userToken') ? (JSON.parse(localStorage.getItem('userToken'))).token : "";
  }

  private setAuthorizationHeader(token){
    this.headers.delete('Authorization');
    this.headers.append('Authorization', token);
  }

  private clearAuthorizationToken(){
    this.headers.delete('Authorization');
  }

  private setSession(data){
    this.session.token = data;
    this.session.logged = true;
    this.session.user.copyData(JwtHelper.decodeToken(data));
  }

  private clearSession(){
    this.session = new Session();
  }

  private setLocalStorage(){
    localStorage.setItem('userToken', JSON.stringify(this.session));
  }

  private clearLocalStorage(){
    localStorage.removeItem('userToken');
  }

  private showErrorMessage(message){
    this.snackMessage.ShowErrorSnack(message);
  }

  private notify() {
    this.sessionChange.next(this.session);
  }

}

