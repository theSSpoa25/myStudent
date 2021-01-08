import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { localStorageSync } from "ngrx-store-localstorage";
import { userReducer, UserState } from "./user.reducer";


export interface IAppState {
    user: UserState,
}

export const reducers: ActionReducerMap<IAppState> = {
    user: userReducer
}

export function localStorageSyncReducer(reducer:ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            'user'
        ],
        rehydrate: true
    })(reducer);
}

export const metaReducers: MetaReducer<IAppState>[] = [localStorageSyncReducer];