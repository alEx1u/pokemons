import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Session = {
  isLoggedIn: boolean;
};

export type Theme = "light" | "dark";

export type SessionState = {
  session: Session;
  theme: Theme;
};

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return "light";
};

export const initalSessionState: SessionState = {
  session: {
    isLoggedIn: false,
  },
  theme: getInitialTheme(),
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
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});
