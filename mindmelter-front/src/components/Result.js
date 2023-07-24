import React, { useEffect, useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../services'
import useStateContext from '../hooks/useStateContext'
import { Alert, Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { green } from '@mui/material/colors'
import Answer from './Answer'
import { getFormatedTime } from '../helper'

export default function Result() {

    const {context, setContext} = useStateContext()
    const [score, setScore] = useState(0)
    const [questionAnswers, setQuestionAnswers] = useState([])
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        const ids = context.selectedOptions.map(x => x.questionId)
        createAPIEndpoint(ENDPOINTS.getAnswers).post(ids).then(res => {
            const questionsAndAnswers = context.selectedOptions.map(x => ({
                ...x,
                ...(res.data.find(y =>  y.questionId == x.questionId))
            }))
            setQuestionAnswers(questionsAndAnswers)
            calculateScore(questionsAndAnswers)
        }).catch(err => console.log(err))
    }, [])

    const calculateScore = questionsAndAnswers => {
        let tempScore = questionsAndAnswers.reduce((acc, curr) => {
            return curr.answer == curr.selected ? acc + 1: acc
        }, 0)
        setScore(tempScore)
    }

    const restart = () => {
        setContext({
            timeTaken: 0,
            selectedOptions: []
        })
        navigate("/quiz")
    }

    const submitScore = () => { 
        createAPIEndpoint(ENDPOINTS.participant).put(context.participantId, {
            participantId: context.participantId,
            score: score,
            timeTaken: context.timeTaken
        }).then(res => {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }).catch(err => console.log(err))
    }


    return (
        <>
            <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
                    <Typography variant="h4">Congratulations!</Typography>
                    <Typography variant="h6">
                        YOUR SCORE
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        <Typography variant="span" color={green[500]}>
                        {score}
                        </Typography>/5
                    </Typography>
                    <Typography variant="h6">
                        Took {getFormatedTime(context.timeTaken) + ' minutes'}
                    </Typography>
                    <Button variant="contained"
                        sx={{ mx: 1 }}
                        size="small"
                        onClick={submitScore}>
                        Submit
                    </Button>
                    <Button variant="contained"
                        sx={{ mx: 1 }}
                        size="small"
                        onClick={restart}>
                        Re-try
                    </Button>
                    <Alert
                        severity="success"
                        variant="string"
                        sx={{
                        width: '60%',
                        m: 'auto',
                        visibility: showAlert ? 'visible' : 'hidden'
                        }}>
                        Score Updated.
                    </Alert>
                    </CardContent>
                </Box>
            </Card>
            <Answer questionAnswers={questionAnswers} />
      </>
    )
}
