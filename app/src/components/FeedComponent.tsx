import { Close } from '@mui/icons-material';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewCozyIcon from '@mui/icons-material/ViewCozy';
import { Button, Grid, Modal, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { Suspense, useEffect, useState } from 'react';
import RedditCardComponent from './reddit_card/RedditCardComponent';
import RedditCardExpandedComponent from './reddit_card/RedditCardExpandedComponent';
import { A11y, Lazy, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../store/AppStore';
import { actions } from '../store/RootReducer';

type FeedComponentProps = {
    data: any[],
    hasNextPage: boolean,
    isNextPageLoading: boolean,
    loadNextPage: () => void
}

export enum VIEW {
    COMPACT,
    EXPANDED1,
    EXPANDED2,
    EXPANDED3,
    SWIPE
}

function FeedComponent(props: FeedComponentProps) {
    const [view, setView] = useState(VIEW.COMPACT)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    if (matches) {
        if (view === VIEW.EXPANDED2 || view === VIEW.EXPANDED3)
            setView(VIEW.COMPACT)
    }

    let list;
    const expandMap = new Map()
    expandMap.set(VIEW.EXPANDED1, 12)
    expandMap.set(VIEW.EXPANDED2, 4)
    expandMap.set(VIEW.EXPANDED3, 3)

    const data = props.data.filter(v => !v.customExclude)

    if (view === VIEW.COMPACT)
        list = data.map((s) => <Grid p={1} key={s.data.id} item><RedditCardComponent view={view} data={s.data} /></Grid>)
    else if ((view === VIEW.EXPANDED1 || view === VIEW.EXPANDED2 || view === VIEW.EXPANDED3))
        list = data.map((s) => <Grid p={1} key={s.data.id} item xs={expandMap.get(view)}><RedditCardComponent view={view} data={s.data} /></Grid>)

    const slides = data.map((s, i) => { return <SwiperSlide key={s.data.id}><RedditCardExpandedComponent maxWidth={900} maxHeight={'fit-content'} data={s.data} /></SwiperSlide> })

    const dispatch = useAppDispatch()

    const postSwiper = useAppSelector((state) => state.postSwiper)

    let swiper: any;

    return (
        <Stack mb={2} direction='column' spacing={2}>
            {matches &&
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(e, v) => { if (v != null) setView(v) }}
                    aria-label="text alignment"
                >
                    <ToggleButton value={VIEW.COMPACT} aria-label="compact">
                        <ViewComfyIcon />
                    </ToggleButton>

                    <ToggleButton value={VIEW.EXPANDED1} aria-label="full width">
                        <ViewAgendaIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            }
            {!matches &&
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(e, v) => { if (v != null) setView(v) }}
                    aria-label="text alignment"
                >
                    <ToggleButton value={VIEW.COMPACT} aria-label="compact">
                        <ViewComfyIcon />
                    </ToggleButton>

                    <ToggleButton value={VIEW.EXPANDED1} aria-label="full width">
                        <ViewAgendaIcon />
                    </ToggleButton>

                    <ToggleButton value={VIEW.EXPANDED2} aria-label="3 column grid">
                        <ViewColumnIcon />
                    </ToggleButton>
                    <ToggleButton value={VIEW.EXPANDED3} aria-label="4 column grid">
                        <ViewCozyIcon />
                    </ToggleButton>

                </ToggleButtonGroup>
            }
            {data.length > 0 &&
                <Grid width='100%' container spacing={2} >
                    {list}
                </Grid>
            }


            {data.length == 0 &&
                <Box>No posts</Box>
            }
            {props.hasNextPage && !props.isNextPageLoading &&
                <Button onClick={() => { props.loadNextPage() }}>Load More</Button>
            }
            {props.isNextPageLoading &&
                <Box display='flex' alignItems='center' justifyContent='space-around' m='0 !important' width="100%" height="100%" top={0} left={0} position='fixed' bgcolor='#fffa'><Box>Loading...</Box></Box>
            }
            <Modal
                open={postSwiper.isOpen}
                onClose={() => { dispatch(actions.openPostSwiper({ isOpen: false })) }}
            >
                <Box p={3} height='100%' overflow='auto'>
                    <Box width={'100%'} display='flex' sx={{ flexFlow: 'row-reverse' }} p={2}>
                        <Button onClick={() => { dispatch(actions.openPostSwiper({ isOpen: false })) }}><Close sx={{ color: 'white' }} /></Button>
                    </Box>
                    <Suspense fallback>
                        <Swiper
                            onAfterInit={(s) => {
                                swiper = s;
                            }}
                            modules={[Navigation, A11y, Lazy]}
                            spaceBetween={50}
                            slidesPerView={1}
                            lazy
                        >
                            {slides}

                        </Swiper>
                    </Suspense>
                </Box>


            </Modal >

        </Stack >
    )
}

export default FeedComponent
