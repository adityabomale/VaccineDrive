import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [formData, setFormData] = useState({ Sname: "", Sclass: "", id: "", vaccineStatus: "", vaccineDate: ""});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //declare basic auth headers to pass in the CRUD operations
  const username = 'admin';
  const password = 'password123';
  const base64Credentials = btoa(`${username}:${password}`);
  const handleSubmit = (e) => { e.preventDefault();
  console.log('sending post req to add new student'); 
  axios.post('http://localhost:3000/Student/addStudent', formData,{headers: {
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
  //generate form to accept user's data
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="Sname" placeholder="Student Name" onChange={handleChange} />
      <input type="text" name="Sclass" placeholder="Student's class" onChange={handleChange} />
      <input type="text" name="id" placeholder="Student id" onChange={handleChange} />
      <input type="text" name="vaccineStatus" placeholder="VaccineStatus" onChange={handleChange} />
      <input type="text" name="vaccineDate" placeholder="DateofVaccination" onChange={handleChange} />
      <button type="submit">Add Student data</button>
      {isSubmitted && <p>{message}</p>}
    </form>
  );
}
export default AddStudent;