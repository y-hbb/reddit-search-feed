import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ExcludeItem = {
  id: string;
  data: string;
  type: "author" | "subreddit";
};

const excludeItemSlice = createSlice({
  name: "excludeItem",
  initialState: [] as ExcludeItem[],
  reducers: {
    addExclude: (state, action: PayloadAction<ExcludeItem>) => {
      let has = false;
      state.forEach((v) => {
        if (v.data === action.payload.data && v.type === action.payload.type) {
          has = true;
        }
      });
      if (!has) {
        state.push(action.payload);
        return state;
      }
    },
    removeExclude: (state, action: PayloadAction<ExcludeItem>) => {
      state.splice(state.indexOf(action.payload));
      return state;
    },
  },
});

const searchDataSlice = createSlice({
  name: "searchData",
  initialState: {} as any,
  reducers: {
    setAfter: (state, action: PayloadAction<any>) => {
      state.after = action.payload;
      return state;
    },
  },
});

export default {
  excludeItem: excludeItemSlice.reducer,
  searchData: searchDataSlice.reducer,
};

export const actions = {
  ...excludeItemSlice.actions,
  ...searchDataSlice.actions,
};
