var serviceURL = "http://localhost:3000/";


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
    var newpath = serviceURL + "events/";
    post(newpath, newEvent);
};
document.getElementById("createSet").onclick = function () { 
    var setEventId = document.getElementById("setEventId").value;
    var setName = document.getElementById("setName").value;
    var setDescription = document.getElementById("setDescription").value;
    var newSet = {"eventID" : setEventId, "name" : setName, "description" : setDescription};
    var newpath = serviceURL + "sets/";
    post(newpath, newSet);
};
document.getElementById("createRequest").onclick = function () { 
    var requestSetId = document.getElementById("requestSetId").value;
    var requestTrackUri = document.getElementById("requestTrackUri").value;
    // if (requestTrackUri.startsWith('https://open.spotify.com/track/')) requestTrackUri = requestTrackUri.slice(31,requestTrackUri.length);
    var newRequest = {"setID" : requestSetId, "trackID" : requestTrackUri};
    var newpath = serviceURL + "requests/";
    post(newpath, newRequest);
};
document.getElementById("newGET").onclick = function () { 
    var getSearchedUri = document.getElementById("getSearchedUri").value;
    var uri = serviceURL + getSearchedUri;
    get(uri);
};
document.getElementById("newDelete").onclick = function () { 
    var deleteUri = document.getElementById("deleteUri").value;
    var temp;
    var radios = document.getElementsByName('tobedeleted');
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
          temp = radios[i].value;
        break;
      }
    }
    var newDelete;
    if(temp === "events/"){
        newDelete = {"eventID" : deleteUri};
    } else {
        newDelete = {"setID" : deleteUri};
    }
    var newpath = serviceURL + temp;
    deletestuff(newpath, newDelete);
};

// SERVER KOMMUNIKATION
function post (path, content) {
    var request = new XMLHttpRequest();
    var url = path;
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var json = JSON.parse(request.responseText);
            document.getElementById("output").innerHTML = JSON.stringify(json, null, 4);
        }else{
            document.getElementById("output").innerHTML = request.status;
            document.getElementById("output").innerHTML = request.responseText;
        }
    };
    var data = JSON.stringify(content);
    request.send(data);
}

function get(uri) {
    var request = new XMLHttpRequest();
    request.open('GET', uri, true);
    request.onload = function() {
    var data = JSON.parse(request.response);
    if (request.status >= 200 && request.status < 400) {
        document.getElementById("output").innerHTML = JSON.stringify(data.result, null, 4);
    } else {
        document.getElementById("output").innerHTML = request.status;
    }
}

request.send();
}

function deletestuff(uri, content){
    var request = new XMLHttpRequest();
    var url = uri;
    request.open("DELETE", url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var json = JSON.parse(request.responseText);
            document.getElementById("output").innerHTML = "Erfolgreich gelöscht";
        }else{
            document.getElementById("output").innerHTML = request.status;
        }
    };
    var data = JSON.stringify(content);
    request.send(data);
}