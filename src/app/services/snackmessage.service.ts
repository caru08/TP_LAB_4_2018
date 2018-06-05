import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class SnackMessage {

  constructor(private snackBar: MatSnackBar){
  }

  ShowErrorSnack(message){
    let config = new MatSnackBarConfig();
    config["duration"] = 5000;
    config["panelClass"] = ['error-snackbar'];
    this.snackBar.open(message, '', config);
  }

  ShowSuccesSnack(message){
    let config = new MatSnackBarConfig();
    config["duration"] = 5000;
    config["panelClass"] = ['success-snackbar'];
    this.snackBar.open(message, '', config);
  }

}
