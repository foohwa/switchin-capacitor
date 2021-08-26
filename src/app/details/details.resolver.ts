import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DealsService } from '../services/deals/deals.service';
import { catchError, tap } from 'rxjs/operators';
import { Deals } from '../services/deals/deals.model';

@Injectable({
  providedIn: 'root',
})
export class DetailsResolver implements Resolve<Deals> {
  constructor(private dealsService: DealsService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.dealsService
      .getDeal(route.params.id)
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
