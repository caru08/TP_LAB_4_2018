import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { SnackMessage } from './services/snackmessage.service';
import 'rxjs/Rx';
import { Session } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loading:boolean;

  constructor(private router: Router,
              private loginService: LoginService,
              private snackMessage: SnackMessage){
    //this.checkLogin();
  }

  ngOnInit(){
    this.loginService.sessionChange.subscribe((session:Session) => this.loginAnswer(session));
    this.router.navigate(['./home' ]);
  }

  // private checkLogin() {
  //   this.loading = true;
  //   this.loginService.checkLogin().subscribe((response) => {
  //     if(response.code == 201){
  //       this.router.navigate(['./home' ]);
  //     }else{
  //       this.router.navigate(['./home' ]);
  //       console.log("ocurrio un error", response.message);
  //     }
  //     console.log(response);
  //     this.loading = false;
  //   }, (error) => {
  //     this.router.navigate(['./home' ]);
  //     console.log("ocurrio un error", error);
  //     this.loading = false;
  //   });
  // }

  loginAnswer(session: Session) {
    this.loading = false;
    if(session.logged){
     // this.router.navigate(['./main']);
    }
  }



}
