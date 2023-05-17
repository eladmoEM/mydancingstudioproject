import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {
    this.form = this.formBuilder.group({
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    // Code to be executed when the component is initialized
  }

  submitForm() {
    if (this.form.valid) {
      // Navigate to the next page
      this.navCtrl.navigateForward('/home');
    }
  }
}
