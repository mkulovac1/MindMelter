import React, { useContext, useEffect, useState } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContext'
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from '../services';
import { Box, Card, CardContent, CardHeader, LinearProgress, List, ListItemButton, Typography, CardMedia } from '@mui/material';
import { getFormatedTime } from '../helper';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {

    const [questions, setQuestions] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)
    const {context, setContext} = useStateContext();
    const navigate = useNavigate()

    let timer;

    const startTimer = () => {
        timer = setInterval(() => {
            setTimeTaken(prev => prev + 1) // zbog brzine ucitavanja
        }, [1000])
    }

    useEffect(() => {
        setContext({
            timeTaken: 0,
            selectedOptions: []
        })

        createAPIEndpoint(ENDPOINTS.question).fetch().
        then(res => {
            setQuestions(res.data)
            startTimer()
        }).catch(err => {console.log(err)})

        return () => { clearInterval(timer) } // kad napustamo komponentu
    }, [])

    
    
    const updateAnswer = (questionId, optionIndex) => {
        const temp = [...context.selectedOptions]
        temp.push({
            questionId,
            selected: optionIndex
        })
        
        setContext({selectedOptions: [...temp]})
        setQuestionIndex(questionIndex + 1)

        if(questionIndex < 4) {
            setContext({selectedOptions: [...temp]})
            setQuestionIndex(questionIndex + 1)
        }
        else {
            setContext({selectedOptions: [...temp], timeTaken})
            navigate('/result')
        }
    }

    return (
        questions.length != 0 
        ? <Card
            sx = {{
                maxWidth: 640,
                mx: 'auto',
                mt: 5,
                '&. MuiCardHeader-action': {
                    m: 0,
                    alignSelf: 'center'
                }
            }}
        >
            <CardHeader 
                title={'Question ' + (questionIndex + 1) + ' of 5'}
                action={<Typography>{getFormatedTime(timeTaken)}</Typography>} />
    
            <Box>
                <LinearProgress variant="determinate" value={(questionIndex + 1) * 100 / 5} />
            </Box>

            {questions[questionIndex].imageName != null
                ? <CardMedia component="img" image={BASE_URL + 'images/' + questions[questionIndex].imageName}
                    sx = {{
                        width: 'auto',
                        m: '10px auto'
                    }}
                /> : null
            }

            <CardContent>
                <Typography variant="h6">
                    {questions[questionIndex].questionInWords}
                </Typography>
                <List>
                    {questions[questionIndex].options.map((item, index) => 
                        <ListItemButton key={index} onClick={() => updateAnswer(questions[questionIndex].questionId, index)}>
                            <div>
                                <b> {String.fromCharCode(65 + index) + ". "} </b> {item}
                            </div>
                        </ListItemButton> // A = 65
                    )}
                </List>
            </CardContent>
        </Card>
        : null
    )
}
