import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './App.css';
import AdminReqPage from './AdminReqPage.jsx';



function App() {
  return (
    <Router> 
      <AdminReqPage/>
    </Router>
  );
}

export default App;
