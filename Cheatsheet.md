# POST
## NEW EVENT
http://lowtrust.club:3000/events/
content: {"name" : "NIBIRII 2020 ENTRY", "location" : "Bootshaus", "date" : "24012020", "topic" : "Techno, DnB, Goa, Psychodelic"}
## NEW SET
http://lowtrust.club:3000/sets/
content: {"eventID" : (from GET Events), "name" : "JOREK", "description" : "Melodic Techno"} 
## NEW SONGREQUEST
http://lowtrust.club:3000/requests/
content: {"setID" : (from GET Sets), "trackID" : "https://open.spotify.com/track/0GOxBVl062KmJt4Spnvjuu"}
# GET
## GET alle Events
http://lowtrust.club:3000/events/
## GET ein Event
http://lowtrust.club:3000/events/(from GET Events)
## GET alle Sets
http://lowtrust.club:3000/sets/
## GET ein Set
http://lowtrust.club:3000/sets/(from GET Sets oder Event)
## GET ein Set aber sortiert nach stimmen
http://lowtrust.club:3000/sets/(from GET Sets oder Event)?orderBy=votes
## GET alle Requests
http://lowtrust.club:3000/requests/
## GET ein Request
http://lowtrust.club:3000/requests/(from GET requests)
# DELETE
## DELETE ein Event
http://lowtrust.club:3000/events/(from GET Events)
## DELETE ein Set
http://lowtrust.club:3000/sets/(from GET Sets oder Event)
## DELETE ein Request
http://lowtrust.club:3000/requests/(from GET requests)