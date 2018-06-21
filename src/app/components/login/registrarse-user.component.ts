import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { SnackMessage } from './../../services/snackmessage.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models';

@Component({
  selector: 'registrarse-user',
  templateUrl: './registrarse-user.component.html'
})

export class RegistrarseUserComponent {

  public user = new User();
  public loading: boolean;
  public invalidCaptcha: boolean;
  public siteKeyGoogle:string = '6LeF_V8UAAAAAJcFNflNmterrOXgwJ1yCqriBAkz';

  public listaSexos = [
    {
      name: 'FEMENINO',
      value: 'femenino'
    },
    {
      name: 'MASCULINO',
      value: 'masculino'
    }
  ];

  constructor(private router: Router,
              private loginService: LoginService,
              private snackMessage: SnackMessage) {
    this.user.role = "client";
    this.invalidCaptcha = true;
  }

  resolved(captchaResponse: string) {
    this.invalidCaptcha = false;
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  acceptClick(){
    this.loading = true;
    this.loginService.registryUser(this.user).subscribe((response) => {
      if(response.code == 201){
        this.router.navigate(['./home' ]);
      }else{
        this.snackMessage.ShowErrorSnack("error al registrarse: " + response.message);
      }
      this.loading = false;
      console.log(response);
    }, (error) => {
      this.loading = false;
      this.snackMessage.ShowErrorSnack("error al registrarse: " + error);
    });
  }

  cancelClick(){
    this.router.navigate(['./home' ]);
  }

}
