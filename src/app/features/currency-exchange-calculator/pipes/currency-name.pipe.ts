import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyEnum} from "../enums/currency.enum";
import {CurrencyConfigs} from "../constants/currencies";

@Pipe({
  name: 'currencyName',
  standalone: true
})
export class CurrencyNamePipe implements PipeTransform {
  private readonly _currencyConfigs = CurrencyConfigs;

  public transform(value: CurrencyEnum): string {
    return this._currencyConfigs[value].title
  }
}
