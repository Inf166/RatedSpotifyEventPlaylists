// Action Listner für die Navigation

document.getElementById("openSongRequest").onclick = function () { 
    hideAllbut("formCreateRequest");
    document.getElementById("formCreateRequest").style.display = "block";
};
document.getElementById("openNewEvent").onclick = function () { 
    hideAllbut("formCreateEvent");
    document.getElementById("formCreateEvent").style.display = "block";
};
document.getElementById("openNewSet").onclick = function () { 
    hideAllbut("formCreateSet");
    document.getElementById("formCreateSet").style.display = "block";
};
document.getElementById("openGetSomething").onclick = function () { 
    hideAllbut("formNewGET");
    document.getElementById("formNewGET").style.display = "block";
};
document.getElementById("openDelete").onclick = function () { 
    hideAllbut("formNewDelete");
    document.getElementById("formNewDelete").style.display = "block";
};

// Schließt alle anderen offenen Operationen
function hideAllbut(openOperation){
    if(openOperation !="formCreateRequest") document.getElementById("formCreateRequest").style.display = "none";
    if(openOperation !="formCreateEvent") document.getElementById("formCreateEvent").style.display = "none";
    if(openOperation !="formCreateSet")document.getElementById("formCreateSet").style.display = "none";
    if(openOperation !="formNewGET")document.getElementById("formNewGET").style.display = "none";
    if(openOperation !="formNewDelete")document.getElementById("formNewDelete").style.display = "none";
}

// Action Listner für die Submit-Buttons
document.getElementById("createEvent").onclick = function () { 
    var eventName = document.getElementById("eventName").value;
    var eventLocation = document.getElementById("eventLocation").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventTopic = document.getElementById("eventTopic").value;
    var newEvent = {"name" : eventName, "location" : eventLocation, "date" : eventDate, "topic" : eventTopic};
};
document.getElementById("createSet").onclick = function () { 
    var setEventId = document.getElementById("setEventId").value;
    var setName = document.getElementById("setName").value;
    var setDescription = document.getElementById("setDescription").value;
    var newSet = {"eventID" : setEventId, "name" : setName, "description" : setDescription};
};
document.getElementById("createRequest").onclick = function () { 
    var requestSetId = document.getElementById("requestSetId").value;
    var requestTrackUri = document.getElementById("requestTrackUri").value;
    //TODO Check Uri and isolate the TrackID
    var newRequest = {"setID" : requestSetId, "trackID " : checkedUri};
};
document.getElementById("newGET").onclick = function () { 
    var getSearchedUri = document.getElementById("getSearchedUri").value;
};
document.getElementById("newDelete").onclick = function () { 
    var deleteUri = document.getElementById("deleteUri").value;
    var newDelete = {};
};

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() { 
    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
    aCallback(anHttpRequest.responseText);
    }
    anHttpRequest.open( "GET", aUrl, true ); 
    anHttpRequest.send( null ); 
    }
    }
    var theurl='http://api.ipinfodb.com/v3/ip-city/?key=9d64fcfdfacc213c7ddf4ef911dfe97b55e4696be3532bf8302876c09sadaad06b&format=json&ip=40.77.167.44';
    var client = new HttpClient();
    client.get(theurl, function(response) { 
    var response1 = JSON.parse(response);
    // alert(response);
    document.getElementById("statusCode").innerHTML = response1.name + ", " + response1.statusCode;
    document.getElementById("statusCode").innerHTML = response1.statusCode;
    document.getElementById("statusMessage").innerHTML = response1.statusMessage;
    document.getElementById("ipAddress").innerHTML = response1.ipAddress;
    document.getElementById("countryCode").innerHTML = response1.countryCode;
    document.getElementById("countryName").innerHTML = response1.countryName;
    document.getElementById("regionName").innerHTML = response1.regionName;
    document.getElementById("cityName").innerHTML = response1.cityName;
    document.getElementById("zipCode").innerHTML = response1.zipCode;
    document.getElementById("latitude").innerHTML = response1.latitude;
    }); 