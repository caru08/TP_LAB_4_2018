import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { Session, User } from '../models';
import { StaticData } from '../classes/staticData'

@Component({
  selector: 'menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.scss']

})
export class MenuNavBarComponent implements OnInit{

  @Input() loading:boolean;
  public user: User;
  public modules:Array<any>;

  constructor(private loginService: LoginService,
              private router: Router ){

  }

  ngOnInit(){
    if(this.loginService.isLogged()){
      this.getModulesByRole();
    }
    this.loginService.sessionChange.subscribe((session:Session) => this.loginAnswer(session));
  }

  logOutClick(){
    this.loginService.logout();
  }

  loginAnswer(session: Session) {
    this.loading = false;
    if(session.logged){
      this.user = new User();
      this.user.name = session.user.name;
      this.getModulesByRole();
    }else{
      this.user = null;
    }
  }

  moduleClick(module){
    this.router.navigate([module.path]);
  }


  private getModulesByRole(){
    switch(this.loginService.getRole()){
      case "client":
        this.modules = StaticData.clientModules;
        break;
      case "driver":
        break;
      case "admin":
        break;
    }


  }


}
