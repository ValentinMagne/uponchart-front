export interface AuthStateModel {
  token: string | null;
  username: string | null;
  isLoading: boolean;
  hasError: boolean;
}
