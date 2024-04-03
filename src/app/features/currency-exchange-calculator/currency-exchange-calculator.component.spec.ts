import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyExchangeCalculatorComponent } from './currency-exchange-calculator.component';

describe('CuppencyExchangeCalculatorComponent', () => {
  let component: CurrencyExchangeCalculatorComponent;
  let fixture: ComponentFixture<CurrencyExchangeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyExchangeCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyExchangeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
