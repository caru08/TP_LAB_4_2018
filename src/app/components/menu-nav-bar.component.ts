import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Session, User } from '../models';

@Component({
  selector: 'menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.scss']

})
export class MenuNavBarComponent implements OnInit{

  @Input() loading:boolean;
  public user: User;

  constructor(private loginService: LoginService){

  }

  ngOnInit(){
    if(this.loginService.isLogged()){
      this.getModulesByRole();
    }
    this.loginService.sessionChange.subscribe((session:Session) => this.loginAnswer(session));
  }

  salir(){
    this.loginService.logout();
  }

  private getModulesByRole(){

  }

  loginAnswer(session: Session) {
    this.loading = false;
    if(session.logged){
      this.user = new User();
      this.user.name = session.user.name;
    }else{
      this.user = null;
    }
  }

}
