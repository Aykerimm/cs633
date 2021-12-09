import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm({address, setAddress}) {
  const {firstName, lastName, addressLine1, addressLine2, city, region, country, zipCode} = address;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            onChange={(e)=> setAddress({...address, firstName: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={(e)=>setAddress({...address, lastName: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="address-line1"
            variant="standard"
            value={addressLine1}
            onChange={(e)=>setAddress({...address, addressLine1: e.target.value})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="address-line2"
            variant="standard"
            value={addressLine2}
            onChange={(e)=>setAddress({...address, addressLine2: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="address-level2"
            variant="standard"
            value={city}
            onChange={(e)=>setAddress({...address, city: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={region}
            onChange={(e)=>setAddress({...address, region: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="postal-code"
            variant="standard"
            value={zipCode}
            onChange={(e)=>setAddress({...address, zipCode: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="country"
            variant="standard"
            value={country}
            onChange={(e)=>setAddress({...address, country: e.target.value})}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}