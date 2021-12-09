import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review({ address, paymentDetails, eventDetails }) {
  const addresses = [address.addressLine1];
  if (address.addressLine2 && address.addressLine2 !== '') addresses.push(address.addressLine2);
  addresses.push(address.city);
  if (address.region && address.region !== '') addresses.push(address.region);
  addresses.push(address.zipCode);
  addresses.push(address.country);

  let cardHiddenNumber = paymentDetails.number;
  const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  const numberlen = cardHiddenNumber.length;
  for (let i = 0; i < numberlen; i++) {
    if (i > 3 && i < cardHiddenNumber.length - 4) {
      cardHiddenNumber = setCharAt(cardHiddenNumber, i, 'x')
    }
  }

  const payments = [
    { name: 'Card holder', detail: paymentDetails.name },
    { name: 'Card number', detail: cardHiddenNumber },
    { name: 'Expiry date', detail: paymentDetails.expirationDate },
  ];


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem key={eventDetails.name} sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Event' />
          <Typography variant="body2">{eventDetails.name}</Typography>
        </ListItem>
        <ListItem key={eventDetails.sectionID} sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Section' />
          <Typography variant="body2">{eventDetails.sectionID}</Typography>
        </ListItem>
        <ListItem key={eventDetails.rowID} sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Row' />
          <Typography variant="body2">{eventDetails.rowID}</Typography>
        </ListItem>
        <ListItem key={eventDetails.seat_number} sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Seat' />
          <Typography variant="body2">{eventDetails.seat_number}</Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${eventDetails.price}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Address
          </Typography>
          <Typography gutterBottom>{address.firstName + ' ' + address.lastName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}