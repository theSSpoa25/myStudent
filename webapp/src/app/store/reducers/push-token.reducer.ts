import { createReducer, on } from "@ngrx/store"
import { deleteToken, saveToken } from "../actions/push-token.action"

export interface PushTokenState {
  token: string;
}

const initialState: PushTokenState = {
    token: null!,
}

export const pushTokenReducer = createReducer<PushTokenState>(
  initialState,
  on(saveToken, (state, action): PushTokenState => {
      return {
          ...state,
          token: action.token
      }
  }),
  on(deleteToken, (state): PushTokenState => {
      return {
          ...state,
          token: null!
      }
  })
)

