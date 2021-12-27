import { Box, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, Switch, TextField } from '@mui/material'
import React, { KeyboardEvent, useState } from 'react'

type SearchComponentProps = {
    search: (s: SearchOptions) => void,
}

export type SearchOptions = {
    q: String,
    includeOver18: boolean
}


function SearchComponent(props: SearchComponentProps) {
    //query
    const [q, setQ] = useState("")
    //safe search
    const [safeS, setSafeS] = useState(true)
    function searchKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            props.search({ q: q, includeOver18: safeS })
        }
    }

    const sort = 'relevance, hot, top, new, comments'.split(',').map((a) => a.trim())
    const time = 'hour,day,week,month,year,all'.split(',').map((a) => a.trim())

    const sortList = sort.map((s) => <MenuItem value={s}>{s}</MenuItem>)
    const timeList = time.map((s) => <MenuItem value={s}>{s}</MenuItem>)

    return (
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
                >
                    {sortList}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="time-label">Time</InputLabel>
                <Select
                    labelId="time-label"
                    label="Time"
                >
                    {timeList}
                </Select>
            </FormControl>
        </ Stack>
    )
}

export default SearchComponent
