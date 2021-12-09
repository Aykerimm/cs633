import { Popover, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';



const Seat = ({ seat, onSeatClick }) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleOrderClose = () => {
        setDialogOpen(false);
        onSeatClick(seat.seat_number, seat.price)
    }

    const open = Boolean(anchorEl);


    const seatColor = seat.availabilty !== 'available' ? 'grey' : seat.area === 'VVIP' ? 'purple' : seat.area === 'VIP' ? 'blue' : 'orange';
    return (
        <div>
            <Box
                onClick={seat.availabilty === 'available' ? handleDialogClickOpen : null}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 80,
                    width: 60,
                    margin: '0 16px 16px 0',
                    backgroundColor: seatColor,
                    color: 'white',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}>
                {seat.seat_number}
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <div style={{
                        padding: '16px',
                        lineHeight: 1.5,

                    }}>
                        <div>
                            <b>Price:</b> {seat.price}$
                        </div>
                        <div>
                            <b>Area:</b> {seat.area}
                        </div>
                        <div>
                            <b>Availablity:</b> {seat.availabilty}
                        </div>
                    </div>
                </Popover>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Proceed ticket order?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{
                            padding: '16px',
                            lineHeight: 1.5,

                        }}>
                            <div>
                                <b>Price:</b> {seat.price}$
                            </div>
                            <div>
                                <b>Area:</b> {seat.area}
                            </div>
                            <div>
                                <b>Availablity:</b> {seat.availabilty}
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleOrderClose} autoFocus>
                        Order now
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Seat
