import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-managment',
  templateUrl: './customer-managment.page.html',
  styleUrls: ['./customer-managment.page.scss'],
})
export class CustomerManagmentPage implements OnInit {
  customers: any[] = [];

  constructor() { }

  ngOnInit() {
    this.customers = [
      {
        parentsNames: 'John and Jane Doe',
        username: 'jdoe',
        password: 'password123',
        email: 'jdoe@example.com',
        phoneNumber: '1234567890',
        numberOfChildren: 2,
        childName: 'Child Name',
        childID: '1',
        gender: 'Male',
        courseType: 'Type1',
        birthdate: '2005-01-01',
        teacher: 'Teacher Name'
      }
    ];
  }

}
