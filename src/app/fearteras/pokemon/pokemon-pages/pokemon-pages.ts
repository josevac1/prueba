import { ChangeDetectionStrategy, Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonsServices } from '../services/Pokemons-services';
import { HeroPokemon } from '../hero-pokemon/hero-pokemon';



@Component({
  selector: 'app-pokemon-pages',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroPokemon],
  templateUrl: './pokemon-pages.html',
  styleUrls: ['./pokemon-pages.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPages {
  private pokemonService = inject(PokemonsServices);

  charactersPerPage = signal<number>(20);
  currentPage = signal<number>(1);
  totalPages = signal(0);
  
    pokemonResource = signal<{ count: number; results: any[] } | null>(null);
  loading = signal(false);
  
  private currentSub: Subscription | null = null;

  constructor() {
    effect(() => {
      const page = this.currentPage(); 
      const limit = this.charactersPerPage();
      const offset = (page - 1) * limit;

      if (this.currentSub) this.currentSub.unsubscribe();
      this.loading.set(true);

      this.currentSub = this.pokemonService.getCharactersOptions({ offset, limit }).subscribe({
        next: (res) => {
          console.log('Datos recibidos:', res); 
          this.pokemonResource.set(res);
          const total = Math.ceil(res.count / limit) || 1;
          this.totalPages.set(total);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        }
      });
    });
  }

  next() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }

  prev() {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }

  pokemonId(url: string): string {
    if (!url) return '';
    const parts = url.split('/');
    return parts[parts.length - 2] || parts[parts.length - 1];
  }
}