import { createReducer, on } from "@ngrx/store";
import { LoginResponse } from "src/app/_models/authentication/LoginResponse";
import * as UserActions from '../actions/user.actions';

export interface UserState extends LoginResponse {

}

const initialState: UserState = {
    email: null!,
    id: null!,
    roles: null!,
    token: null!,
    username: null!
}

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserActions.userLogin, (state, action): UserState => {
        return {
            ...state,
            id: action.user.id,
            email: action.user.email,
            roles: action.user.roles,
            token: action.user.token,
            username: action.user.username
        }
    })
)