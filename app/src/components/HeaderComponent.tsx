import { Close, Settings } from '@mui/icons-material';
import { AppBar, Box, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/AppStore';
import { actions } from '../store/RootReducer';

function HeaderComponent() {
    const mediaMaxQuality = useAppSelector((state) => state.mediaMaxQuality)
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(false);
    return (<>
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SearchIt
                </Typography>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => { setOpen(true) }}
                    color="inherit"
                >
                    < Settings />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Modal
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={{

                bgcolor: 'background.paper',
                height: '100%',
            }}>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography id="modal-modal-title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Settings
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => { setOpen(false) }}
                            color="inherit"
                        >
                            < Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Stack p={4} spacing={2}>
                    <Typography variant="h5">Media Max Quality</Typography>
                    <Stack spacing={2} maxWidth={{ sm: 'fit-content' }}>
                        <FormControl>
                            <InputLabel id="image-quality-label">Image</InputLabel>
                            <Select
                                labelId="image-quality-label"
                                value={mediaMaxQuality.image}
                                label="Image"
                                onChange={(e) => { dispatch(actions.setMaxQuality({ image: e.target.value as number })) }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel id="gif-quality-label">Gif</InputLabel>
                            <Select
                                labelId="gif-quality-label"
                                value={mediaMaxQuality.gif}
                                label="Gif"
                                onChange={(e) => { dispatch(actions.setMaxQuality({ gif: e.target.value as number })) }}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="body1">Video quality changes is based on network speed</Typography>
                    </Stack>

                </Stack>
            </Box>
        </Modal>

    </>

    )
}

export default HeaderComponent
