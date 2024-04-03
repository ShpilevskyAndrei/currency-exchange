import {CurrencyEnum} from "../enums/currency.enum";

export interface ILatestExchangeBetweenResponse {
  data: Record<CurrencyEnum, number>
}
