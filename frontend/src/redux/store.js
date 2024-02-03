import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialUserState = {
  userInfo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export const userActions = userSlice.actions;

export default store;
