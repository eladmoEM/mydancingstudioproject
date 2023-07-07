import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CheckboxCustomEvent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @ViewChild('registrationForm', { static: false })
  registrationForm!: NgForm;
  parentNames: string = '';
  username: string = '';
  password: string = '';
  cpassword: string = '';
  email: string = '';
  phoneNumber: string = '';
  numberOfChildren: number = 0;
  children: any[] = [];
  childinfo: any[] = [];
  childName: string = '';
  courseType: string = '';
  childID: string = '';
  birthdate = new Date().toISOString();
  gender: string = '';
  disableSelector1 = false;
  disableSelector2 = false;
  disableSelector3 = false;
  disableSelector4 = false;
  canDismiss = false;
  presentingElement: Element | null = null;
  isContinueButtonVisible = false;
  isContinueButtonNoNVisible = true;
  
  

  

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private navCtrl: NavController,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  goToLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

  onTermsChanged(event: Event) {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }

  dismissModal() {
    this.isContinueButtonVisible = true;
    this.isContinueButtonNoNVisible = false;
    this.modalController.dismiss();
  }



  async onClick() {
    
    if (this.registrationForm.valid) {
      // The form is valid, so you can submit it to the server or do other actions
    } else {
      // The form is invalid, so display an error message to the user
      const alert = await this.alertController.create({
        header: 'שגיאה',
        message: 'בבקשה מלא את כל הפרטים',
        buttons: ['אישור']
      });
      await alert.present();
      return;
    }
  

    // Check if password and confirm password match
    if (this.password !== this.cpassword) {
      const alert = await this.alertController.create({
        header: 'שגיאה',
        message: 'סיסמאות לא תואמות.',
        buttons: ['אישור'],
      });
      await alert.present();
      return;
    }

 
      const formData = {
        parentNames: this.parentNames,
        username: this.username,
        password: this.password,
        cpassword: this.cpassword,
        email: this.email,
        phoneNumber: this.phoneNumber,
        numberOfChildren: this.numberOfChildren,
        children: this.children.map(child => ({
          childID: child.childID,
          childName: child.childName,
          birthdate: child.birthdate,
          disableSelector1: child.disableSelector1,
          disableSelector2: child.disableSelector2,
          disableSelector3: child.disableSelector3,
          disableSelector4: child.disableSelector4,
          gender: child.gender,
          courseType: child.courseType
        }))
      };

      
 
  
      //post for Database
    this.http.post('http://localhost:3000/api/register', formData)
      .subscribe((response: any) => {
        console.log(response);
        const alert = this.alertController.create({
          header: 'Success!',
          message: 'User registered successfully!',
          buttons: ['OK']
        });
        alert.then((res) => {
          res.present();
          this.router.navigate(['/payment']);
        });
      }, (error: any) => {
        console.log(error);
        const alert = this.alertController.create({
          header: 'Error',
          message: 'An error occurred. Please try again later.',
          buttons: ['OK']
        });
        alert.then((res) => {
          res.present();
        });
      });

  }
  
  //This method adding more details for each child
  onNumberOfChildrenChange() {
    if (this.numberOfChildren <= 0) {
      this.children = [];
      return;
    }
    const diff = this.numberOfChildren - this.children.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.children.push({ 
          childName: '', 
          childID: '', 
          birthdate: new Date(),
          gender: '', 
          courseType: ''
        });
      }
    } else if (diff < 0) {
      this.children = this.children.slice(0, this.numberOfChildren);
    }
  }
  //This method sorting to courses by age
  ionChanger() {
    const year = new Date().getFullYear();
    this.children.forEach(child => {
      const birthdate = new Date(child.birthdate).getFullYear();
      const age = year - birthdate;
  
      if (age >= 6 && age <= 9) {
        child.disableSelector2 = true;
        child.disableSelector4 = true;
        child.disableSelector1 = false;
        child.disableSelector3 = false;
      } else if (age >= 9 && age <= 17) {
        child.disableSelector1 = true;
        child.disableSelector3 = true;
        child.disableSelector2 = false;
        child.disableSelector4 = false;
      } else {
        child.disableSelector1 = false;
        child.disableSelector2 = false;
        child.disableSelector3 = false;
        child.disableSelector4 = false;
      }
    });
  }
}