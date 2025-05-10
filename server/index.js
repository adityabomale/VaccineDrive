const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./dbconfig.js');
const Vaccine_routes = require('./routes/Vaccine_routes.js');
const Student_routes = require('./routes/Student_routes.js');
const app = express();
const path = require('path');
const cors = require('cors');

//add basic authentication - pass basic auth headers to every CRUD operation in backend API calls
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


app.use(cors());
app.use(express.json());
//start server on port 3000
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

//connect to mongoDB local instance on port 27017.
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