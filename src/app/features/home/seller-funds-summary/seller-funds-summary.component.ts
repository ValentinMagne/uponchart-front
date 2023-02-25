import { Component, OnInit } from '@angular/core';
import { EbayService } from "../../../core/services/ebay.service";
import { SellerFundsSummaryBusinessModel } from "../../../core/business/seller-funds-summary.business-model";

@Component({
  selector: 'app-seller-funds-summary',
  templateUrl: './seller-funds-summary.component.html',
  styleUrls: ['./seller-funds-summary.component.scss']
})
export class SellerFundsSummaryComponent implements OnInit {

  public funds?: SellerFundsSummaryBusinessModel;

  constructor(private ebayService: EbayService) {
  }

  public ngOnInit(): void {
    this.ebayService.getSellerFundsSummary().subscribe((data: SellerFundsSummaryBusinessModel) => {
      this.funds = data;
    })
  }
}
