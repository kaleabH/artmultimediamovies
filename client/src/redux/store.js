import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import themeModeSlice from "./features/themeModeSlice";
import userSlice from "./features/userSlice";
import adminSidebarSice from "./features/adminSidebarSice";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
    buttonsList: adminSidebarSice,
  },
});

export default store;
