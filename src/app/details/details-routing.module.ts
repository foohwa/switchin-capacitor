import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsPage } from './details.page';
import { DetailsResolver } from './details.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: DetailsPage,
    resolve: {
      details: DetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPageRoutingModule {}
