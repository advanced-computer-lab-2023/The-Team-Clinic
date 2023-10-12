import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; // Import Axios

function AppTable() {
  console.log('AppTable component is rendering.');
  const [appData, setAppData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const queryParameters = {
      // Define your query parameters here, if needed
    };
    // Define a function to fetch medication data
    const fetchAppData = async () => {
      try {
        const response = await axios.get('http://localhost:2002/apps', {
          params: queryParameters
        });
        const responseData = response.data;
        console.log('Fetched data:', responseData);
        setAppData(responseData);
      } catch (error) {
        console.error('Error fetching app data:', error);
      }
    };

    // Call the fetchMedicationData function when the component mounts
    fetchAppData();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // const filteredRows = appData.filter((row) =>
  // row.name.toLowerCase().includes(searchQuery.toLowerCase())


  const filteredRows = appData.filter((row) =>
  row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  const columns = [
    { field: 'did', headerName: 'Doctorid', flex: 1 },
     { field: 'pid', headerName: 'Patientid', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1},
    { field: 'date', headerName: 'Date', flex: 1},

   
  ];

  return (
    <div>
      {/* { Search input} */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchInputChange}
      /> 
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
        />
        
      </div>
    </div>
  );
}

export default AppTable;