import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { FetchSellerFundsSummaryAction } from "./fetch-seller-funds-summary.action";
import { SellerFundsSummaryStateModel } from "./seller-funds-summary.state-model";
import { EbayService } from "../../../core/services/ebay.service";
import { SellerFundsSummaryBusinessModel } from "../../../core/business/seller-funds-summary.business-model";

@State<SellerFundsSummaryStateModel>({
  name: 'seller',
  defaults: {
    businessModel: null,
  }
})
@Injectable()
export class SellerFundsSummaryState {

  @Selector()
  static sellerFundsSummary(state: SellerFundsSummaryStateModel): SellerFundsSummaryBusinessModel | null {
    return state.businessModel;
  }

  constructor(private ebayService: EbayService) {
  }

  @Action(FetchSellerFundsSummaryAction)
  fetchSellerFundsSummary(ctx: StateContext<SellerFundsSummaryStateModel>) {
    return this.ebayService.getSellerFundsSummary().pipe(
      tap((business: SellerFundsSummaryBusinessModel) => {
        ctx.patchState({
          businessModel: business
        })
      })
    )
  }
}
