import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule,  MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule,
  MatSliderModule, MatSlideToggleModule, MatSortModule,
  MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
  MatSnackBarModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { RecaptchaModule } from 'ng-recaptcha';



//SERVICIOS
import { StaticData } from './classes/staticData'
import { ROUTES } from './app.routes';
import { LoginService } from './services/login.service';
import { SnackMessage } from './services/snackmessage.service';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//COMPONENTES COMUNES
import { CircleLoaderComponent } from './components/common/circle-loader.component';

//COMPONENTES PAGINAS
import { HomeComponent } from './components/home.component';
import { MenuNavBarComponent } from './components/menu-nav-bar.component';
import { LoginUserComponent } from './components/login/login-user.component';
import { RegistrarseUserComponent } from './components/login/registrarse-user.component';
import { SolicitarViajeComponent } from './components/acciones-usuario/solicitar-viaje.component';
import { HistorialViajesComponent } from './components/acciones-usuario/historial-pedidos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuNavBarComponent,
    CircleLoaderComponent,
    LoginUserComponent,
    RegistrarseUserComponent,
    SolicitarViajeComponent,
    HistorialViajesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      enableTracing: true  // <-- debugging purposes only
    }),
    RecaptchaModule.forRoot()
  ],
  providers: [
    LoginService,
    SnackMessage,
    StaticData
  ],
  bootstrap: [AppComponent],
  entryComponents:[
  ]
})
export class AppModule { }
