import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NotificationsPage = () => {
    const [notification, setNotification] = useState(null);
    const { id } = useParams(); // Extract the id from URL

    useEffect(() => {
        axios.get(`http://localhost:3000//confirmation/${id}`)
            .then(response => {
                setNotification(response.data);
            })
            .catch(error => {
                console.error('Error fetching notification data:', error);
            });
    }, [id]); // Dependency array with id to refetch if id changes

    return (
        <div>
            <h1>Notification</h1>
            {notification ? (
                <div>
                    <p>Patient: {notification.patient}</p>
                    <p>Doctor Username: {notification.doctor.username}</p>
                    <p>Date and Time: {notification.date}</p>
                    {/* Render other notification data as needed */}
                </div>
            ) : (
                <p>Loading notification...</p>
            )}
        </div>
    );
};

export default NotificationsPage;
