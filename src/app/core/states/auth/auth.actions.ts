import { LoginFormModel } from "../../../features/login/models/login-form.model";
import { RegisterFormModel } from "../../../features/login/models/register-form.model";

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload: LoginFormModel) {
  }
}

export class Register {
  static readonly type = '[Auth] Register';

  constructor(public payload: RegisterFormModel) {
  }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class FetchUser {
  static readonly type = '[User] Fetch User';
}
