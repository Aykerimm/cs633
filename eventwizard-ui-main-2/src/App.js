import React from 'react'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Main from './components/pages/Main'
import Event from './components/pages/Event'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './components/pages/Checkout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
