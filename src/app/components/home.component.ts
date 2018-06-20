import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public loading:boolean;

  constructor(private loginService: LoginService,
              private router: Router ){
    this.loading = false;
  }

  ngOnInit(){
    this.checkLogin();
  }

  private checkLogin() {
    this.loading = true;
    this.loginService.checkLogin().subscribe((response) => {
      if(response.code == 201){
        this.router.navigate(['./home' ]);
      }else{
        this.router.navigate(['./home' ]);
        console.log("ocurrio un error", response.message);
      }
      console.log(response);
      this.loading = false;
    }, (error) => {
      this.router.navigate(['./home' ]);
      console.log("ocurrio un error", error);
      this.loading = false;
    });
  }



}
