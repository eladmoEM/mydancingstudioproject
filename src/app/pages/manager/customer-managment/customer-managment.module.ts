import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerManagmentPageRoutingModule } from './customer-managment-routing.module';

import { CustomerManagmentPage } from './customer-managment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerManagmentPageRoutingModule
  ],
  declarations: [CustomerManagmentPage]
})
export class CustomerManagmentPageModule {}
