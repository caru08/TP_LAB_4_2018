import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { Session } from '../models';

import 'rxjs/Rx';

import { GLOBAL } from './GLOBAL';
import { SnackMessage } from './snackmessage.service';

@Injectable()
export class LoginService {

  public sessionChange: Subject<Session> = new Subject();
  private session: Session = new Session();

  public url: string;

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(public _http: HttpClient,
              private snackMessage: SnackMessage) {
    this.url = GLOBAL.apiLogin;
  }

  login(user){
    let params = { email: user.email, pass: user.pass};
    return this._http.get(this.url + '/login', { params: params, headers: this.headers })
      .map(
        res => this.succesLogin(res)
      );
  }

  checkLogin(){
    let token = this.getToken();
    this.logout();
    return this._http.get(this.url + '/login/check', { params: {token: token} })
      .map(
        res => this.succesLogin(res)
      );
  }

  logout(){
    debugger;
    this.clearAuthorizationToken();
    this.clearSession();
    this.clearLocalStorage();
    this.notify();
  }

  registryUser(user){
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

  private succesLogin(response){
    try {
      if(response.code == 201){
        this.setAuthorizationHeader(response.data.token);
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
    return localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user'))).token : null;
  }

  private setAuthorizationHeader(token){
    this.headers.append('Authorization', token);
  }

  private clearAuthorizationToken(){
    this.headers.delete('Authorization');
  }

  private setSession(data){
    this.session.token = data.token;
    this.session.user.id = data.id;
    this.session.user.name = data.name;
    this.session.user.email = data.email;
    this.session.user.role = data.role;
    this.session.logged = true;
  }

  private clearSession(){
    this.session = new Session();
  }

  private setLocalStorage(){
    localStorage.setItem('user', JSON.stringify(this.session));
  }

  private clearLocalStorage(){
    localStorage.removeItem('user');
  }

  private showErrorMessage(message){
    this.snackMessage.ShowErrorSnack(message);
  }

  private notify() {
    this.sessionChange.next(this.session);
  }

}

