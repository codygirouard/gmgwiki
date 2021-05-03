document.addEventListener('DOMContentLoaded', () => {
  const theme = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme.href = storedTheme;
  }

  themeToggle.addEventListener('click', () => {
    //if light mode
    if (theme.href.includes('light')) {
      theme.href = 'css/dark.css';
    }
    else {
      theme.href = 'css/light.css';
    }

    localStorage.setItem('theme', theme.href);
  })

  const filter = document.getElementById('filter');
  const buildings = document.getElementById('buildings');
  const search = document.getElementById('search-query');
  var buildingArr = ["AFROTC Building", "Alumni Pavilion", "Apogee Stadium", "Art Building", "Athletic Center Building", "Auditorium-English Building", "Bain Hall", "Bruce Hall", "Business Leadership Building", "Chemistry Building", "Chestnut Hall", "Chilton Hall", "Clark Hall", "Coliseum", "College Inn", "Crumley Hall", "Curry Hall", "Dance and Theater", "Discovery Park Building", "Eagle Landing", "Eagle Student Services Center", "Enviornmental Science Building", "Gateway Center", "General Acadmic Building", "Goolsby Chapel", "Greek Life Center", "Hickory Hall", "Highland Street Parking Garage", "Honors Hall", "Hurley Administration Building", "Joe Greene Hall", "Ken Bahnsen Gym", "Kerr Hall", "Language Building", "Legends Hall", "Library Annex Building", "Life Sciences Complex", "Maple Street Hall", "Marquis Hall", "Matthews Hall", "McConnell Hall", "Mozart Square Hall", "Murchison Performing Arts Center", "Music Building", "Oak Street Hall", "Physical Education Building", "Physics Building", "Pohl Recreation Center", "Radio, TV, Film & Performing Arts", "Rawlins Hall", "Sage Hall", "Santa Fe Squre Hall", "Science Research Building", "Speech & Hearing Clinic", "Sycamore Hall", "Terrill Hall", "Traditions Hall", "Union Circle Parking Garage", "University Union", "UNT Frisco", "Victory Hall", "Welcome Center", "West Hall", "Willis Library", "Wooten Hall"];
  var links = ['afrotcbuilding', 'alumnipavilion', 'apogeestadium', 'artbuilding', 'athleticcenterbuilding', 'auditoriumenglishbuilding', 'bainhall', 'brucehall', 'businessleadershipbuilding', 'chemistrybuilding', 'chestnuthall', 'chiltonhall', 'clarkhall', 'coliseum', 'collegeinn', 'crumleyhall', 'curryhall', 'danceandtheater', 'discoveryparkbuilding', 'eaglelanding', 'eaglestudentservicescenter', 'enviornmentalsciencebuilding', 'gatewaycenter', 'generalacadmicbuilding', 'goolsbychapel', 'greeklifecenter', 'hickoryhall', 'highlandstreetparkinggarage', 'honorshall', 'hurleyadministrationbuilding', 'joegreenehall', 'kenbahnsengym', 'kerrhall', 'languagebuilding', 'legendshall', 'libraryannexbuilding', 'lifesciencescomplex', 'maplestreethall', 'marquishall', 'matthewshall', 'mcconnellhall', 'mozartsquarehall', 'murchisonperformingartscenter', 'musicbuilding', 'oakstreethall', 'physicaleducationbuilding', 'physicsbuilding', 'pohlrecreationcenter', 'radiotvfilmperformingarts', 'rawlinshall', 'sagehall', 'santafesqurehall', 'scienceresearchbuilding', 'speechhearingclinic', 'sycamorehall', 'terrillhall', 'traditionshall', 'unioncircleparkinggarage', 'universityunion', 'untfrisco', 'victoryhall', 'welcomecenter', 'westhall', 'willislibrary', 'wootenhall']
  if (filter) {
    var interval, i, inHTML;
    var oldValue = filter.value;
    var id = '';

    inHTML = "<tr><th>Building</th></tr>";
    for (i = 0; i < buildingArr.length; i++) {
      if (id === buildingArr[i].charAt(0)) {
        inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
      }
      else {
        id = buildingArr[i].charAt(0);
        inHTML += "<tr id='" + id + "'><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
      }
    }
    document.getElementById("buildings").innerHTML = inHTML;

    filter.addEventListener('focus', () => {
      interval = setInterval(function(){
        if (oldValue === filter.value) return;
        id = '';
        oldValue = filter.value;
        inHTML = "<tr><th>Building</th></tr>";
        for (i = 0; i < buildingArr.length; i++) {
          if (buildingArr[i].toLowerCase().includes(filter.value.toLowerCase())) {
            if (id === buildingArr[i].charAt(0)) {
              inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
            }
            else {
              id = buildingArr[i].charAt(0);
              inHTML += "<tr id='" + id + "'><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
            }
          }
        }
        document.getElementById("buildings").innerHTML = inHTML;
      }, 100);
    })

    filter.addEventListener('focusout', () => {
      clearInterval(interval);
    })
  }
  else if (buildings) {
    var i, inHTML;

    inHTML = "<tr><th>Building</th><th style='text-align:center;'><i class='fa fa-heart'></i></th></tr>";
    for (i = 0; i < buildingArr.length; i++) {
      inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td><td>0</td></tr>";
    }
    document.getElementById("buildings").innerHTML = inHTML;
  }
  else if (search) {
    var i, inHTML = "", x;
    x = 0;
    for (i = 0; i < buildingArr.length; i++) {
      if (buildingArr[i].toLowerCase().includes(search.innerHTML.toLowerCase())) {
        inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
        x += 1;
      }
    }

    if (x === 0) {
      inHTML = "<tr><td>No results found!</td></tr>";
    }
    document.getElementById("search-buildings").innerHTML = inHTML;

  }

})
