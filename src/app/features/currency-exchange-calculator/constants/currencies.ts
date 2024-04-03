import {CurrencyEnum} from "../enums/currency.enum";
import {ICurrencyConfig} from "../interfaces/currency-config.interface";
import {FlagEnum} from "../enums/flag.enum";

export const CurrencyConfigs: Record<CurrencyEnum, ICurrencyConfig> = {
  [CurrencyEnum.RUB]: {
    sign: CurrencyEnum.RUB,
    flag: FlagEnum.Rus,
    title: 'Российский рубль'
  },
  [CurrencyEnum.EUR]: {
    sign: CurrencyEnum.EUR,
    flag: FlagEnum.Eur,
    title: 'Евро'
  },
  [CurrencyEnum.USD]: {
    sign: CurrencyEnum.USD,
    flag: FlagEnum.Usa,
    title: 'Доллар США'
  },
  [CurrencyEnum.GBP]: {
    sign: CurrencyEnum.GBP,
    flag: FlagEnum.Eng,
    title: 'Фунт стерлингов'
  },
}
