import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PushTokenState } from "../reducers/push-token.reducer";

const getPushTokenFeatureState = createFeatureSelector<PushTokenState>('pushToken');

export const getPushToken = createSelector(
    getPushTokenFeatureState,
    token => token
);
