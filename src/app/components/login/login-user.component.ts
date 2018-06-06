import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { SnackMessage } from './../../services/snackmessage.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models';

@Component({
  selector: 'login-user',
  templateUrl: './login-user.component.html'
})

export class LoginUserComponent implements OnInit {

  public user  = new User();
  public loading:boolean;

  constructor(private router: Router,
              private loginService: LoginService,
              private snackMessage: SnackMessage ){
  }

  ngOnInit(){
  }

  loginClick() {
    this.login();
  }

  registrarse() {
    this.router.navigate(['/registrarse' ]);
  }

  private login(){
    this.loading = true;
    this.loginService.login(this.user).subscribe((response) => {
      if(response.code == 201){
        this.router.navigate(['./home' ]);
      }else{
        this.snackMessage.ShowErrorSnack("error al loguearse: " + response.message);
      }
      this.loading = false;
      console.log(response);
    }, (error) => {
      this.loading = false;
      this.snackMessage.ShowErrorSnack("error al loguearse: " + error);
      console.log("error al loguearse", error);
    });
  }



}
