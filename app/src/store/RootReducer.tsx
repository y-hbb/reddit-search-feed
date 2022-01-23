import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from 'react';
import Swiper from "swiper";

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

const feedDataSlice = createSlice({
  name: "feedData",
  initialState: {} as any,
  reducers: {
    setAfter: (state, action: PayloadAction<any>) => {
      state.after = action.payload;
      return state;
    },
  },
});
type MaxQuality = {
  image: number;
  gif: number;
};
const mediaMaxQualitySlice = createSlice({
  name: "mediaMaxQuality",
  initialState: { gif: 2, image: 2 } as MaxQuality,
  reducers: {
    setMaxQuality: (state, action: PayloadAction<any>) => {
      if (action.payload.gif) {
        state.gif = action.payload.gif;
      }
      if (action.payload.image) {
        state.image = action.payload.image;
      }
      return state;
    },
  },
});

type PostSwiper = {
  isOpen: boolean, customIndex: number
}

const postSwiperSlice = createSlice({
  name: "postSwiper",
  initialState: { isOpen: false, customIndex: 0 } as PostSwiper,
  reducers: {
    openPostSwiper: (state, action: PayloadAction<any>) => {
      state.isOpen = action.payload.isOpen;
      if (action.payload.customIndex)
        state.customIndex = action.payload.customIndex;

      return state;
    }
  },
});

export default {
  excludeItem: excludeItemSlice.reducer,
  feedData: feedDataSlice.reducer,
  mediaMaxQuality: mediaMaxQualitySlice.reducer,
  postSwiper: postSwiperSlice.reducer
};

export const actions = {
  ...excludeItemSlice.actions,
  ...feedDataSlice.actions,
  ...mediaMaxQualitySlice.actions,
  ...postSwiperSlice.actions
};
