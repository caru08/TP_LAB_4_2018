import { Routes } from '@angular/router';
import { AppComponent} from './app.component';
import { HomeComponent} from './components/home.component';
import { LoginUserComponent } from './components/login/login-user.component';
import { RegistrarseUserComponent } from './components/login/registrarse-user.component';
import { SolicitarViajeComponent } from './components/acciones-usuario/solicitar-viaje.component';
import { HistorialViajesComponent } from './components/acciones-usuario/historial-pedidos.component';

//import { ListadoPersonasComponent } from './components/listadoPersonas.component';
//import { FormPersonaComponent } from './components/form-persona.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'home', component: HomeComponent,
    children:[
      { path:'solicitar-viaje', component: SolicitarViajeComponent },
      { path:'mi-historial', component: HistorialViajesComponent }
    ]
  },
  { path: 'login', component: LoginUserComponent },
  { path: 'registrarse', component: RegistrarseUserComponent }

];
