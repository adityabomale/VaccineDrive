import React, { useState, useEffect } from 'react';
import axios from 'axios';
const username = 'admin';
const password = 'password123';
const base64Credentials = btoa(`${username}:${password}`); 

const Dashboard = () => {
    console.log("inside dashboard function");
    const [datacount, setDatacount] = useState([])
    const [dataenroll, setDataenroll] = useState([]) 
    const [upcomVac, setupcomVac] = useState([])   
    useEffect(() => {

        const fetchUpComVac = async () => {
            try {
              const Upcoming_Dates = await axios.get('http://localhost:3000/Vaccine/Drive/vaccine/Schedule/Upcoming',{headers: {
                  'Authorization': `Basic ${base64Credentials}`}})
                  setupcomVac(Upcoming_Dates.data);  
                  console.log(Upcoming_Dates.upcomVac);        
            } catch(error){console.error('Error:', error);}
          } 
        const fetchVacData = async () => {
          try {
            const response_vaccine = await axios.get('http://localhost:3000/Student/vaccinationCount',{headers: {
                'Authorization': `Basic ${base64Credentials}`}})
                setDatacount(response_vaccine.data);  
                console.log(response_vaccine.datacount);        
          } catch(error){console.error('Error:', error);}
        } 
        const fetchStudData = async () => {
            try {
              const response_student = await axios.get('http://localhost:3000/Student/studentCount',{headers: {
                  'Authorization': `Basic ${base64Credentials}`}})
                  setDataenroll(response_student.data);  
                  console.log(response_student.dataenroll);        
            } catch(error){console.error('Error:', error);}
          }         
        console.log('fetching vaccine count'); 
        fetchVacData();      
        console.log('fetching student count');
        fetchStudData();
        console.log('fetching upcoming dates');
        fetchUpComVac();
    }, []);

    return (
        <div>
       <p>Total enrolled students: {dataenroll.result}</p>
       <p>Students vaccinated: {datacount.result}</p>

         <p>Upcoming Drive on: {upcomVac.date}</p>
        </div>
      );

}
export default Dashboard;