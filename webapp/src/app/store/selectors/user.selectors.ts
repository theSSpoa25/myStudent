import { createFeatureSelector, createSelector } from "@ngrx/store";
import { createFeatureReducerFactory } from "@ngrx/store/src/utils";
import { UserState } from "../reducers/user.reducer";

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
    getUserFeatureState,
    user => user
);