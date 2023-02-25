import { environment } from '../../../environments/environment';

export const ApiRoutes = {
  me: `${environment.apiUrl}/me`,
  users: `${environment.apiUrl}/users`,
  login: `${environment.apiUrl}/login`,
  ebayToken: `${environment.apiUrl}/ebay/token`,
  sellerFundsSummary: `${environment.apiUrl}/ebay/sell/finance/seller-funds-summary`
}
