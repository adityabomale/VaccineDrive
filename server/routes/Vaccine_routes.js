const express = require('express');
const { Vaccine } = require('../models/models.js');
const router = express.Router()

module.exports = router;
  
//Post Method
router.post('/newDrive', async (req, res) => {
    const data = new Vaccine({
        Vname: req.body.Vname,
        DriveDate: req.body.DriveDate,
        AvailableDoses: req.body.AvailableDoses,
        ApplicableClass: req.body.ApplicableClass
    })
    const proposed_date = new Date(req.body.DriveDate);
    const today = new Date();
    console.log(proposed_date);
    console.log(req.body.DriveDate);
   
    if ((proposed_date - today)/(1000 * 3600 * 24) >=15 ) 
    {
    try {
        const item = await Vaccine.find({ DriveDate: req.body.DriveDate  });
        console.log(item);
        if ((item.length==0)){
            const dataToSave = data.save();
            res.send(JSON.stringify({message: 'New vaccination schedule is created !' }));
            console.log("New vaccination schedule is created ")
        }
        else {
            res.send(JSON.stringify({ message: 'Date not available. Please choose another date.' }));
        }
    }
    catch (error) {
        res.json({message: error.message})
    }
    }
    else {
        console.log("date invalid")
        res.send(JSON.stringify({message: 'Invalid date provided, please resubmit !' }));
        }
})

//Get all Method
router.get('/AllDrives', async (req, res) => {
    try{
        console.log(req.headers);
        const data = await Vaccine.find();
        if (data) {res.json(data); console.log("all data fetched")}
        else {res.status(200).send('No upcoming vaccination planned');}
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by date Method
router.get('/Drive/date/:date', async (req, res) => {
    try {
        var item = await Vaccine.find({ DriveDate: req.params.date });
        if (item) {
            res.json(item);
            console.log("data fetched");
            } 
        else {
            res.status(404).send('Vaccine drive not found for passed date');
     }  }  
     catch(error){
        res.status(404).json({message: error.message})
    }
})

//Get by Vaccine Method
router.get('/Drive/vaccine/:vaccine', async (req, res) => {
    try {
        var item = await Vaccine.find({ Vname: req.params.vaccine });
        if (item) {
            res.json(item);
            console.log("Vaccine data fetched");
            } 
        else {
            res.status(404).send('Vaccine drive not found for passed vaccine');
     }  }  
     catch(error){
        res.status(404).json({message: error.message})
    }
})

//Get data for upcoming drive
router.get('/Drive/vaccine/Schedule/Upcoming', async (req, res) => {
    try {
        //console.log(req.headers)
        const today = new Date();
        let day = ('0' + today.getDate()).slice(-2) 
        let month = ('0' + (today.getMonth()+1)).slice(-2) 
        let year = today.getFullYear();
        current_date = `${year}-${month}-${day}`
        var item = await Vaccine.find({ DriveDate: {$gte: current_date },}).select('DriveDate -_id').sort({ DriveDate: 1 }).limit(1);
        console.log(item[0].DriveDate);
        if (item.length!=0) {
            res.send(JSON.stringify({date: item[0].DriveDate}));
            console.log("Upcoming drive fetched");
            } 
        else {
            console.log("Data not fetched");
            res.send(JSON.stringify({message: 'No upcoming vaccination drive' }));
     }  }  
     catch(error){
        res.status(404).json({message: error.message})
    }
})


//Update by drive date
router.put('/Drive/date/:date', async (req, res) => {
    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await Vaccine.findOneAndUpdate(
            { DriveDate:req.params.date }, updatedData, options        
        )
        console.log("Vaccination drive details changed")
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by date Method
router.delete('/Drive/date/:date', async (req, res) => {
    try {
        const data = await Vaccine.findOneAndDelete({ DriveDate:req.params.date })
        res.send(`Vaccination on date ${data.DriveDate} has been deleted..`)
        console.log("data deleted")
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})