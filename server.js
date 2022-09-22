// Setup empty JS object to act as endpoint for all routes
projectData = {
    temperature:"",
    date:"",
    userResponse:""
};

// Require Express to run server and routes
const express= require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port};`)
});

//return project data
app.get("/getData",(req,res)=>{
    res.send(projectData);
});

//Add data to server
app.post("/postData",(req,res)=>{
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    console.log(req.body);
});