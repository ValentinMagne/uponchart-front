import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs";
import { SellerFundsSummaryStateModel } from "./seller-funds-summary.state-model";
import { EbayService } from "../../../core/services/ebay.service";
import { SellerFundsSummaryBusinessModel } from "../../../core/business/seller-funds-summary.business-model";
import { FetchSellerFundsSummary } from "./seller-funds-summary.actions";

@State<SellerFundsSummaryStateModel>({
  name: 'seller',
  defaults: {
    loading: false,
    error: false,
    businessModel: null,
  }
})
@Injectable()
export class SellerFundsSummaryState {

  @Selector()
  static sellerFundsSummary(state: SellerFundsSummaryStateModel): SellerFundsSummaryBusinessModel | null {
    return state.businessModel;
  }

  @Selector()
  static hasError(state: SellerFundsSummaryStateModel): boolean {
    return state.error;
  }

  @Selector()
  static isLoading(state: SellerFundsSummaryStateModel): boolean {
    return state.loading;
  }

  constructor(private ebayService: EbayService) {
  }

  @Action(FetchSellerFundsSummary)
  fetchSellerFundsSummary(ctx: StateContext<SellerFundsSummaryStateModel>) {
    ctx.patchState({
      loading: true,
      error: false,
      businessModel: null
    })
    return this.ebayService.getSellerFundsSummary().pipe(
      tap((business: SellerFundsSummaryBusinessModel) => {
        ctx.patchState({
          loading: false,
          error: false,
          businessModel: business
        })
      }),
      catchError((err) => {
        ctx.patchState({
          loading: false,
          error: true,
          businessModel: null,
        })
        throw err;
      })
    )
  }
}
