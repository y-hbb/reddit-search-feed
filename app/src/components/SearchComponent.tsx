import { Box, Chip, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, Switch, TextField, Grid } from '@mui/material'
import React, { KeyboardEvent, useState } from 'react'
import { useAppSelector } from '../store/AppStore'
import { useAppDispatch } from '../store/AppStore';
import { actions } from '../store/RootReducer';

type SearchComponentProps = {
    search: (s: SearchOptions) => void,
}

export type SearchOptions = {
    q: string,
    includeOver18: boolean
    t: string,
    sort: string,
    after?: string
}


function SearchComponent(props: SearchComponentProps) {
    const excludeItem = useAppSelector((state) => state.excludeItem)
    const dispatch = useAppDispatch()
    const excludeList = excludeItem.map((v) => <Grid key={v.id} item><Chip label={(() => {
        if (v.type === 'author')
            return 'u/' + v.data
        else if (v.type === 'subreddit')
            return 'r/' + v.data
    })()} variant="outlined" onDelete={() => { dispatch(actions.removeExclude(v)) }} /></Grid>)
    //query
    const [q, setQ] = useState("")
    const [selectedSort, setSelectedSort] = useState('')
    const [selectedT, setSelectedT] = useState('')
    //safe search
    const [safeS, setSafeS] = useState(true)
    function searchKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            props.search({ q: q, includeOver18: !safeS, t: selectedT, sort: selectedSort })
        }
    }

    const sort = 'relevance, hot, top, new, comments'.split(',').map((a) => a.trim())
    const time = 'hour,day,week,month,year,all'.split(',').map((a) => a.trim())

    const sortList = sort.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)
    sortList.unshift(<MenuItem key="--" value="">--</MenuItem>)
    const timeList = time.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)
    timeList.unshift(<MenuItem key="--" value="">--</MenuItem>)

    return (
        <Box p={2}>
            <Stack flexDirection={{ xs: 'column', sm: 'row' }} p={2} sx={{ alignItems: 'center', gap: 2 }} >
                <TextField fullWidth placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} onKeyUp={searchKeyUp} />
                <FormGroup sx={{ minWidth: 'fit-content' }}>
                    <FormControlLabel control={<Switch checked={safeS} onChange={(_, c) => setSafeS(c)} />} label="Safe Search" />
                </FormGroup>
                <FormControl fullWidth>
                    <InputLabel id="sort-label">Sort</InputLabel>
                    <Select
                        labelId="sort-label"
                        label="Sort"
                        value={selectedSort}
                        onChange={(e) => { setSelectedSort(e.target.value) }}
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
                        onChange={(e) => { setSelectedT(e.target.value) }}
                    >
                        {timeList}
                    </Select>
                </FormControl>

            </ Stack>

            <Grid spacing={1} container>
                {excludeList}
            </Grid>
        </Box>
    )
}

export default SearchComponent
