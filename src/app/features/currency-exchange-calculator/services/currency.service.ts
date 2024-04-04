import {inject, Injectable} from '@angular/core';
import { HttpParams } from '@angular/common/http';

import {map, Observable} from "rxjs";

import {RequestService} from "../../../core/services/request/request.service";
import {CURRENCY_API_KEY} from "../../../core/constants/currency-freaks-api-key";
import {ILatestExchangeBetweenRequest} from "../interfaces/latest-exchange-between-request.interface";
import {ILatestExchangeBetweenResponse} from "../interfaces/latest-exchange-between-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly _api = 'https://api.freecurrencyapi.com/v1';
  private readonly _endpoints = {
    convertLatest: 'latest'
  }

  private readonly _http = inject(RequestService);

  public getLatestExchangeBetween(queryObj: Partial<ILatestExchangeBetweenRequest>): Observable<number> {
    const queryObjWithApiKey: ILatestExchangeBetweenRequest = this.modifyQueryObj(queryObj);
    const params: HttpParams = new HttpParams({ fromObject: { ...queryObjWithApiKey } });

    return this._http.get<ILatestExchangeBetweenResponse>(this._api, this._endpoints.convertLatest, params)
      .pipe(
        map((response: ILatestExchangeBetweenResponse): any => {
          return response.data[queryObj.currencies!]
        })
      )
  }

  private modifyQueryObj(queryObj: Partial<ILatestExchangeBetweenRequest>): ILatestExchangeBetweenRequest {
    return {
      ...queryObj,
      apikey: CURRENCY_API_KEY
    } as ILatestExchangeBetweenRequest;
  }
}
