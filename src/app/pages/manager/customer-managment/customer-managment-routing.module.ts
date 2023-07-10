import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerManagmentPage } from './customer-managment.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerManagmentPage
  },
  {
    path: 'customer-details.component',
    loadChildren: () => import('./customer-details.component/customer-details.component.module').then( m => m.CustomerDetailsComponentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagmentPageRoutingModule {}
