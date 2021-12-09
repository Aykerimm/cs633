import React, {useState} from 'react'
import {Link} from '@mui/material'
import AppBar from '../appbar/AppBar'
import EventGrid from '../Event/EventGrid';

const Main = () => {

    const [category, setCategory] = useState('ALL');
    
    const onCategoryChange = (category=>{
        setCategory(category);
    })

    return (
        <div>
        <AppBar onCategoryChange={onCategoryChange}/>
            <EventGrid category={category} />
        </div>
    )
}

export default Main
