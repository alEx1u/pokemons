import { createSlice } from "@reduxjs/toolkit";

type Session = {
  isLoggedIn: boolean;
};

export type Theme = "light" | "dark";

export type SessionState = {
  session: Session;
  theme: Theme;
};

export const initalSessionState: SessionState = {
  session: {
    isLoggedIn: false,
  },
  theme: "light",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState: initalSessionState,
  reducers: {
    logginIn: (state) => {
      state.session.isLoggedIn = true;
    },
    logOut: (state) => {
      state.session.isLoggedIn = false;
    },
    switchTheme: (state) => {
      state.theme = state.theme == "light" ? "dark" : "light";
    },
  },
});
