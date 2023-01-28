import { FormLoginModel } from "../models/form-login.model";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: FormLoginModel) {}
}
