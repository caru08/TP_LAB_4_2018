import { Routes } from '@angular/router';
import { AppComponent} from './app.component';
import { HomeComponent} from './components/home.component';
import { LoginUserComponent } from './components/login/login-user.component';
import { RegistrarseUserComponent } from './components/login/registrarse-user.component';
//import { ListadoPersonasComponent } from './components/listadoPersonas.component';
//import { FormPersonaComponent } from './components/form-persona.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'registrarse', component: RegistrarseUserComponent }

];
