import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrl: './new-hero-page.component.css'
})
export class NewHeroPageComponent {
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl(''),
  });

  constructor(private heroesSrv: HeroesService) { };

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesSrv.updateHero(this.currentHero)
        .subscribe(hero => {
          console.log(hero)
        })
        return;
      }

    this.heroesSrv.addHero(this.currentHero)
      .subscribe(hero => {
        console.log(hero)
      })
  }


}
