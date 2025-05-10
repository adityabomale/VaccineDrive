const express = require('express');
const { Students } = require('../models/models.js');
const router = express.Router()

module.exports = router;

//route to enroll new student
router.post('/addStudent', async (req, res) => {
    const data = new Students({
        Sname: req.body.Sname,
        Sclass: req.body.Sclass,
        id: req.body.id,
        vaccineStatus: req.body.vaccineStatus,
        vaccineDate:req.body.vaccineDate
    })
    //check if given student id exists for respective class
    const check_id = await Students.findOne({ id: req.body.id, Sclass: req.body.Sclass });
    console.log(check_id);
    if (check_id) {
        console.log("Student id already present");
        res.send(JSON.stringify({message: 'Student id already present' }));
        } 
    else {       
        try {
        const dataToSave = data.save();
        res.send(JSON.stringify({message: 'Student data added successfully' }));
        console.log("Student data added successfully");
    }
        catch (error) {
        res.json({message: error.message})
    }
}})

//get all students records from database
router.get('/allStudents', async (req,res) => {
    try{
        console.log(req.headers);
        const data = await Students.find();
        res.json(data)
        console.log("All students data fetched")
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//get students records using id from database
router.get('/getStudent/:id', async (req, res) => {
    try {
        const item = await Students.findOne({ id: req.params.id });
        if (item) {
            res.json(item);
            console.log("data fetched");
            } 
        else {
            res.status(404).send('Student details not found');
     }  }  
     catch(error){
        res.status(404).json({message: error.message})
    }
})

//fetch all vaccinated students
router.get('/vaccinated', async (req, res) => {
    try {
        const item = await Students.find({ vaccineStatus: "vaccinated" });
        if (item) {
            res.json(item);
            console.log("vaccinated student's data fetched");
            } 
        else {
            res.status(400).send('Student details not found');
     }  }  
     catch(error){
        res.status(404).json({message: error.message})
    }
})

//fetch vaccinated students' count
router.get('/vaccinationCount', async (req, res) => {
    try {
        const result = await Students.countDocuments({ "vaccineStatus":"vaccinated" });
        if (result){
            console.log('vaccinated students counted')
            return res.status(200).json({result});
        }
        else {
            res.status(400).send('vaccination count not available');
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})   

//fetch enrolled student count
router.get('/studentCount', async (req, res) => {
    try {
        const result = await Students.countDocuments();
        if (result){
            console.log('students counted')
            return res.status(200).json({result});
        }
        else {
            res.status(400).send('student count not available');
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 

//fetch student based on name
router.get('/getStudent/:name', async (req, res) => {
    try {
        const item = await Students.findOne({ Sname: req.params.name });
        if (item) {
            res.json(item);
            console.log("data fetched");
            } 
        else {
            res.status(404).send('Student details not found');
     }  }  
     catch(error){
        res.status(404).json({message: error.message})
    }
})
//remove student from drive
router.delete('/removeStudent/:id', async (req, res) => {
   try {
           const data = await Students.findOneAndDelete({ id: req.params.id })
           res.send(`Student with id ${data.id} has been deleted..`)
           console.log("data deleted")
       }
       catch (error) {
           res.status(400).json({ message: error.message })
    }
})

//update student record based on unique id
router.put('/updateStudent/:id', async (req, res) => {
    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await Students.findOneAndUpdate(
            { id: req.params.id }, updatedData, options        
        )
        console.log("Student details changed")
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
