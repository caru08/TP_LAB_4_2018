import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public loading:boolean;

  constructor(){
    this.loading = false;
  }

}
