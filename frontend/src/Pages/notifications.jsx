import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
import { useParams } from 'react-router-dom';

export default function notificatiobs() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableApps, setAvailableApps] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);
  const currentDate = new Date();
  const { id } = useParams();
  const [checkAvailabilityDate, setCheckAvailabilityDate] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState('wallet');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('myself');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [patientHealthPackage, setPatientHealthPackage] = useState([]);
  const [allHealthPackages, setAllHealthPackages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [rate, setRate] = useState(0);
  const [packName, setPackName] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  

  const patientId = id;
  useEffect(() => {
    axios.get(`http://localhost:3000/apps/patient/${id}`)
      .then((response) => {
        if (response.data) {
          const availableData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            date: new Date(item.date),
          })).filter((item) => item.date >= currentDate);

          setAvailableApps(availableData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching available appointments:', error);
      });
  }, []);
  
 
}