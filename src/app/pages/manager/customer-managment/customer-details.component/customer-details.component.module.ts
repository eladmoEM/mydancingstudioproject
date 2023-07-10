import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDetailsComponentPageRoutingModule } from './customer-details.component-routing.module';

import { CustomerDetailsComponentPage } from './customer-details.component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDetailsComponentPageRoutingModule
  ],
  declarations: [CustomerDetailsComponentPage]
})
export class CustomerDetailsComponentPageModule {}
