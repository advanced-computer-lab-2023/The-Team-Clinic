

// //import logo from '/logo.svg';


// import '../App.css';


// //import React from 'react';

// import AppTable from '../Components/AppTable';

// import AppbarDoctor from '../Components/AppBar/AppbarDoctor';

// import React,{usedEffect,useState} from 'react';
// import axios from 'axios';


// function appdocpage(){
//     //console.log('appdocpage component rendered');
//     return(
// <div>
//     <AppbarDoctor userName="yaya"></AppbarDoctor>
//     <p className='text'>  List of available appointments</p>

//    <AppTable />
// </div>
//     );
// }


// export default appdocpage;





//new code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button,TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/AppBar/AppbarDoctor';
// import { useHistory } from 'react-router-dom';
// import ProfilePage from './ProfilePage';


export default function AppTable() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  
  useEffect(() => {
    axios.get('http://localhost:2002/apps')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id:item._id,
            Pid: item.pid, // Adjust this based on your data structure
            Did: item.did,   // Adjust this based on your data structure
            status: item.status, // Adjust this based on your data structure
            date: item.date, 
          }));
          setApps(transformedData);
          setFilteredRows(transformedData);

        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching apps:', error);
      });
  }, []);



  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);

    const filteredApps = apps.filter((app) =>
      app.name.toLowerCase().includes(value) 
    );

    setFilteredRows(filteredApps);
  };

  
  const columns = [
    { field: 'Pid', headerName: 'Patientid', width: 200 },
    { field: 'Did', headerName: 'Docid', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },

    
    // {
    //   field: 'actions', // Custom field name for the button column
    //   headerName: '',
    //   width: 120,
    //   renderCell: (params) => (
    //     <Button variant="outlined" onClick={() => handleButtonClick(params.row)}>
    //       VIEW
    //     </Button>
    //   ),
    // },

  ];
  const handleButtonClick = (row) => {
    // Implement the action you want to perform when the button is clicked
    console.log('Button clicked for row:', row);
    // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

  };

  return (

<Box sx={{ height: '100%', width: '80%', margin: 5 }} bgcolor="#daf4ff">
    <AppBarComponent/>
      <h1>Appointments</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
        <TextField
          label="Search by Name/Speciality"
          variant="outlined"
          value={filterValue}
          onChange={handleFilterChange}
        />
        <Button variant="contained">
          Search
        </Button>
      </Box>
      
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}


