//import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import Dashboard from './Component/Dashboard';
import AboutCampaign from './Component/AboutCampaign';
import NewDrive from './Component/NewDrive';
import AddStudent from './Component/AddStudent';
import ViewDrives from './Component/ViewDrives';
import ViewStudents from './Component/ViewStudents';
import PageNotFound from './Component/PageNotFound';

console.log ("starting app");

function App() {

  return (
    <Router>
      <h1 style={{ textAlign: 'center',color: 'green' }}>Vaccination Portal</h1>
    <div style={{ textAlign: 'center' }}>
      <nav style={{ margin: 15 }}>
      <Link to="/" style={{ color: 'blue', textDecoration: 'none', padding: '10px' }}>Dashboard</Link>
      <Link to="/About"  style={{ color: 'blue', textDecoration: 'none', padding: '10px'}}>About Campaign</Link>
      <Link to="/NewDrive" style={{ color: 'blue', textDecoration: 'none', padding: '10px'}}>Schedule a drive</Link>
      <Link to="/ViewDrives" style={{ color: 'blue', textDecoration: 'none', padding: '10px'}}>View Drives</Link>
      <Link to="/AddStudent" style={{ color: 'blue', textDecoration: 'none', padding: '10px'}}>Enroll new student</Link>
      <Link to="/ViewStudents" style={{ color: 'blue', textDecoration: 'none', padding: '10px'}}>View Students</Link>
      </nav>
      <Routes>
      <Route exact path="/" element={<Dashboard/>} />
      <Route path="/About" element={<AboutCampaign/>} />
      <Route path="/NewDrive" element={<NewDrive/>} />
      <Route path="/ViewDrives" element={<ViewDrives/>} />
      <Route path="/ViewStudents" element={<ViewStudents/>} />
      <Route path="/AddStudent" element={<AddStudent/>} />      
      <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </div>

    </Router>
  );
}

export default App;