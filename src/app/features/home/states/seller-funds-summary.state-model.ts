import { SellerFundsSummaryBusinessModel } from "../../../core/business/seller-funds-summary.business-model";

export interface SellerFundsSummaryStateModel {
  loading: boolean;
  error: boolean;
  businessModel: SellerFundsSummaryBusinessModel | null;
}
