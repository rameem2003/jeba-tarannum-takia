import { configureStore } from "@reduxjs/toolkit";
import StudentSlice from "../features/StudentSlice";
import AuthSlice from "../features/AuthSlice";

export default configureStore({
  reducer: {
    Student: StudentSlice,
    account: AuthSlice,
  },
});
