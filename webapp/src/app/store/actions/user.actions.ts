import { createAction, props } from "@ngrx/store";
import { LoginResponse } from '../../_models/authentication/LoginResponse';

export const userLogin = createAction(
    '[User Action] User Login',
    props<{user: LoginResponse}>()
)