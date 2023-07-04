setTimeout(function(){
    console.log("SetTimeout function triggered");
    getDataAjax();
},500);

// Create an XMLHttpRequest object to establish asynchronous communictaion between the 
var request = new XMLHttpRequest();
var idSelectedEvent = -1;

//call the php file that retreives names of local events
let getDataAjax = () => {
    console.log("Fetching Local Events");

    url = "./php/getEvents.php";
    request.onload = displayData;
    request.open("GET",url);
    request.send("");
}

//display the list of events retreived under the "data" div
let displayData = () => {
    console.log("Displaying local events");

    var response = JSON.parse(request.responseText);

    console.log("response has a length of " + response.length);

    theDivElement = document.getElementById("event_list");
    var eventName = null;

    for(let i = 0; i < response.length; i++){
        //get the name of the event and display it with an onclick method passing its index
        eventName = response[i].name;
        console.log("Event: " + eventName);
        theDivElement.innerHTML += "<p onclick=getEventData(" + i + ")>" + eventName + "</p>";
    }
}

//get the details of an event from a specific id passed in
let getEventData = (i) => {
    //create a key/value pair fo tehe data to send
    idSelectedEvent = i + 1;
    var data = "id=" + idSelectedEvent;

    request.onload = displayEventData;
    request.open("POST","./php/getEventData.php",true);
    request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    request.send(data);
}

//display the information returned of the selected event
let displayEventData = () => {
    theDivElement = document.getElementById("event_info");
    theUpdateDiv = document.getElementById("update_info");
    var response = JSON.parse(request.responseText);

    if(response.length > 0){
        console.log("Displaying event" + response[0].name);
        theDivElement.innerHTML = "<p>" + response[0].name + "</p>";
        theDivElement.innerHTML += "<p> Category: " + response[0].category + "</p>";
        theDivElement.innerHTML += "<p> Time: " + response[0].time + ", Date: " + response[0].day + "/" + response[0].month + "</p>";
        theDivElement.innerHTML += "<p> Cost: $" + response[0].cost + "</p>";
        theDivElement.innerHTML += "<p> Location: " + response[0].location + "</p>";
        theDivElement.innerHTML += "<p> Note: " + response[0].notes + "</p>";
        theDivElement.innerHTML += `<button onclick="getWeather('${response[0].lon_lat}')">Request Weather</button>`;

        theUpdateDiv.innerHTML = `<label for="eName">Event Name</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eName" value="${response[0].name}"><br><br>`;
        
        theUpdateDiv.innerHTML += `<label for="eCategory">Event Category</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eCategory" value="${response[0].category}"><br><br>`;

        theUpdateDiv.innerHTML += `<label for="eTime">Event Time</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eTime" value="${response[0].time}"><br><br>`;

        theUpdateDiv.innerHTML += `<label for="eDate">Event Date</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eDate" value="${response[0].day}"><br><br>`;

        theUpdateDiv.innerHTML += `<label for="eCost">Event Cost</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eCost" value="${response[0].cost}"><br><br>`;

        theUpdateDiv.innerHTML += `<label for="eLocation">Event Location</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eLocation" value="${response[0].location}"><br><br>`;

        //theUpdateDiv.innerHTML += `<label for="eLonLat">Event Longitude, Latitude</label>`;
        //theUpdateDiv.innerHTML += `<input type="text" id="eLonLat" value="${response[0].lon_lat}"><br><br>`;

        theUpdateDiv.innerHTML += `<label for="eNote">Event Note</label>`;
        theUpdateDiv.innerHTML += `<input type="text" id="eNote" value="${response[0].notes}"><br><br>`;

        theUpdateDiv.innerHTML += `<button onclick="updateEvent()">Update Event Information</button>`;

    }
    else{
        console.error("Response had a length smaller than 0");
    }
}

//Display the weather data on the page about the latitude and longitude passed in
let getWeather = (lat_lon) => {

    latLonArray = lat_lon.split(",");
    var lat = latLonArray[0].trim();
    var lon = latLonArray[1].trim();
    var apiKey;

    try{
        fetch('./php/config.php')
        .then(response => response.json())
        .then(data => {
            var apiKey = data;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}` + apiKey;
        
            //get the weather data and format it as json
            try{
                fetch(url,{method: 'GET'})
                .then(response => response.json())
                .then(displayWeather);
            }
            catch(error){
                console.error(error);
            }
        });
    }
    catch{
        console.error("Failed to fetch api key");
    }
}

//display the weather from the json object passed in
let displayWeather = (response) => {
    try{
        console.log(response.weather[0].main);
        document.getElementById("event_info").innerHTML += `<p>Weather is ${response.weather[0].main}</p>`;
    }
    catch(error){
        console.error("DISPLAY WEATHER CATCH ACTIVATED BECAUSE: " + error);
    }
}

//update the details of the selected event
let updateEvent = () => {
    if(idSelectedEvent != -1){
        console.log("You have chosen to update event with id: " + idSelectedEvent);

        //get all the details that could be altered
        var eName = formatString(document.getElementById("eName").value);
        var eCategory = formatString(document.getElementById("eCategory").value);
        var eTime = formatString(document.getElementById("eTime").value);
        var eDate = formatString(document.getElementById("eDate").value);
        var eCost = formatString(document.getElementById("eCost").value);
        var eLocation = formatString(document.getElementById("eLocation").value);
        var eNote = formatString(document.getElementById("eNote").value);


        //send the data as a JSON object to the database to update the event
        request.onload = displayUpdatedData;
        request.open("POST","./php/updateEvent.php",true);
        request.setRequestHeader('Content-Type','application/json');

        let data = JSON.stringify({name: eName, category: eCategory, time: eTime, date: eDate, cost: eCost, location: eLocation, notes: eNote, id: idSelectedEvent});
        request.send(data);
    }
}

//display the events with the updated data
let displayUpdatedData = () => {
    console.log("displayUpdatedData triggered");
    console.log(request.responseText);
    alert(request.responseText);

    //clear the data on the page
    home();

}

//clear the events and load them in again
function home(){
    //clear the data on the page
    idSelectedEvent = -1;
    document.getElementById("event_list").innerHTML = "";
    document.getElementById("event_info").innerHTML = "";
    document.getElementById("update_info").innerHTML = "";
    //display the list of event names again
    getDataAjax();
}

//format a string so it can be used as a MySQL query
function formatString(query){
    query = query.replace("'","''");
    return query;
}