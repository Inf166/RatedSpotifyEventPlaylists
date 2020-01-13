var serviceURL = "http://localhost:3000/";
const notes = [ 'C', 'C#', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A', 'b', 'B' ];

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
document.getElementById("createEvent").onclick = function newEvent() { 
    var eventName = document.getElementById("eventName").value;
    var eventLocation = document.getElementById("eventLocation").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventTopic = document.getElementById("eventTopic").value;
    var newEvent = {"name" : eventName, "location" : eventLocation, "date" : eventDate, "topic" : eventTopic};
    var newpath = serviceURL + "events/";
    post(newpath, newEvent);
};
document.getElementById("createSet").onclick = function newSet() { 
    var setEventId = document.getElementById("setEventId").value;
    var setName = document.getElementById("setName").value;
    var setDescription = document.getElementById("setDescription").value;
    var newSet = {"eventID" : setEventId, "name" : setName, "description" : setDescription};
    var newpath = serviceURL + "sets/";
    post(newpath, newSet);
};
document.getElementById("createRequest").onclick = function newRequest() { 
    var requestSetId = document.getElementById("requestSetId").value;
    var requestTrackUri = document.getElementById("requestTrackUri").value;
    var newRequest = {"setID" : requestSetId, "trackID" : requestTrackUri};
    var newpath = serviceURL + "requests/";
    post(newpath, newRequest);
};
document.getElementById("newGET").onclick = function newGet() { 
    var getSearchedUri = document.getElementById("getSearchedUri").value;
    
    var isDetailFor;
    var radioslookingfor = document.getElementsByName('lookingfor');
    for (var i = 0, length = radioslookingfor.length; i < length; i++) {
      if (radioslookingfor[i].checked) {
          isDetailFor = radioslookingfor[i].value;
        break;
      }
    }
    var displaystyle = isDetailFor;
    if(getSearchedUri.length >=10)displaystyle = isDetailFor + 'detail';

    var searchquery = '';
    var radiossearchquery = document.getElementsByName('searchquery');
    for (var i = 0, length = radiossearchquery.length; i < length; i++) {
      if (radiossearchquery[i].checked) {
        searchquery = radiossearchquery[i].value;
        break;
      }
    }
    var uri = serviceURL + isDetailFor + getSearchedUri + searchquery
    console.log('Uri: ' + uri);
    console.log('Displaystyle: ' + isDetailFor);
    get(uri, displaystyle);
};
document.getElementById("newDelete").onclick = function newDelete() { 
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
    if(temp === "requests/"){
        newDelete = {"songID" : deleteUri};
    } if(temp === "events/"){
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
            document.getElementById("output").innerHTML = `<h2 style="color: green;">> [${request.status}] Eintrag wurde erfolgreich hinzugef&uuml;gt.</h2>`;
        }else{
            document.getElementById("output").innerHTML = `<h2 style="color: red;">> [${request.status}] Ein Fehler ist aufgetreten: ${request.responseText}</h2>`;
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
        // document.getElementById("output").innerHTML = JSON.stringify(data.result.join(''), null, 4);
        console.log(data.result);     
        console.log(displaystyle);
        if(displaystyle === 'requests/detail'){
            document.getElementById("output").innerHTML = `
            <h2>Song Infos</h2>
            <table>
                <tr>
                    <th>SongID</th>
                    <th>   SpotifyID</th>
                    <th>   Name</th>
                    <th>   Artist</th>
                    <th>   L&auml;nge</th>
                    <th>   Abgestimmt</th>
                    <th>   Populatit&auml;t</th>
                    <th>   Akustik</th>
                    <th>   Tanzbarkeit</th>
                    <th>   Energie</th>
                    <th>   Instrumentalit&auml;t</th>
                    <th>   Lebendigkeit</th>
                    <th>   Lautst&auml;rke</th>
                    <th>   Sprachlastigkeit</th>
                    <th>   Key</th>
                    <th>   BPM</th>
                   
                </tr>
                <tr>
                    <td>${data.result._id}</td>
                    <td>${data.result.track_id}</td>
                    <td>${data.result.name}</td>
                    <td>${data.result.artist}</td>
                    <td>${(data.result.duration_ms/1000/60).toFixed(2)} min </td>
                    <td>${data.result.votes}</td>
                    <td>${data.result.popularity}</td>
                    <td>${data.result.acousticness}</td>
                    <td>${data.result.danceability}</td>
                    <td>${data.result.energy}</td>
                    <td>${data.result.instrumentalness}</td>
                    <td>${data.result.liveness}</td>
                    <td>${data.result.loudness}</td>
                    <td>${data.result.speechiness}</td>
                    <td>${data.result.key >= 0 && data.result.key <= 11 ? notes[data.result.key] : 'no key'}</td>
                    <td>${data.result.tempo}</td>
                </tr>
            </table>
            `;
        }else if(displaystyle === 'sets/detail'){
            document.getElementById("output").innerHTML = `
            <h2>Set Info</h2>
            <table>
                <tr>
                    <th>EventID</th>
                    <th>SetID</th>
                    <th> Name</th>
                    <th> Beschreibung</th>
                </tr>
                <tr>
                    <td>${data.result.event._id}</td>
                    <td>${data.result._id}</td>
                    <td>${data.result.name}</td>
                    <td>${data.result.description}</td>
                </tr>
            </table>
            <h2>Tracks</h2>
            <table>
                <tr>
                    <th>SongID</th>
                    <th>   SpotifyID</th>
                    <th>   Name</th>
                    <th>   Artist</th>
                    <th>   L&auml;nge</th>
                    <th>   Abgestimmt</th>
                    <th>   Populatit&auml;t</th>
                    <th>   Akustik</th>
                    <th>   Tanzbarkeit</th>
                    <th>   Energie</th>
                    <th>   Instrumentalit&auml;t</th>
                    <th>   Lebendigkeit</th>
                    <th>   Lautst&auml;rke</th>
                    <th>   Sprachlastigkeit</th>
                    <th>   Key</th>
                    <th>   BPM</th>
                   
                </tr>
                ${data.result.requests.map((request)=>{
                    return `
                    <tr>
                        <td>${request._id}</td>
                        <td>${request.track_id}</td>
                        <td>${request.name}</td>
                        <td>${request.artist}</td>
                        <td>${(request.duration_ms/1000/60).toFixed(2)} min</td>
                        <td>${request.votes}</td>
                        <td>${request.popularity}</td>
                        <td>${request.acousticness}</td>
                        <td>${request.danceability}</td>
                        <td>${request.energy}</td>
                        <td>${request.instrumentalness}</td>
                        <td>${request.liveness}</td>
                        <td>${request.loudness}</td>
                        <td>${request.speechiness}</td>
                        <td>${request.key >= 0 && request.key <= 11 ? notes[request.key] : 'no key'}</td>
                        <td>${request.tempo}</td>
                    </tr>`;
                }).join('')}
            </table>
            `;
        }else if(displaystyle === 'events/detail'){
            document.getElementById("output").innerHTML = `
            <h2>Event Infos</h2>
            <table>
            <tr>
                <th>EventID</th>
                <th> Name</th>
                <th> Standort</th>
                <th> Datum</th>
                <th> Thema</th>
            </tr>
            <tr>
                <td>${data.result._id}</td>
                <td>${data.result.name}</td>
                <td>${data.result.location}</td>
                <td>${(JSON.stringify(data.result.date)).slice(0,2) +'.'+ (JSON.stringify(data.result.date)).slice(2,4) + '.' + (JSON.stringify(data.result.date)).slice(4) }</td>
                <td>${data.result.topic}</td>
            </tr>
        </table>
        <h2>Sets</h2>
        <table>
            <tr>
                <th>SetID</th>
                <th> Name</th>
                <th> Beschreibung</th>
            </tr>
        ${data.result.sets.map((set)=>{
            return `
            <tr>
                <td>${set._id}</td>
                <td>${set.name}</td>
                <td>${set.description}</td>
            </tr>`;
        }).join('')}
            </table>
            `;
        }else if(displaystyle === 'sets/'){
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
                    </tr>`;
                }).join('')}
            </table>
            `;
        }else if(displaystyle ==='events/'){
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
                    </tr>`;
                }).join('')}
            </table>
            `;
        }else if(displaystyle ==='requests/'){
            document.getElementById("output").innerHTML = `${data.result.length>0 ? data.result.length : 'Kein' } Ergebnis${data.result.length>1 ? 'se' : ''}.
            <table>
                <tr>
                    <th>SongID</th>
                    <th>   SpotifyID</th>
                    <th>   Name</th>
                    <th>   Artist</th>
                    <th>   L&auml;nge</th>
                    <th>   Abgestimmt</th>
                    <th>   Populatit&auml;t</th>
                    <th>   Akustik</th>
                    <th>   Tanzbarkeit</th>
                    <th>   Energie</th>
                    <th>   Instrumentalit&auml;t</th>
                    <th>   Lebendigkeit</th>
                    <th>   Lautst&auml;rke</th>
                    <th>   Sprachlastigkeit</th>
                    <th>   Key</th>
                    <th>   BPM</th>
                   
                </tr>
                ${data.result.map((request)=>{
                    return `
                    <tr>
                        <td>${request._id}</td>
                        <td>${request.track_id}</td>
                        <td>${request.name}</td>
                        <td>${request.artist}</td>
                        <td>${(request.duration_ms/1000/60).toFixed(2)} min</td>
                        <td>${request.votes}</td>
                        <td>${request.popularity}</td>
                        <td>${request.acousticness}</td>
                        <td>${request.danceability}</td>
                        <td>${request.energy}</td>
                        <td>${request.instrumentalness}</td>
                        <td>${request.liveness}</td>
                        <td>${request.loudness}</td>
                        <td>${request.speechiness}</td>
                        <td>${request.key >= 0 && request.key <= 11 ? notes[request.key] : 'no key'}</td>
                        <td>${request.tempo}</td>
                    </tr>`;
                }).join('')}
            </table>
            `;
        }
    } else {
        document.getElementById("output").innerHTML = `<h2 style="color: red;">> [${request.status}] Ein Fehler ist aufgetreten: ${request.responseText}</h2>`;
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
            document.getElementById("output").innerHTML = `<h2 style="color: green;">> [${request.status}] Erfolgreich gel&ouml;scht</h2>`;
        }else{
            document.getElementById("output").innerHTML = `<h2 style="color: red;">> [${request.status}] Ein Fehler ist aufgetreten: ${request.responseText}</h2>`;
        }
    };
    var data = JSON.stringify(content);
    request.send(data);
}