import { Component, OnInit, Input } from '@angular/core'; // Import Input
import { ModalController } from '@ionic/angular'; // Import ModalController

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.page.html',
  styleUrls: ['./customer-details.component.page.scss'],
})
export class CustomerDetailsComponentPage implements OnInit {

  @Input() customer: any; // Add Input decorator for customer
  
  constructor(public modalController: ModalController) { } // Inject ModalController

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss(); // To close the modal
  }

}
