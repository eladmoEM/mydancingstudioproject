import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerManagmentPage } from './customer-managment.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagmentPageRoutingModule {}
