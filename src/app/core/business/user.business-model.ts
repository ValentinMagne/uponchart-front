export interface UserBusinessModel {
  id: string;
  login: string;
  authorities: string[];
  consented: boolean;
}
