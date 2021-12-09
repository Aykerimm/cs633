import { Grid, Typography } from '@mui/material'
import React from 'react'
import Seat from '../Seat'

const Section = ({ section, onSeatClick: onSeatClickParent }) => {

    const onSeatClick = (rowID, sectionID) => {
        return (seatNumber, price) => {
            return onSeatClickParent(seatNumber, rowID, sectionID, price);
        }
    }

    return (
        <Grid item sx={{
            padding: 8,
            minWidth: 500,
        }} sm={12} md={6}>

            <div>
                <Typography variant='h5'>
                    {section.sectionID}
                </Typography>
            </div>
            <div style={{
                border: '1px solid grey',
                margin: '5px',
                padding: '8px',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                {
                    section.rows.map(row => {
                        const rowKey = section.sectionID + '_' + row.rowID;
                        return (
                            <div
                                key={rowKey}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {
                                    row.seats.map(seat => <Seat seat={seat} onSeatClick={onSeatClick(row.rowID, section.sectionID)} key={rowKey + '_' + seat.seat_number} />)
                                }
                            </div>
                        )
                    })
                }
            </div>
        </Grid>

    )
}

export default Section
