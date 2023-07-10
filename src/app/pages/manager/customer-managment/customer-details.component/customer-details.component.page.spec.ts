import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetailsComponentPage } from './customer-details.component.page';

describe('CustomerDetailsComponentPage', () => {
  let component: CustomerDetailsComponentPage;
  let fixture: ComponentFixture<CustomerDetailsComponentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
