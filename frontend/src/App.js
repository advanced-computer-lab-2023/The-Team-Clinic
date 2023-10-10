import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './App.css';
import HealthRecPage from './HealthRecPage.jsx';



function App() {
  return (
    <Router> 
      <HealthRecPage/>
    </Router>
  );
}

export default App;