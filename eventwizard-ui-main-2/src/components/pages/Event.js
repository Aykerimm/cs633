import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getEventById } from '../queries';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AppBar from '../appbar/AppBar'
import Section from '../Section';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router';
import { format } from 'date-fns'

const Event = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState(null)
    const [loading, setLoading] = useState(false);

    const onCategoryChange = (category => {
            navigate('/');
    })

    const onSeatClick = (seatNumber, rowID, sectionID, price) => {
        console.log({seatNumber, rowID, sectionID, price})
        navigate('/checkout', {
            state: {seat_number: seatNumber, rowID, sectionID, price, name: eventDetails.name, eventID: id}
        })
    }

    useEffect(async () => {
        setLoading(true);

        const res = await getEventById(id);
        if (res.ok) {
            const event = await res.json()
            setEventDetails(event);
            setLoading(false);
            console.log(event);
        }

        return () => {
            setEventDetails(null)
        }
    }, [id])

    if (loading || eventDetails === null) {
        return null;
    }

    const { venue, name, poster, date } = eventDetails;
    console.log('venue', venue);
    return (
        <div>
            <AppBar onCategoryChange={onCategoryChange} />

            <Card elevation={1}>
                <CardMedia
                    component="img"
                    height="56.25%"
                    image={poster}
                    alt={name}
                />
                <CardContent>
                    <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent:'space-between'
                    }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        
                        <Typography variant="h6">
                            {venue.location.fullLocation}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary">
                        {format(new Date(date), 'eee, MMM d, h:mmaaa')}
                    </Typography>
                </CardContent>
            </Card>

            <Paper sx={{ marginTop: 8 }}>
                <Typography gutterBottom variant='h4' component="div">
                    Seats
                </Typography>

                <Grid container spacing={2}>
                    {
                        venue.sections.map(section => {
                            return <Section key={section.sectionID} section={section} onSeatClick={onSeatClick} />
                        })
                    }
                </Grid>
            </Paper>
        </div>
    )
}

export default Event
