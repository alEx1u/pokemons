import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Session = {
  isLoggedIn: boolean;
};

export type SessionState = {
  user: User | null;
  session: Session;
};

export const initalSessionState: SessionState = {
  user: null,
  session: { isLoggedIn: false },
};

export const sessionSlice = createSlice({
  name: "session",
  initialState: initalSessionState,
  selectors: {
    selectUser: (state) => state.user,
  },
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.session.isLoggedIn = state.user == null ? false : true;
    },
    logginIn: (state) => {
      state.session.isLoggedIn = true;
    },
    logOut: (state) => {
      state.session.isLoggedIn = false;
      state.user = null;
    }
  },
});
