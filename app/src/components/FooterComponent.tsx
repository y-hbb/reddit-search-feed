import { Menu } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { appContext } from '../AppContext'

function FooterComponent() {

    return (
        <Box borderTop='solid 1px #ddd' width="100%" position="sticky" bottom="0" bgcolor="white" padding={1}>SearchIt. Unofficial Reddit client. Powered by <a href="https://www.reddit.com/dev/api">Reddit API</a></Box>
    )
}

export default FooterComponent
