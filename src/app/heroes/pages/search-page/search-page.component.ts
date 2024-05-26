import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  public heroForm = new FormControl;
  public heroes: Hero[] = [];

  constructor(private heroesSrv: HeroesService, private router: Router) {};

  searchHero() {
    const value: string = this.heroForm.value || '';

    this.heroesSrv.getSuggestions(value).subscribe((value) => {
      console.log(value)
      this.heroes = value;
    });
  };

  goToDetails(event: MatAutocompleteSelectedEvent) {
    this.router.navigateByUrl(`/heroes/${event.option.value.id}`)
  }
}
