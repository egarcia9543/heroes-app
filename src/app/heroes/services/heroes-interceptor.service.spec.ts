import { TestBed } from '@angular/core/testing';

import { HeroesInterceptorService } from './heroes-interceptor.service';

describe('HeroesInterceptorService', () => {
  let service: HeroesInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
