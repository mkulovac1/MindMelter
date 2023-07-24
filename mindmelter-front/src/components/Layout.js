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
                    display: 'flex', // Use Flexbox to arrange items
                    justifyContent: 'space-between', // Aligns items to left and right ends
                }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h4"
                            align="left" // Align the title to the left
                            sx={{
                                mb: { xs: 2, sm: 0 },
                            }}>
                            MindMelter Quiz
                        </Typography>
                    </div>
                    <div>
                        <Button onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Container>
                <Outlet />
            </Container>
        </>
    )
}
