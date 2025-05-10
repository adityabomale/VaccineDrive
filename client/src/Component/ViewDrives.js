import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const username = 'admin';
const password = 'password123';
const base64Credentials = btoa(`${username}:${password}`); 


function ViewDrives() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/Vaccine/AllDrives',{headers: {
              'Authorization': `Basic ${base64Credentials}`}}); 
          setData(response.data);
  
        } catch (err) {
          setError(err);
        }
      };
   fetchData();
    }, []);
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Vname</th>
            <th>DriveDate</th>
            <th>AvailableDoses</th>
            <th>ApplicableClass</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.Vname}</td>
              <td>{item.DriveDate}</td>
              <td>{item.AvailableDoses}</td>
              <td>{item.ApplicableClass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default ViewDrives;  