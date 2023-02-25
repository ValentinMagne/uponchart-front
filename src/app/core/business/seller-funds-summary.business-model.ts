export interface SellerFundsSummaryBusinessModel {
  totalFunds: Fund;
  processingFunds: Fund;
  availableFunds: Fund;
  fundsOnHold: Fund;
}

interface Fund {
  value: string;
  currency: string;
}
