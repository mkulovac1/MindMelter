import React, { useEffect } from 'react'
import { Button, TextField, Card, CardContent, Typography, useStepContext } from '@mui/material'
import { Box } from '@mui/system'
import Center from './Center'
import useForm from '../hooks/useForm'
import { ENDPOINTS, createAPIEndpoint } from '../services'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router-dom'


const getFreshModelObject = () => ({
    name: '',
    email: ''
})



export default function Login() {
    
    const {context, setContext, resetContext} = useStateContext()

    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModelObject);
    

    useEffect(() => {
        resetContext()
    }, [])

    const login = e => {
        e.preventDefault();

        let saljiOvo = {
            participantId: 0,
            email: values.email,
            name: values.name,
            score: 0,
            timeTaken: 0
        }

        // console.log(saljiOvo)
        // console.log(values)
        createAPIEndpoint(ENDPOINTS.participant).post(values).then(res => {
            setContext({participantId: res.data.participantId})
            navigate('/quiz')
            // console.log(context)
        }).catch(err => console.log(err))
    
    }

    const validate = () => {
        let temp = {};
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? '' : 'E-mail is not valid';
        temp.name = values.name ? '' : 'This field is required';
        setErrors(temp);
        return Object.values(temp).every(x => x === '');
    }

    return (
        <Center>        
            <Card sx={{
                width: 400
            }}>
                <CardContent sx={{textAlign: 'center'}}>
                    <Typography variant='h3' sx={{margin: 3}}>
                        MindMelter Quiz App
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            margin: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete='off' onSubmit={login}> 
                            <TextField 
                                label='E-mail' 
                                name='email' 
                                value={values.email}
                                onChange={handleInputChange} 
                                variant='outlined'
                                {...(errors.email && {error:true, helperText:errors.email})} // dinamicko hendelovanje error-a
                                />
                            <TextField 
                                label='Name' 
                                name='name' 
                                value={values.name}
                                onChange={handleInputChange} 
                                variant='outlined'
                                {...(errors.name && {error:true, helperText:errors.name})} // dinamicko hendelovanje error-a
                                />
                            <Button type='submit' variant='contained' size='large' sx={{
                                width: '90%',
                            }}>Start</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>
    )
}
