import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerManagmentPage } from './customer-managment.page';

describe('CustomerManagmentPage', () => {
  let component: CustomerManagmentPage;
  let fixture: ComponentFixture<CustomerManagmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerManagmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
