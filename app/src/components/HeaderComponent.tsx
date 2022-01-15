import { Menu } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { appContext } from '../AppContext'

function HeaderComponent() {
    const app = useContext(appContext)
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {app.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderComponent
