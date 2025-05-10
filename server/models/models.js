const mongoose = require('mongoose');

const StudSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    Sname: {
        required: true,
        type: String
    },
    Sclass: {
        required: true,
        type: String
    },
    id: {
        required: true,
        type: String
    },
    vaccineStatus: {
        required: true,
        type: String
    },
    vaccineDate: {
        required: true,
        type: String
    }           
});

const VaccineSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    Vname: {
        required: true,
        type: String
    },
    DriveDate: {
        required: true,
        type: String
    },
    AvailableDoses: {
        required: true,
        type: String
    } ,
    ApplicableClass: {
        required: true,
        type: String
    }       
});

const Students = mongoose.model('Students', StudSchema);
const Vaccine = mongoose.model('Vaccine', VaccineSchema);

module.exports = {Students,Vaccine};