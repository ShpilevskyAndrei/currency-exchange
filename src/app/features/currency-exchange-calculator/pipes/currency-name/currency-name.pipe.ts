import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyEnum} from "../../enums/currency.enum";
import {CurrencyConfigs} from "../../constants/currencies";
import {ICurrencyConfig} from "../../interfaces/currency-config.interface";

@Pipe({
  name: 'currencyName',
  standalone: true
})
export class CurrencyNamePipe implements PipeTransform {
  private readonly _currencyConfigs: Record<CurrencyEnum, ICurrencyConfig> = CurrencyConfigs;

  public transform(currency: CurrencyEnum): string {
    return this._currencyConfigs[currency].title
  }
}
