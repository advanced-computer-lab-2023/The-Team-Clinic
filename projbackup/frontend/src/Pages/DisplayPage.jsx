import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios
import Button from '@mui/material/Button';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppBarComponent from '../Components/AppbarPatientClinc';


//import FamilyMember from './backend/src/Models/FamilyMember';

function FamilyMember() {
  console.log('FamilyMember component is rendering.');
  const [FamilyMember, createFamilyMember] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const queryParameters = {
      // Define your query parameters here, if needed
    };
    // Define a function to fetch medication data
    const getAllFamilyMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/family_members/', {
          params: queryParameters
        });
        const responseData = response.data;
        console.log('Fetched data:', responseData);
        createFamilyMember(responseData);
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    };

    // Call the getAllFamilyMembers function when the component mounts
    getAllFamilyMembers();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredRows = FamilyMember.filter((row) =>
  row.name.toLowerCase().includes(searchQuery.toLowerCase())
);
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
     { field: 'age', headerName: 'age', flex: 1 },
    { field: 'nationalid', headerName: 'nationalid', flex: 1},
    // { field: 'sales', headerName: 'Sale', flex: 1 ,type: 'number'},
   // { field: 'availableQuantity', headerName: 'Available Quantity', flex: 1,type: 'number' },
   // { field: 'medicalUse', headerName: 'Medical Use', flex: 1 },
    { field: 'relationtopatient', headerName: 'relationtopatient', flex: 1, },
   
  ];

  return (
    <Router>
    <div>
    <AppBarComponent/>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
       <Button variant="contained" color="primary">
        add family member
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
    </Router>
  );
}

export default FamilyMember;
