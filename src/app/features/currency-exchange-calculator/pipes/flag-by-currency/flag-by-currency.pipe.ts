import { Pipe, PipeTransform } from '@angular/core';

import {CurrencyEnum} from "../../enums/currency.enum";
import {CurrencyConfigs} from "../../constants/currencies";
import {FlagEnum} from "../../enums/flag.enum";
import {ICurrencyConfig} from "../../interfaces/currency-config.interface";

@Pipe({
  name: 'flagByCurrency',
  standalone: true
})
export class FlagByCurrencyPipe implements PipeTransform {
  private readonly _currencyConfigs: Record<CurrencyEnum, ICurrencyConfig> = CurrencyConfigs;

  public transform(currency: CurrencyEnum): string {
    const flag: FlagEnum = this._currencyConfigs[currency].flag

    return `assets/icons/flags/${flag}.svg`
  }

}
