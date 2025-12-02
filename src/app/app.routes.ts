import { Routes } from '@angular/router';
import { PokemonPages } from './fearteras/pokemon/pokemon-pages/pokemon-pages';
import { PokemonDetail } from './fearteras/pokemon/pokemon-detail/pokemon-detail';
import { InicioDeSeccion } from './fearteras/nar/pages/inicioDeSeccion/inicioDeSeccion';


export const routes: Routes = [
  {
    path: '',
    component: InicioDeSeccion,
  },

  {
    path: 'pokemon',
    component: PokemonPages,
  },

  {
    path: 'pokemon-detail/:id',
    component: PokemonDetail,
  },
];
