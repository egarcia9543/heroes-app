import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent implements OnInit {
  @Input() hero!: Hero;

  ngOnInit(): void {
    if(!this.hero) {
      throw new Error('Hero is required');
    }
  }
}
