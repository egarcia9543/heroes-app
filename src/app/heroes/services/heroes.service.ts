import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;
  constructor(private httpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=4`)
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Id requerido')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError(err => of(false)),
      map(resp => true)
    )
  }
}
