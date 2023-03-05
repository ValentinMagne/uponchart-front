import { UserBusinessModel } from "../../business/user.business-model";

export interface AuthStateModel {
  user: UserBusinessModel | null;
  token: string | null;
  username: string | null;
  isLoading: boolean;
}
