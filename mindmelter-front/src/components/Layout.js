import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router'
import useStateContext from '../hooks/useStateContext'

export default function Layout() {
    const { resetContext } = useStateContext()
    const navigate = useNavigate()

    const logout = () => {
        resetContext()
        navigate("/")
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar sx={{
                    width: '100%',
                    maxWidth: '960px',
                    m: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    '@media (min-width:600px)': {
                        flexDirection: 'row',
                    }
                }}>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            flexGrow: 1,
                            mb: { xs: 2, sm: 0 },
                        }}>
                        MindMelter Quiz
                    </Typography>
                    <Button onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
