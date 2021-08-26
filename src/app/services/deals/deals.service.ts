import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Deals } from './deals.model';
import { HttpClient } from '@angular/common/http';

const deals: Deals[] = [
  {
    id: 'asd02k03k',
    recommended: true,
    favourite: false,
    category: 'experience',
    title: 'Grab Your Tea Products with 10% OFF',
    merchant: 'Leaf Lohas Concept',
    description:
      'A cup of good tea must have good quality tea products! What are you waiting for? Faster to Grab it!',
    discountedPrice: '300',
    originalPrice: '500',
    views: '120',
  },
  {
    id: 'asd02k03k',
    recommended: true,
    favourite: false,
    category: 'experience',
    title: 'Grab Your Tea Products with 10% OFF',
    merchant: 'Leaf Lohas Concept',
    description:
      'A cup of good tea must have good quality tea products! What are you waiting for? Faster to Grab it!',
    discountedPrice: '300',
    originalPrice: '500',
    views: '120',
  },
  {
    id: 'asd02k03k',
    recommended: true,
    favourite: false,
    category: 'experience',
    title: 'Grab Your Tea Products with 10% OFF',
    merchant: 'Leaf Lohas Concept',
    description:
      'A cup of good tea must have good quality tea products! What are you waiting for? Faster to Grab it!',
    discountedPrice: '300',
    originalPrice: '500',
    views: '120',
  },
  {
    id: 'asd02k03k',
    recommended: true,
    favourite: false,
    category: 'experience',
    title: 'Grab Your Tea Products with 10% OFF',
    merchant: 'Leaf Lohas Concept',
    description:
      'A cup of good tea must have good quality tea products! What are you waiting for? Faster to Grab it!',
    discountedPrice: '300',
    originalPrice: '500',
    views: '120',
  },
];

@Injectable({
  providedIn: 'root',
})
export class DealsService {
  private _deals = new BehaviorSubject<Deals[]>(deals);

  constructor(private httpClient: HttpClient) {}

  get deals() {
    return this._deals.asObservable();
  }

  getDeal(slug: string): Observable<Deals> {
    return this._deals.pipe(
      take(1),
      map((next) => {
        return next.find((data) => data.id === slug);
      })
    );
  }

  favouriteDeals() {
    return this.httpClient.get('https://api.publicapis.org/entries');
  }
}
