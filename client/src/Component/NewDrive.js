import React, { useState } from 'react';
import axios from 'axios';

function NewDrive() {
  const [formData, setFormData] = useState({ Vname: "", DriveDate: "", AvailableDoses: "", ApplicableClass: ""});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const username = 'admin';
  const password = 'password123';
  const base64Credentials = btoa(`${username}:${password}`);
  const handleSubmit = async (e) => { e.preventDefault();
        console.log('sending post req for new drive');
        //post request to submit data entered by user from browser, along with basic auth headers
        axios.post('http://localhost:3000/Vaccine/newDrive', formData,{headers: {
            'Authorization': `Basic ${base64Credentials}`,'Content-Type': 'application/json'
      }})
          .then(response => {
            setIsSubmitted(true);
            setMessage(response.data.message);
            console.log('Response from server:', response.data.message);
          })
          .catch(error => {
            console.error('Error:', error);
          });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="Vname" placeholder="Vaccine Name" onChange={handleChange} />
      <input type="text" name="DriveDate" placeholder="Drive Date" onChange={handleChange} />
      <input type="text" name="AvailableDoses" placeholder="Total Doses" onChange={handleChange} />
      <input type="text" name="ApplicableClass" placeholder="StudentClass" onChange={handleChange} />
      <button type="submit">Add Vaccine Drive</button>
      {isSubmitted && <p>{message}</p>}
    </form>
  );
}

export default NewDrive;
