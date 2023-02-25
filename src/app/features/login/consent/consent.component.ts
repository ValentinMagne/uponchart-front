import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "../../../core/config/api-routes";
import { Logout } from "../../../core/auth/logout";
import { Store } from "@ngxs/store";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-consent",
  templateUrl: "./consent.component.html",
  styleUrls: ["./consent.component.scss"]
})
export class ConsentComponent implements OnInit {
  public consent = false;
  private static readonly REDIRECT_URI = environment.ebayRedirectURI;
  private static readonly APP_ID = environment.ebayAppId;

  constructor(private store: Store, private activatedRoute: ActivatedRoute, private http: HttpClient) {
  }

  public ngOnInit(): void {
    const oAuthConsentCode: string = this.activatedRoute.snapshot.queryParams["code"];
    if (oAuthConsentCode) {
      this.consent = true;
      this.exchangeAuthCodeForUserAccessToken(oAuthConsentCode);
    }
  }

  public redirectToConsent(): void {
    const responseType = "code";
    const scope = "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.order.readonly https://api.ebay.com/oauth/api_scope/buy.guest.order https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly https://api.ebay.com/oauth/api_scope/buy.shopping.cart https://api.ebay.com/oauth/api_scope/buy.offer.auction https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.item.draft https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/sell.item https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly";
    window.location.href = `https://auth.sandbox.ebay.com/oauth2/authorize?client_id=${ConsentComponent.APP_ID}&redirect_uri=${ConsentComponent.REDIRECT_URI}&response_type=${responseType}&scope=${scope}`;
  }

  private exchangeAuthCodeForUserAccessToken(authCode: string): void {
    this.http.post(ApiRoutes.ebayToken, {token: authCode}).subscribe();
  }

  public logout(): void {
    this.store.dispatch(Logout);
  }
}
