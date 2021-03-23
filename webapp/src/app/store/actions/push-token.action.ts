import { createAction, props } from "@ngrx/store"
import { PushTokenState } from "../reducers/push-token.reducer"

export const saveToken = createAction(
  '[Token Action] Save Token',
  props<{token: string}>()
)

export const deleteToken = createAction(
  '[Token Action] Token Delete'
)
