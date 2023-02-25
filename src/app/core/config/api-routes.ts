import { environment } from '../../../environments/environment';

const ebayPrefix = "/ebay";

export const ApiRoutes = {
  me: `${environment.apiUrl}/me`,
  users: `${environment.apiUrl}/users`,
  login: `${environment.apiUrl}/login`,
  ebayToken: `${environment.apiUrl}${ebayPrefix}/token`,
  sellerFundsSummary: `${environment.apiUrl}${ebayPrefix}/sell/finance/seller-funds-summary`
}
