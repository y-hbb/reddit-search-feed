import {
  combineReducers,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface ExcludeItem {
  data: string;
  type: 'author' | 'subreddit';
}

type ExcludeItems = ExcludeItem[];

const excludeItemSlice = createSlice({
  name: 'excludeItem',
  initialState: [] as ExcludeItems,
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

interface FeedData {
  after: string;
  feedData: any[];
}

const emptyFeedData: FeedData = {
  after: '',
  feedData: [],
};

const feedDataSlice = createSlice({
  name: 'feedData',
  initialState: emptyFeedData,
  reducers: {
    setAfter: (state, action: PayloadAction<any>) => {
      state.after = action.payload;
      return state;
    },
    addFeedData: (state, action: PayloadAction<any[]>) => {
      state.feedData = action.payload;
      return state;
    },
    updateFeedData: (state, action: PayloadAction<any[]>) => {
      state.feedData.push(...action.payload);
      return state;
    },
  },
});
interface MaxQuality {
  image: number;
  gif: number;
}

const initialMaxQuality: MaxQuality = {
  gif: 2,
  image: 2,
};
const mediaMaxQualitySlice = createSlice({
  name: 'mediaMaxQuality',
  initialState: initialMaxQuality,
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

interface PostSwiper {
  isOpen: boolean;
  id: number;
}

const initialPostSwiper: PostSwiper = {
  isOpen: false,
  id: 0,
};

const postSwiperSlice = createSlice({
  name: 'postSwiper',
  initialState: initialPostSwiper,
  reducers: {
    openPostSwiper: (state, action: PayloadAction<any>) => {
      state.isOpen = action.payload.isOpen;
      if (action.payload.id) state.id = action.payload.id;

      return state;
    },
  },
});

// export default {
//   excludeItem: excludeItemSlice.reducer,
//   feedData: feedDataSlice.reducer,
//   mediaMaxQuality: mediaMaxQualitySlice.reducer,
//   postSwiper: postSwiperSlice.reducer,
// };

export default combineReducers({
  excludeItem: excludeItemSlice.reducer,
  mediaMaxQuality: mediaMaxQualitySlice.reducer,
});

export const OtherReducers = {
  feedData: feedDataSlice.reducer,
  postSwiper: postSwiperSlice.reducer,
};

export const OtherReducersBlacklist = ['feedData', 'postSwiper'];

export const actions = {
  ...excludeItemSlice.actions,
  ...feedDataSlice.actions,
  ...mediaMaxQualitySlice.actions,
  ...postSwiperSlice.actions,
};
