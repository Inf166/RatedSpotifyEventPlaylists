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
    var displaystyle = getSearchedUri.split('/', 1);
    get(uri, displaystyle);
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
        if (request.readyState === 4 && request.status >= 200 && request.status <= 300) {
            document.getElementById("output").innerHTML = `<h2 style="color: green;">${request.status} Eintrag wurde erfolgreich hinzugef&uml;gt.</h2>`;
        }else{
            document.getElementById("output").innerHTML = `<h2 style="color: red;">${request.status} Ein Fehler ist aufgetreten: ${request.responseText}</h2>`;
        }
    };
    var data = JSON.stringify(content);
    request.send(data);
}

function get(uri, displaystyle) {
    var request = new XMLHttpRequest();
    request.open('GET', uri, true);
    request.onload = function() {
    var data = JSON.parse(request.response);
    if (request.status >= 200 && request.status < 400) {
        document.getElementById("output").innerHTML = JSON.stringify(data.result.join(''), null, 4);
        console.log(data.result);     
        if(displaystyle[0] === 'sets'){
            document.getElementById("output").innerHTML = `${data.result.length>0 ? data.result.length : 'Kein' } Ergebnis${data.result.length>1 ? 'se' : ''}.
            <table>
                <tr>
                    <th>EventID</th>
                    <th>SetID</th>
                    <th>Set Name</th>
                    <th>Set Beschreibung</th>
                </tr>
                ${data.result.map((set)=>{
                    return `
                    <tr>
                        <td>${set.event._id}</td>
                        <td>${set._id}</td>
                        <td>${set.name}</td>
                        <td>${set.description}</td>
                    </tr>`
                }).join('')}
            </table>
            `;
        }else if(displaystyle[0]==='events'){
            document.getElementById("output").innerHTML = `${data.result.length>0 ? data.result.length : 'Kein' } Ergebnis${data.result.length>1 ? 'se' : ''}.
            <table>
                <tr>
                    <th>EventID</th>
                    <th>Event Name</th>
                    <th>Event Standort</th>
                    <th>Event Datum</th>
                    <th>Event Thema</th>
                </tr>
                ${data.result.map((event)=>{
                    return `
                    <tr>
                        <td>${event._id}</td>
                        <td>${event.name}</td>
                        <td>${event.location}</td>
                        <td>${event.date}</td>
                        <td>${event.topic}</td>
                    </tr>`
                }).join('')}
            </table>
            `;
        }else if(displaystyle[0]==='requests'){
            document.getElementById("output").innerHTML = `${data.result.length>0 ? data.result.length : 'Kein' } Ergebnis${data.result.length>1 ? 'se' : ''}.
            <table>
                <tr>
                    <th>SongID</th>
                    <th>Song SetID</th>
                    <th>Song Set Name</th>
                    <th>Song SpotifyID</th>
                    <th>Song Name</th>
                    <th>Song Artist</th>
                    <th>Song L&auml;nge</th>
                    <th>Song Populatit&auml;t</th>
                    <th>Song Akustik</th>
                    <th>Song Tanzbarkeit</th>
                    <th>Song Energie</th>
                    <th>Song Instrumentalit&auml;t</th>
                    <th>Song Lebendigkeit</th>
                    <th>Song Lautst&auml;rke</th>
                    <th>Song Sprachlastigkeit</th>
                    <th>Song Key</th>
                    <th>Song BPM</th>
                   
                </tr>
                ${data.result.map((request)=>{
                    return `
                    <tr>
                        <td>${request._id}</td>
                        <td>${request.set._id}</td>
                        <td>${request.set.name}</td>
                        <td>${request.track_id}</td>
                        <td>${request.name}</td>
                        <td>${request.artist}</td>
                        <td>${(request.duration_ms/1000/60).toFixed(2)} min</td>
                        <td>${request.popularity}</td>
                        <td>${request.acousticness}</td>
                        <td>${request.danceability}</td>
                        <td>${request.energy}</td>
                        <td>${request.instrumentalness}</td>
                        <td>${request.liveness}</td>
                        <td>${request.loudness}</td>
                        <td>${request.speechiness}</td>
                        <td>${request.valence}</td>
                        <td>${request.tempo}</td>
                        
                    </tr>`
                }).join('')}
            </table>
            `;
        }
    } else {
        document.getElementById("output").innerHTML = `<h2 style="color: red;">${request.status} Ein Fehler ist aufgetreten: ${request.responseText}</h2>`;
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
        if (request.readyState === 4 && request.status >= 200 && request.status <= 300) {
            document.getElementById("output").innerHTML = `<h2 style="color: green;">${request.status} Erfolgreich gelöscht</h2>`;
        }else{
            document.getElementById("output").innerHTML = `<h2 style="color: red;">${request.status} Ein Fehler ist aufgetreten: ${request.responseText}</h2>`;
        }
    };
    var data = JSON.stringify(content);
    request.send(data);
}