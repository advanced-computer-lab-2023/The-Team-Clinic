import React from 'react';
import { AppBar, Tabs, Tab, Avatar, Typography, Toolbar,Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { Link, useLocation, useNavigate , useParams} from 'react-router-dom';
import Logo from './Logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00008B',
    },
    secondary: {
      main: '#0070F3',
    },
  },
});

function AppBarComponent({ userName}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangePass = () => {
    navigate(`/changepassTwo/${id}`); 
  };

  const appBarStyle = {
    backgroundColor: 'white',
    height: '172px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const toolbarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  const tabContainerStyle = {
    marginTop: '60px',
    width: '100%',
  };

  const imgStyle = {
    width: '120px',
    height: 'auto',
    marginTop: '30px',
  };

  const nameStyle = {
    marginLeft: '10px',
  };

  const tabStyle = {
    '&.MuiTab-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  };

  const customIndicatorStyle = {
    backgroundColor: theme.palette.secondary.main,
  };

  // Function to handle Avatar click
  const handleAvatarClick = () => {
    navigate(`/patient-profile/${id}`);
  };
  const handleSignOut = () => {
    // Sign out logic goes here
    navigate('/clinic'); // Redirects to the login page
  };

  

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={toolbarStyle}>
          <Link to={`/patient-profile/${id}`} onClick={handleAvatarClick}>
            <Avatar src={AccountCircle} alt="Zeina Avatar" />
          </Link>
          <Typography variant="h6" component="div" color="primary" style={nameStyle}>
            
          </Typography>
          <Button color="primary" onClick={handleChangePass}>
            Change Password
          </Button>
          <Button color="primary" onClick={handleSignOut}>
            Log Out
          </Button>
          <img src={Logo} style={imgStyle} alt="Logo" />
        </Toolbar>
        <div style={tabContainerStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            centered={false}
            sx={{ '& .MuiTabs-indicator': customIndicatorStyle }}
          >
            <Tab
              label="Home"
              sx={tabStyle}
              component={Link}
              to={`/clinic-patient-home/${id}`}
              selected={location.pathname === `/clinic-patient-home/${id}`}
            />
            <Tab
              label="My Family"
              sx={tabStyle}
              component={Link}
              to={`/my-fam/${id}`}
              selected={location.pathname === `/my-fam/${id}`}
            />
            <Tab
              label="Appointments"
              sx={tabStyle}
              component={Link}
              to={`/appPagePatient/${id}`}
              selected={location.pathname === `/appPagePatient/${id}`}
            />
            <Tab
              label="Doctors"
              sx={tabStyle}
              component={Link}
              to={`/doctorsTable/${id}`}
              selected={location.pathname === `/doctorsTable/${id}`}
            />
            {/* <Tab
              label="Health Records"
              sx={tabStyle}
              component={Link}
              to={`/HealthRecordPatient/${id}`}
              selected={location.pathname === `/HealthRecordPatient/${id}`}
            /> */}
            <Tab
              label="Prescriptions"
              sx={tabStyle}
              component={Link}
              to={`/Prescription/${id}`}
              selected={location.pathname === `/Prescription/${id}`}
            />
             <Tab
               label="Health Records"
              sx={tabStyle}
              component={Link}
              to={`/MedHistory/${id}`}
              selected={location.pathname === `/MedHistory/${id}`}
            />
              <Tab
              label="Health Packages"
              sx={tabStyle}
              component={Link}
              to={`/health-packages-view/${id}`}
              selected={location.pathname === `/health-packages-view/${id}`}
            />
            <Tab
              label="My Subscriptions"
              sx={tabStyle}
              component={Link}
              to={`/health-packages-sub/${id}`}
              selected={location.pathname === `/health-packages-sub/${id}`}
            />

           <Tab
              label="Wallet"
              sx={tabStyle}
              component={Link}
              to={`/walletclinic/${id}`}
              selected={location.pathname === `/walletclinic/${id}`}
            />
            <Tab
              label="My notif"
              sx={tabStyle}
              component={Link}
              to={`/confirmation/${id}`}
              selected={location.pathname === `/confirmation/${id}`}
            />
          </Tabs>
        </div>
      </AppBar>
    </ThemeProvider>
  );
}

export default AppBarComponent;



