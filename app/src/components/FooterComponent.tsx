import { Menu } from '@mui/icons-material'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'

function FooterComponent() {

    return (
        <Box borderTop='solid 1px #ddd' width="100%" bgcolor="white" padding={1}>SearchIt. Powered by <a href="https://www.reddit.com/dev/api">Reddit API</a></Box>
    )
}

export default FooterComponent
