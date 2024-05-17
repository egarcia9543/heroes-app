import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interfaces';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_image) {
      return 'assets/no-image.png';
    }

    return hero.alt_image ? hero.alt_image : `assets/heroes/${hero.id}.jpg`;
  }

}
