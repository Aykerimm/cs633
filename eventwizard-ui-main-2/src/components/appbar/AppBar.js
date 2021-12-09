import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar({onCategoryChange}) {

    const navigate = useNavigate();
    const onCategoryClick = (e) => {
        e.preventDefault()
        

        onCategoryChange(e.target.value)
    }

    const onAccountClick = () => {
        navigate('/login');
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div
                        style={{ color:'#fff', width: 100, height: 50, backgroundImage: 'url("/eventwizard.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                        onClick={onCategoryClick}
                        value='ALL'
                    >
                        
                    </div>
                    <Box sx={{ flexGrow: 1, paddingLeft: 1 }} >
                        <Button value="Concert" sx={{ color: '#fff' }} onClick={onCategoryClick} size="large" variant="text" aria-label="event category concerts">Concerts</Button>
                        <Button value="Sport" sx={{ color: '#fff' }} onClick={onCategoryClick} size="large" variant="text" aria-label="event category sports">Sports</Button>
                        <Button value="Art" sx={{ color: '#fff' }} onClick={onCategoryClick} size="large" variant="text" aria-label="event category arts">Arts & Theater</Button>
                        <Button value="Family" sx={{ color: '#fff' }} onClick={onCategoryClick} size="large" variant="text" aria-label="event category family">Family</Button>
                        <Button value="More" sx={{ color: '#fff' }} onClick={onCategoryClick} size="large" variant="text" aria-label="event category more">More</Button>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show notifications"
                            color="inherit"
                        >
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={onAccountClick}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
