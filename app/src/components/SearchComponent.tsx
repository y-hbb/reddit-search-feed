import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import React, { type KeyboardEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/AppStore';
import { actions } from '../store/RootReducer';

interface SearchComponentProps {
  search: (s: SearchOptions) => void;
}

export interface SearchOptions {
  q: string;
  includeOver18: boolean;
  t: string;
  sort: string;
  after?: string;
}

export const emptySearchOptions: SearchOptions = {
  q: '',
  includeOver18: false,
  t: 'all',
  sort: 'relevance',
  after: '',
};

function SearchComponent(props: SearchComponentProps): JSX.Element {
  const excludeItem = useAppSelector((state) => state.root.excludeItem);
  const dispatch = useAppDispatch();
  const excludeList = excludeItem.map((v, i) => (
    <Grid key={i} item>
      <Chip
        label={(() => {
          if (v.type === 'author') return 'u/' + v.data;
          else if (v.type === 'subreddit') return 'r/' + v.data;
        })()}
        variant="outlined"
        onDelete={() => {
          dispatch(actions.removeExclude(v));
        }}
      />
    </Grid>
  ));
  // query
  const [q, setQ] = useState('');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [selectedT, setSelectedT] = useState('all');
  // safe search
  const [safeS, setSafeS] = useState(true);
  function searchKeyUp(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      props.search({
        q,
        includeOver18: !safeS,
        t: selectedT,
        sort: selectedSort,
      });
    }
  }

  const sort = 'relevance, hot, top, new, comments'
    .split(',')
    .map((a) => a.trim());
  const time = 'hour,day,week,month,year,all'.split(',').map((a) => a.trim());

  const sortList = sort.map((s) => (
    <MenuItem key={s} value={s}>
      {s}
    </MenuItem>
  ));

  const timeList = time.map((s) => (
    <MenuItem key={s} value={s}>
      {s}
    </MenuItem>
  ));

  return (
    <Box p={2}>
      <Stack
        flexDirection={{ xs: 'column', sm: 'row' }}
        p={2}
        sx={{ alignItems: 'center', gap: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Search..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          onKeyUp={searchKeyUp}
        />
        <Button
          variant="outlined"
          onClick={() => {
            props.search({
              q,
              includeOver18: !safeS,
              t: selectedT,
              sort: selectedSort,
            });
          }}
        >
          <Search />
        </Button>
        <FormGroup sx={{ minWidth: 'fit-content' }}>
          <FormControlLabel
            control={
              <Switch
                checked={safeS}
                onChange={(_, c) => {
                  setSafeS(c);
                }}
              />
            }
            label="Safe Search"
          />
        </FormGroup>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort"
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.target.value);
            }}
          >
            {sortList}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="time-label">Time</InputLabel>
          <Select
            labelId="time-label"
            label="Time"
            value={selectedT}
            onChange={(e) => {
              setSelectedT(e.target.value);
            }}
          >
            {timeList}
          </Select>
        </FormControl>
      </Stack>

      <Grid spacing={1} container>
        {excludeList}
      </Grid>
    </Box>
  );
}

export default SearchComponent;
