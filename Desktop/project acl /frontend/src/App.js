//import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router} from 'react-router-dom';


import AppTable from './Components/AppTable';




import Apppatpage from './Pages/apppagedoc';



import React  from 'react';


function App() {
  return (
   <Router>

    <Apppatpage />
   </Router>
  );
}

export default App;
