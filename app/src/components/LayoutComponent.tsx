import { Container } from '@mui/material'
import React from 'react'
import HeaderComponent from './HeaderComponent'


type LayoutComponentProps = {
    children: React.ReactNode
}

function LayoutComponent(props: LayoutComponentProps) {
    return (
        <>
            <HeaderComponent />
            <Container maxWidth='xl'>

                {props.children}
            </Container>
        </>
    )
}

export default LayoutComponent
