import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BackButtonComponent} from "../../shared/components/back-button/back-button.component";
import {CurrencyService} from "./services/currency.service";
import {CurrencyEnum} from "./enums/currency.enum";
import {ILatestExchangeBetweenRequest} from "./interfaces/latest-exchange-between-request.interface";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  combineLatest, Observable, of,
  startWith, switchMap,
  take,
} from "rxjs";
import {EnumToArrayPipe} from "../../shared/pipes/enum-to-array/enum-to-array.pipe";
import {CurrencyNamePipe} from "./pipes/currency-name.pipe";

@Component({
  selector: 'app-currency-exchange-calculator',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, ReactiveFormsModule, EnumToArrayPipe, CurrencyNamePipe],
  templateUrl: './currency-exchange-calculator.component.html',
  styleUrl: './currency-exchange-calculator.component.scss'
})
export class CurrencyExchangeCalculatorComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _currencyService = inject(CurrencyService);

  public currencyForm: FormGroup = this.initCurrencyExchangeForm();

  public rate = 0;

  protected readonly currencies = CurrencyEnum;

  public ngOnInit(): void {
    //this.trackCurrencies(); //TODO. return
  }

  public calculateToAmount(): void {
    const fromAmount = this.currencyForm.controls['fromAmount'].value;
    this.currencyForm.controls['toAmount'].setValue((fromAmount * this.rate).toFixed(6));
  }

  public calculateFromAmount(): void {
    const toAmount = this.currencyForm.controls['toAmount'].value;
    this.currencyForm.controls['fromAmount'].setValue((toAmount / this.rate).toFixed(6));
  }

  public switchCurrencies(): void {
    const fromCurrency = this.currencyForm.controls['fromCurrency'].value
    const toCurrency = this.currencyForm.controls['toCurrency'].value

    this.currencyForm.patchValue({
      toCurrency: fromCurrency,
      fromCurrency: toCurrency
    })

    this.calculateToAmount();
  }

  private trackCurrencies(): void {
    combineLatest([
      this.currencyForm.controls['fromCurrency'].valueChanges
        .pipe(startWith(this.currencyForm.controls['fromCurrency'].value)),
      this.currencyForm.controls['toCurrency'].valueChanges
        .pipe(startWith(this.currencyForm.controls['toCurrency'].value))
    ])
      .pipe(
        switchMap(() => {
          return this.updateRateAndToAmount().pipe(take(1));
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }

  private updateRateAndToAmount(): Observable<void> {
    const reqQueryParams: Partial<ILatestExchangeBetweenRequest> = {
      base_currency: this.currencyForm.controls['fromCurrency'].value,
      currencies: this.currencyForm.controls['toCurrency'].value
    };

    return this._currencyService.getLatestExchangeBetween(reqQueryParams)
      .pipe(
        switchMap((rate: number) => {
          this.rate = rate;
          this.calculateToAmount();

          return of();
        }),
        take(1)
      );
  }

  private initCurrencyExchangeForm(): FormGroup {
    return new FormGroup({
      fromCurrency: new FormControl(CurrencyEnum.USD),
      fromAmount: new FormControl(1, [Validators.pattern(/^\d*\.?\d+$/)]),
      toCurrency: new FormControl(CurrencyEnum.EUR),
      toAmount: new FormControl(0, [Validators.pattern(/^\d*\.?\d+$/)]),
    })
  }
}
