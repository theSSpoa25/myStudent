import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { pushTokenReducer, PushTokenState } from "./push-token.reducer";
import { userReducer, UserState } from "./user.reducer";


export interface IAppState {
    user: UserState,
    pushToken: PushTokenState
}

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer,
    pushToken: pushTokenReducer
}

export function localStorageSyncReducer(reducer:ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            'user',
            'pushToken'
        ],
        rehydrate: true
    })(reducer);
}

export const metaReducers: MetaReducer<IAppState>[] = [localStorageSyncReducer];
