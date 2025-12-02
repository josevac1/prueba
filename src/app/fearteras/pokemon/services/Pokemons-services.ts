import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CharacterDetail, Options } from '../interfaces/interfaces';


export type SimpsonsResponse = Response;
export type SimpsonsCharacterDetail = CharacterDetail;

@Injectable({
  providedIn: 'root'
})
export class PokemonsServices {
 private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  getCharacters(page: number = 1): Observable<any> {
    // PokeAPI no usa 'page', usa 'offset' y 'limit'
    const offset = (page - 1) * 20;
    return this.http.get<Response>(`${this.API_URL}api/v2/pokemon?offset=${offset}&limit=20`).pipe(
      map(res => res),
      catchError(err => {
        console.error('Error al obtener pokémons', err);
        return of({ count: 0, next: null, prev: null, pages: 0, results: [] });
      })
    );
  }
  getCharacterById(id: number): Observable<CharacterDetail | null> {
    return this.http.get<CharacterDetail>(`${this.API_URL}api/v2/pokemon/${id}`).pipe(
      catchError(err => {
        console.error('Pokémon no encontrado', err);
        return of(null);
      })
    );
  }

  getCharactersOptions(options: Options): Observable<any> {
    // PokeAPI endpoint: /api/v2/pokemon?offset=0&limit=20
    return this.http.get<Response>(`${this.API_URL}api/v2/pokemon?offset=${options.offset}&limit=${options.limit}`).pipe(
      delay(500),
      map(res => res),
      catchError(err => {
        console.error('Error al obtener pokémons', err);
        return of({ count: 0, next: null, prev: null, pages: 0, results: [] });
      })
    );
  }
 
  constructor() { 
  
  }

}
