import { Accordion, AccordionDetails, AccordionSummary, Typography, List, ListItem, Box, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import {green, red, grey} from '@mui/material/colors'
import { BASE_URL } from '../services'

export default function Answer({questionAnswers}) {

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const markCorrectOrNot = (questionAnswers, index) => {
        if([questionAnswers.answer, questionAnswers.selected].includes(index)) {
            return {
                sx: {
                    color: questionAnswers.answer == index ? green[500] : red[500] 
                }
            }
        }
    }

    return (
        <Box sx = {{
            mt: 5,
            width: '100%',
            maxWidth: 640,
            mx: 'auto'
        }}>
            {
                questionAnswers.map((item, x) => (
                    <Accordion 
                        disableGutters
                        key={x}
                        expanded={expanded === x}
                        onChange={handleChange(x)}
                    >
                        <AccordionSummary expandIcon={<ExpandCircleDownIcon 
                            sx={{
                                color: item.answer == item.selected ? green[500] : red[500]
                            }}
                        />}>
                            <Typography sx={{
                                width: '90%',
                                flexShrink: 0
                            }}>
                                {item.questionInWords}
                            </Typography>
                        </AccordionSummary>
                        
                        <AccordionDetails>
                            {
                                item.imageName ? 
                                <CardMedia component="img" image={BASE_URL + 'images/' + item.imageName} 
                                    sx = {{
                                        m: '10px auto',
                                        width: 'auto'
                                    }}
                                /> : null
                            }
                            <List>
                                {
                                    item.options.map((x, i) => 
                                    <ListItem key={i}>
                                        <Typography {...markCorrectOrNot(item, i)}>
                                            <b>
                                                {String.fromCharCode(65 + i) + ". "}
                                            </b> {x}
                                        </Typography>
                                    </ListItem>)
                                }
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Box>
  )
}
