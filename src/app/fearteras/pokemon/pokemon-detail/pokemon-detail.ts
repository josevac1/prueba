import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonsServices } from '../services/Pokemons-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetail { 
 private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(PokemonsServices);

  personaje = toSignal(
    this.route.paramMap.pipe(
      map(params => +params.get('id')!),
      switchMap(id => this.service.getCharacterById(id))
    ),
    { initialValue: null }
  );


  nextPokemon() {
    const currentId = this.personaje()?.id;
    if (currentId) {
      this.router.navigate(['/pokemon-detail', currentId + 1]);
    }
  }

  prevPokemon() {
    const currentId = this.personaje()?.id;
    if (currentId && currentId > 1) {
      this.router.navigate(['/pokemon-detail', currentId - 1]);
    }
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      fire: 'bg-orange-600 border-orange-800',
      water: 'bg-blue-600 border-blue-800',
      grass: 'bg-green-600 border-green-800',
      electric: 'bg-yellow-500 text-black border-yellow-700',
      psychic: 'bg-pink-600 border-pink-800',
      ice: 'bg-cyan-400 border-cyan-600 text-black',
      dragon: 'bg-indigo-600 border-indigo-800',
      dark: 'bg-gray-800 border-gray-600',
      fairy: 'bg-pink-300 border-pink-500 text-black',
      normal: 'bg-gray-400 border-gray-600 text-black',
      fighting: 'bg-red-800 border-red-950',
      flying: 'bg-sky-300 border-sky-500 text-black',
      poison: 'bg-purple-600 border-purple-800',
      ground: 'bg-yellow-700 border-yellow-900',
      rock: 'bg-yellow-800 border-yellow-950',
      bug: 'bg-lime-600 border-lime-800',
      ghost: 'bg-purple-900 border-purple-950',
      steel: 'bg-gray-500 border-gray-700'
    };
    return colors[type] || 'bg-gray-500 border-gray-700';
  }
}

