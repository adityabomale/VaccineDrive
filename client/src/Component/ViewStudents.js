import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

const username = 'admin';
const password = 'password123';
const base64Credentials = btoa(`${username}:${password}`); 

function ViewStudents() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/Student/allStudents',{headers: {
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
            <th>Sname</th>
            <th>Sclass</th>
            <th>id</th>
            <th>vaccineStatus</th>
            <th>vaccineDate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.Sname}</td>
              <td>{item.Sclass}</td>
              <td>{item.id}</td>
              <td>{item.vaccineStatus}</td>
              <td>{item.vaccineDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
export default ViewStudents;  