const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./dbconfig.js');
const Vaccine_routes = require('./routes/Vaccine_routes.js');
const Student_routes = require('./routes/Student_routes.js');
const app = express();
const path = require('path');
const cors = require('cors');


const USERNAME = "admin";
const PASSWORD = "password123";
    
const basicAuth = (req, res, next) => {
const authHeader = req.headers["authorization"];
        
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Unauthorized" });
        }
    
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");
    
    if (username === USERNAME && password === PASSWORD) {
        return next();
        }
    
    return res.status(401).json({ message: "Invalid credentials" });
};

/*
function basicAuth(req, res, next) {
    const authheader = req.headers.authorization;
    console.log(req.headers);

    if (!authheader) {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }

    const auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user == 'admin' && pass == 'password') {

        // If Authorized user
        next();
    } else {
        let err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }

}*/

app.use(cors());
app.use(express.json());
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.use(basicAuth)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Vaccine', Vaccine_routes);
app.use('/Student', Student_routes);