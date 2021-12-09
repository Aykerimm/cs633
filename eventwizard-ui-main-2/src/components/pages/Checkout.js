import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Review from '../ReviewForm';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { orderTicket } from '../queries';
import {isEmail, isDecimal, isInt} from 'validator';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Event Wizard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <AddressForm {...props} />;
    case 1:
      return <PaymentForm {...props} />;
    case 2:
      return <Review {...props} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  let location = useLocation();
  let navigate = useNavigate();
  const eventDetails = location.state;



  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    region: '',
    country: '',
    zipCode: '',
  });
  const [paymentDetails, setPaymentDetails] = React.useState({
    name: '',
    number: '',
    expirationDate: '',
    cvv: '',
    email: ''
  });
  const [orderID, setOrderID] = React.useState('');

  const validateAddressForm = () => {
    if (
      address.firstName.length === 0 ||
      address.lastName.length === 0 ||
      address.addressLine1.length === 0 ||
      address.city.length === 0 ||
      address.zipCode.length === 0 ||
      address.country.length === 0
    ) {
      return false;
    }

    return true;
  }

  const validatePaymentDetailsForm = () => {
    if (
      paymentDetails.name.length === 0 ||
      paymentDetails.number.length === 0 ||
      paymentDetails.expirationDate.length === 0 ||
      paymentDetails.cvv.length === 0 ||
      paymentDetails.email.length === 0
    ) {
      return false;
    }
    if (paymentDetails.number.length !== 16 || isDecimal(paymentDetails.number) === false) {
      return false;
    }
    if (paymentDetails.cvv.length !== 3 || isInt(paymentDetails.cvv) === false) {
      return false;
    }
    if (isEmail(paymentDetails.email) === false) {
      return false;
    }

    return true;
  }

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        // Address
        if (!validateAddressForm()) {
          alert('Please check your data for required fields');
          return;
        }
        break;
      case 1:
        // PaymentDetails
        if (!validatePaymentDetailsForm()) {
          alert('Please check your data for required fields');
          return;
        }
        break;
      case 2:
        const addresses = [address.addressLine1];
        if (address.addressLine2 && address.addressLine2 !== '') addresses.push(address.addressLine2);
        addresses.push(address.city);
        if (address.region && address.region !== '') addresses.push(address.region);
        addresses.push(address.zipCode);
        addresses.push(address.country);

        const orderInfo = {
          email: paymentDetails.email,
          address: addresses.join(', '),
          fullName: address.firstName + ' ' + address.lastName,
          cardInfo: {
            number: paymentDetails.number,
            holder: paymentDetails.name,
            expirationDate: paymentDetails.expirationDate,
            cvv: paymentDetails.cvv
          },
          eventID: eventDetails.eventID,
          eventDetails: eventDetails
        }
        orderTicket(orderInfo).then((data) => data.json()).then(data => {
          setOrderID(data._id);
          setActiveStep(activeStep + 1);
        });
        break;

    }
    if (activeStep < steps.length - 1)
      setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  if (
    eventDetails.name.length === 0 ||
    eventDetails.eventID.length === 0 ||
    eventDetails.sectionID.length === 0 ||
    eventDetails.rowID.length === 0 ||
    eventDetails.seat_number.length === 0 ||
    eventDetails.price.length === 0
  ) {
    navigate('/', { replace: true });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Event Wizard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{orderID}. We have emailed your order
                  confirmation.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep,
                  activeStep === 0 ? { address, setAddress } :
                    activeStep === 1 ? { paymentDetails, setPaymentDetails } :
                      activeStep === 2 ? { address, paymentDetails, eventDetails } :
                        {})}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}