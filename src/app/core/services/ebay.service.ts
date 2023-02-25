import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SellerFundsSummaryBusinessModel } from "../business/seller-funds-summary.business-model";
import { ApiRoutes } from "../config/api-routes";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class EbayService {

  constructor(private http: HttpClient) {
  }

  public getSellerFundsSummary(): Observable<SellerFundsSummaryBusinessModel> {
    return this.http.get<SellerFundsSummaryBusinessModel>(ApiRoutes.sellerFundsSummary);
  }
}
