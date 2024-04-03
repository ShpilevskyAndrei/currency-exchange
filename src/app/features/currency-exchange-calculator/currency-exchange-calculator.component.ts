import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {BackButtonComponent} from "../../shared/components/back-button/back-button.component";
import {CurrencyConfigs} from "./constants/currencies";
import {CurrencyService} from "./services/currency.service";
import {CurrencyEnum} from "./enums/currency.enum";
import {ILatestExchangeBetweenRequest} from "./interfaces/latest-exchange-between-request.interface";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  Observable,
  of,
  skip,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {EnumToArrayPipe} from "../../shared/pipes/enum-to-array/enum-to-array.pipe";

@Component({
  selector: 'app-currency-exchange-calculator',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, ReactiveFormsModule, EnumToArrayPipe],
  templateUrl: './currency-exchange-calculator.component.html',
  styleUrl: './currency-exchange-calculator.component.scss'
})
export class CurrencyExchangeCalculatorComponent implements OnInit {
  public currencyExchangeForm!: FormGroup;

  public rate$: Observable<number> = of(0);

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _currencyService = inject(CurrencyService);

  protected readonly currencyConfigs = CurrencyConfigs;
  protected readonly currencies = CurrencyEnum;

  public ngOnInit(): void {
    this.initCurrencyExchangeForm();
    this.trackCurrencies();
    this.trackToValue();
    //this.trackFromValue();
    this.getExchange();
  }

  private trackFromValue(): void {
    this.currencyExchangeForm.controls['toValue'].valueChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap(value => {
        if (this.rate$) {
          return this.rate$.pipe(
            map(rate => {
              this.calcFromValue(rate);
              return value;
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe();
  }

  private trackToValue(): void {
    combineLatest([
      this.currencyExchangeForm.controls['fromValue'].valueChanges.pipe(
        startWith(this.currencyExchangeForm.controls['fromValue'].value),
        map(value => typeof value === 'number' ? value : null)
      ),
      this.rate$!.pipe(startWith(null))
    ]).pipe(
      takeUntilDestroyed(this._destroyRef),
      map(([fromValue, rate]) => ({ fromValue, rate }))
    ).subscribe(({ fromValue, rate }) => {
      if (rate !== null) {
        this.calcToValue(fromValue, rate);
      }
    });
  }

  private trackCurrencies(): void {
    merge(
      this.currencyExchangeForm.controls['fromCurrency'].valueChanges,
      this.currencyExchangeForm.controls['toCurrency'].valueChanges
    ).pipe(
      takeUntilDestroyed(this._destroyRef)
    ).subscribe((): void => {
      this.getExchange();
    });
  }

  private calcToValue(fromValue: number | null, rate: number): void {
    this.currencyExchangeForm.controls['toValue'].setValue(
      fromValue ? fromValue * rate : 0
    )
  }

  private calcFromValue(rate: number): void {
    this.currencyExchangeForm.controls['fromValue']?.setValue(
      this.currencyExchangeForm.controls['toValue']?.value / rate
    )
  }

  private initCurrencyExchangeForm(): void {
    this.currencyExchangeForm = new FormGroup({
      fromCurrency: new FormControl(CurrencyEnum.USD),
      fromValue: new FormControl(1),
      toCurrency: new FormControl(CurrencyEnum.EUR),
      toValue: new FormControl(),
    })
  }

  private getExchange(): void {
    const reqQueryParams: Partial<ILatestExchangeBetweenRequest> = {
      base_currency: this.currencyExchangeForm.controls['fromCurrency']?.value,
      currencies: this.currencyExchangeForm.controls['toCurrency']?.value
    }

    this.rate$ = this._currencyService.getLatestExchangeBetween(reqQueryParams).pipe(takeUntilDestroyed(this._destroyRef))

    this.rate$.subscribe()
  }
}
