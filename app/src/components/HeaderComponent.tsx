import { Menu } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'

function HeaderComponent() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Title
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent
