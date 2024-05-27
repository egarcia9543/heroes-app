import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrl: './new-hero-page.component.css'
})
export class NewHeroPageComponent implements OnInit {
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];
  public isEditing: boolean = false;

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl(''),
  });

  constructor(private heroesSrv: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { };

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.isEditing = true;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.heroesSrv.getHeroById(id).subscribe(hero => {
          if (!hero) {
            return this.router.navigateByUrl('/');
          }
          this.heroForm.patchValue({
            id: hero?.id,
            superhero: hero?.superhero,
            publisher: hero?.publisher,
            alter_ego: hero?.alter_ego,
            first_appearance: hero?.first_appearance,
            characters: hero?.characters,
            alt_image: hero?.alt_image
          });
          return;
        })
      }
    }
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesSrv.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`Excelente, ${hero.superhero} ha sido actualizado correctamente`)
        })
      return;
    }

    this.heroesSrv.addHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar(`Excelente, ${hero.superhero} ha sido agregado correctamente`);
        this.router.navigateByUrl(`/heroes/edit/${hero.id}`);
      })
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Listo', {
      duration: 3000
    });
  }
}
