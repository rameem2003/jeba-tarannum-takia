import { createSlice } from "@reduxjs/toolkit";

export const StudentSlice = createSlice({
  name: "counter",
  initialState: {
    students: [],
  },
  reducers: {
    allStudents: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.students = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { allStudents } = StudentSlice.actions;

export default StudentSlice.reducer;
