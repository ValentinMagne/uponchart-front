import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFundsSummaryComponent } from './seller-funds-summary.component';

describe('SellerFundsSummaryComponent', () => {
  let component: SellerFundsSummaryComponent;
  let fixture: ComponentFixture<SellerFundsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerFundsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerFundsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
