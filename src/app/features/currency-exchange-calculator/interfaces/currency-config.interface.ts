import {CurrencyEnum} from "../enums/currency.enum";
import {FlagEnum} from "../enums/flag.enum";

export interface ICurrencyConfig {
  sign: CurrencyEnum;
  flag: FlagEnum;
  title: string;
}
