document.addEventListener("DOMContentLoaded",()=>{
 /*Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=b708249b0a1d4c731078cf6e9bf44801&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//Adding Data to Server
const postData = async (url = "" , Data={})=>{
    const response = await fetch("/postData" , {
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(Data),
    });

try{
    const newData = await response.json();
    console.log(newData);
    return newData;
}
catch(error){
    console.log("Error",error)
}
}

//Get Data from openWeatherMap api
const GetData = async (URL,Code,Key,userResponse)=>{
    const res = await fetch(URL+Code+Key);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error "+ error)
    }
        
};

//Button Click Event
document.getElementById("generate").addEventListener("click",async ()=>{
    const zipCode = document.getElementById("zip").value;
    const userResponse = document.querySelector("#feelings").value;

//Show Data To User
const showData = async (url)=>{
    const respo = await fetch(url);
    try{
        const data = await respo.json();
        //Selecting UI elements to update 
        document.querySelector("#date").innerHTML = "Date is: " + data.date;
        document.querySelector("#temp").innerHTML = "Temp is: " + data.temperature;
        document.querySelector("#content").innerHTML = "Feeling is: " + data.userResponse;
    }catch(error){
        console.log("error"+error);
    }
};
// Calling Functions
GetData(baseURL,zipCode,apiKey).then((data)=>{
    postData("/postData",{date , temperature:data.main.temp , userResponse});
    showData("getData");
});

});
});





