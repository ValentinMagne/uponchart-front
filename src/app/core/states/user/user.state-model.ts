import { UserBusinessModel } from "../../business/user.business-model";

export interface UserStateModel {
  user: UserBusinessModel | null;
}
