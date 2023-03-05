import { environment } from '../../../environments/environment';

const ebayPrefix = "/ebay";

export const ApiRoutes = {
  ebayToken: `${environment.apiUrl}${ebayPrefix}/token`,
  login: `${environment.apiUrl}/login`,
  me: `${environment.apiUrl}/me`,
  register: `${environment.apiUrl}/register`,
  sellerFundsSummary: `${environment.apiUrl}${ebayPrefix}/sell/finance/seller-funds-summary`,
  users: `${environment.apiUrl}/users`
}
