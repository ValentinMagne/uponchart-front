export interface UserBusinessModel {
  id: string;
  login: string;
  authorities: string[];
  consented: boolean;
  fund: Test;
}

interface Test {
  value: string;
  currency: string;
}
