import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getEventsByCategory } from '../queries';
import EventCard from './EventCard'
import {useNavigate, useLocation} from 'react-router-dom'

const EventGrid = (props) => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getEventsByCategory(props.category)
            .then((res) => {
                return res.json();
            })
            .then(res => {
                console.log(res)
                setEvents([...res])
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
            })
    }, [props.category])

    if (loading === true) {
        return null;
    }

    const onEventSelect = (event) => {
        navigate("/event/"+event._id);
    }

    return (
        <Grid container spacing={3} >
            {events.map(event => {
                console.log(event)
                return (
                    <Grid onClick={()=>onEventSelect(event)} xs={12} sm={6} md={4} lg={3} item key={event._id}>
                        <EventCard event={event} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default EventGrid
