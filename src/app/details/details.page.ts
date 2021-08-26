import { Component, OnInit } from '@angular/core';
import { Deals } from '../services/deals/deals.model';
import { DealsService } from '../services/deals/deals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  deal: Deals;

  constructor(
    private dealsService: DealsService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateRoute.data.subscribe((data: { details: Deals }) => {
      console.log(data);
      this.deal = data.details;
    });
  }
}
