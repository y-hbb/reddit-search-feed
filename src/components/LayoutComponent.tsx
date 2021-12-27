import { Container } from '@mui/material'
import React from 'react'


type LayoutComponentProps = {
    children: React.ReactNode
}

function LayoutComponent(props: LayoutComponentProps) {
    return (
        <Container maxWidth='xl'>
            {props.children}
        </Container>
    )
}

export default LayoutComponent
