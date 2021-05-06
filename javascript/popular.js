$(document).ready(function(){
  // wait document load
  // building names
  var buildingArr = ["AFROTC Building", "Alumni Pavilion", "Apogee Stadium", "Art Building", "Athletic Center Building", "Auditorium-English Building", "Bain Hall", "Bruce Hall", "Business Leadership Building", "Chemistry Building", "Chestnut Hall", "Chilton Hall", "Clark Hall", "Coliseum", "College Inn", "Crumley Hall", "Curry Hall", "Dance and Theater", "Discovery Park Building", "Eagle Landing", "Eagle Student Services Center", "Enviornmental Science Building", "Gateway Center", "General Acadmic Building", "Goolsby Chapel", "Greek Life Center", "Hickory Hall", "Highland Street Parking Garage", "Honors Hall", "Hurley Administration Building", "Joe Greene Hall", "Ken Bahnsen Gym", "Kerr Hall", "Language Building", "Legends Hall", "Library Annex Building", "Life Sciences Complex", "Maple Street Hall", "Marquis Hall", "Matthews Hall", "McConnell Hall", "Mozart Square Hall", "Murchison Performing Arts Center", "Music Building", "Oak Street Hall", "Physical Education Building", "Physics Building", "Pohl Recreation Center", "Radio, TV, Film & Performing Arts", "Rawlins Hall", "Sage Hall", "Santa Fe Squre Hall", "Science Research Building", "Speech & Hearing Clinic", "Sycamore Hall", "Terrill Hall", "Traditions Hall", "Union Circle Parking Garage", "University Union", "UNT Frisco", "Victory Hall", "Welcome Center", "West Hall", "Willis Library", "Wooten Hall"];
  // building ids
  var links = ['afrotcbuilding', 'alumnipavilion', 'apogeestadium', 'artbuilding', 'athleticcenterbuilding', 'auditoriumenglishbuilding', 'bainhall', 'brucehall', 'businessleadershipbuilding', 'chemistrybuilding', 'chestnuthall', 'chiltonhall', 'clarkhall', 'coliseum', 'collegeinn', 'crumleyhall', 'curryhall', 'danceandtheater', 'discoveryparkbuilding', 'eaglelanding', 'eaglestudentservicescenter', 'enviornmentalsciencebuilding', 'gatewaycenter', 'generalacadmicbuilding', 'goolsbychapel', 'greeklifecenter', 'hickoryhall', 'highlandstreetparkinggarage', 'honorshall', 'hurleyadministrationbuilding', 'joegreenehall', 'kenbahnsengym', 'kerrhall', 'languagebuilding', 'legendshall', 'libraryannexbuilding', 'lifesciencescomplex', 'maplestreethall', 'marquishall', 'matthewshall', 'mcconnellhall', 'mozartsquarehall', 'murchisonperformingartscenter', 'musicbuilding', 'oakstreethall', 'physicaleducationbuilding', 'physicsbuilding', 'pohlrecreationcenter', 'radiotvfilmperformingarts', 'rawlinshall', 'sagehall', 'santafesqurehall', 'scienceresearchbuilding', 'speechhearingclinic', 'sycamorehall', 'terrillhall', 'traditionshall', 'unioncircleparkinggarage', 'universityunion', 'untfrisco', 'victoryhall', 'welcomecenter', 'westhall', 'willislibrary', 'wootenhall']

  // get request for each building's likes
  $.ajax({
      type: "GET",
      url: 'php/functions.php',
      dataType: 'json',
      // getLikes();
      data: {function: 'getLikes'},

      success: function (obj, textstatus) {
        var i, inHTML;

        inHTML = "<tr><th>Building</th><th style='text-align:center;'><i class='fa fa-heart'></i></th></tr>";
        for (i = 0; i < buildingArr.length; i++) {
          // insert names into table, obj holds buildings likes (obj[buildingName] = numLikes)
          inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td><td>" + obj[buildingArr[i]] + "</td></tr>";
        }
        $("#buildings").html(inHTML);

        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("buildings");
        switching = true;
        while (switching) {
          // sort buildings by likes (DESC)
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            y = rows[i].getElementsByTagName("TD")[1];
            x = rows[i + 1].getElementsByTagName("TD")[1];
            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }
  });
});
