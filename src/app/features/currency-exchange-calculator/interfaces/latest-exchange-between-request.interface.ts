import {CurrencyEnum} from "../enums/currency.enum";

export interface ILatestExchangeBetweenRequest {
  apikey: string;
  base_currency: CurrencyEnum;
  currencies: CurrencyEnum;
}
