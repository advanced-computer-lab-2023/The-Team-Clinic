

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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Button,TextField } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import AppBarComponent from '../Components/AppBar/AppbarDoctor';
// // import { useHistory } from 'react-router-dom';
// // import ProfilePage from './ProfilePage';


// export default function AppTable() {
//   const [apps, setApps] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [filterValue, setFilterValue] = useState('');

  
//   useEffect(() => {
//     axios.get('http://localhost:2002/apps')
//       .then((response) => {
//         if (response.data) {
//           const transformedData = response.data.map((item) => ({
//             id:item._id,
//             Pid: item.pid, // Adjust this based on your data structure
//             Did: item.did,   // Adjust this based on your data structure
//             status: item.status, // Adjust this based on your data structure
//             date: item.date, 
//           }));
//           setApps(transformedData);
//           setFilteredRows(transformedData);

//         } else {
//           console.error('No data received from the API');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching apps:', error);
//       });
//   }, []);



//   const handleFilterChange = (e) => {
//     const value = e.target.value.toLowerCase();
//     setFilterValue(value);

//     const filteredApps = apps.filter((app) =>
//       app.name.toLowerCase().includes(value) 
//     );

//     setFilteredRows(filteredApps);
//   };

  
//   const columns = [
//     { field: 'Pid', headerName: 'Patientid', width: 200 },
//     { field: 'Did', headerName: 'Docid', width: 200 },
//     { field: 'status', headerName: 'Status', width: 200 },
//     { field: 'date', headerName: 'Date', width: 200 },

    
//     // {
//     //   field: 'actions', // Custom field name for the button column
//     //   headerName: '',
//     //   width: 120,
//     //   renderCell: (params) => (
//     //     <Button variant="outlined" onClick={() => handleButtonClick(params.row)}>
//     //       VIEW
//     //     </Button>
//     //   ),
//     // },

//   ];
//   const handleButtonClick = (row) => {
//     // Implement the action you want to perform when the button is clicked
//     console.log('Button clicked for row:', row);
//     // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

//   };

//   return (

// <Box sx={{ height: '100%', width: '80%', margin: 5 }} bgcolor="#daf4ff">
//     <AppBarComponent/>
//       <h1>Appointments</h1>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'right',
//           gap: '16px',
//           padding: '10px',
//         }}
//       >
//         <TextField
//           label="Search by Name/Speciality"
//           variant="outlined"
//           value={filterValue}
//           onChange={handleFilterChange}
//         />
//         <Button variant="contained">
//           Search
//         </Button>
//       </Box>
      
//       <DataGrid
//         rows={filteredRows}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }
//////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Button, TextField } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import AppBarComponent from '../Components/AppBar/AppbarDoctor';

// export default function AppTable() {
//   const [apps, setApps] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [dateFilterStart, setDateFilterStart] = useState('');
//   const [dateFilterEnd, setDateFilterEnd] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:2002/apps')
//       .then((response) => {
//         if (response.data) {
//           const transformedData = response.data.map((item) => ({
//             id: item._id,
//             Pid: item.pid,
//             Did: item.did,
//             status: item.status,
//             date: item.date,
//           }));
//           setApps(transformedData);
//           setFilteredRows(transformedData);
//         } else {
//           console.error('No data received from the API');
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching apps:', error);
//       });
//   }, []);

//   const columns = [
//     { field: 'Pid', headerName: 'Patientid', width: 200 },
//     { field: 'Did', headerName: 'Docid', width: 200 },
//     { field: 'status', headerName: 'Status', width: 200 },
//     { field: 'date', headerName: 'Date', width: 200 },
//   ];

//   const handleFilterChange = () => {
//     const filteredApps = apps.filter((app) => {
//       if (!dateFilterStart || !dateFilterEnd) {
//         return true;
//       }
//       const appDate = new Date(app.date);
//       const startDate = new Date(dateFilterStart);
//       const endDate = new Date(dateFilterEnd);

//       return appDate >= startDate && appDate <= endDate;
//     });

//     setFilteredRows(filteredApps);
//   };

//   return (
//     <Box sx={{ height: '100%', width: '80%', margin: 5 }} bgcolor="#daf4ff">
//       <AppBarComponent />
//       <h1>Appointments</h1>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'right',
//           gap: '16px',
//           padding: '10px',
//         }}
//       >
//         <TextField
//           label="Start Date"
//           type="date"
//           variant="outlined"
//           value={dateFilterStart}
//           onChange={(e) => setDateFilterStart(e.target.value)}
//         />
//         <TextField
//           label="End Date"
//           type="date"
//           variant="outlined"
//           value={dateFilterEnd}
//           onChange={(e) => setDateFilterEnd(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleFilterChange}>
//           Filter
//         </Button>
//       </Box>

//       <DataGrid
//         rows={filteredRows}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }
///////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/AppBar/AppbarDoctor';

export default function AppTable() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:2002/apps')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            Pid: item.pid,
            Did: item.did,
            status: item.status,
            date: new Date(item.date),
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

  const columns = [
    { field: 'Pid', headerName: 'Patientid', width: 200 },
    { field: 'Did', headerName: 'Docid', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
  ];

  const handleFilterChange = () => {
    const filteredApps = apps.filter((app) => {
      if (!dateFilterStart || !dateFilterEnd) {
        return true;
      }

      return app.date >= dateFilterStart && app.date <= dateFilterEnd;
    });

    setFilteredRows(filteredApps);
  };

  return (
    <Box sx={{ height: '100%', width: '80%', margin: 5 }} bgcolor="#daf4ff">
      <AppBarComponent />
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
          label="Start Date"
          type="date"
          variant="outlined"
          value={dateFilterStart ? dateFilterStart.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFilterStart(new Date(e.target.value))}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          value={dateFilterEnd ? dateFilterEnd.toISOString().split('T')[0] : ''}
          onChange={(e) => setDateFilterEnd(new Date(e.target.value))}
        />
        <Button variant="contained" onClick={handleFilterChange}>
          Filter
        </Button>
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </Box>
  );
}

