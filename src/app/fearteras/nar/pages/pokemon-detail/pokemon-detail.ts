import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetail { 
   // private route = inject(ActivatedRoute);
  //private service = inject(SimpsonSservice);

  //personaje = toSignal(
    //this.route.paramMap.pipe(
      //map(params => +params.get('id')!),
      //switchMap(id => this.service.getCharacterById(id))
    //),
  //  { initialValue: null }
  //);
}
function toSignal(arg0: any, arg1: { initialValue: null; }) {
  throw new Error('Function not implemented.');
}

