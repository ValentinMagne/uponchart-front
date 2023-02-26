import { Component, OnInit } from '@angular/core';
import { SellerFundsSummaryBusinessModel } from "../../../core/business/seller-funds-summary.business-model";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SellerFundsSummaryState } from "../states/seller-funds-summary.state";
import { FetchSellerFundsSummaryAction } from "../states/fetch-seller-funds-summary.action";

@Component({
  selector: 'app-seller-funds-summary',
  templateUrl: './seller-funds-summary.component.html',
  styleUrls: ['./seller-funds-summary.component.scss']
})
export class SellerFundsSummaryComponent implements OnInit {

  @Select(SellerFundsSummaryState.sellerFundsSummary) funds$!: Observable<SellerFundsSummaryBusinessModel> | null;
  @Select(SellerFundsSummaryState.hasError) error$!: Observable<boolean>;
  @Select(SellerFundsSummaryState.isLoading) loading$!: Observable<boolean>;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(FetchSellerFundsSummaryAction);
  }
}
