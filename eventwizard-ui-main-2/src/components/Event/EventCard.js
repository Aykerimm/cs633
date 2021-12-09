import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { format } from 'date-fns'


const EventCard = ({event}) => {
    const { poster, name, date,  venue } =event;
    return (
        <Card elevation={5}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="56.25%"
                    image={poster}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {venue.location.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {format(new Date(date), 'eee, MMMM d')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default EventCard
