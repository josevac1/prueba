import { Routes } from '@angular/router';
import { InicioDeSeccion } from './fearteras/nar/pages/inicioDeSeccion/inicioDeSeccion ';
import { Home } from './fearteras/nar/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: InicioDeSeccion,
  },
  {
    path: 'home',
    component: Home,
  },
];
