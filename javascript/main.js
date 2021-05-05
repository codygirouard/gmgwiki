document.addEventListener('DOMContentLoaded', () => {
  const theme = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme.href = storedTheme;
  }

  themeToggle.addEventListener('click', () => {
    // if light mode
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

function clearLogin() {
  $("#username").val('');
  $("#pwd").val('');
  $("#user-error").css("display", "none");
  $("#pass-error").css("display", "none");
  $("#user-error").html("Incorrect length");
}

function checkUser(str) {
  var code, i, len;

  code = str.charCodeAt(0);
  if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
    return false;
  }

  for (i = 1, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) &&
        !(code > 64 && code < 91) &&
        !(code > 96 && code < 123)) {
      return false;
    }
  }
  return true;
};

$(document).ready(function(){
  var modal = $("#login");
  var btn = $("#pfp-button");
  var exit = $("#close");

  btn.click(function() {
    modal.css("display", "block");
  })

  exit.click(function() {
    modal.css("display", "none");
    clearLogin();
  })

  $(window).mousedown(function(e) {
    if (e.target.id == 'login') {
      modal.css("display", "none");
      clearLogin();
    }
  })

  var user = $("#username");
  var pwd = $("#pwd");
  var loginbtn = $("#login-button");

  loginbtn.click(function() {
    var pass = pwd.val();
    var username = user.val();

    if (pass.length >= 6 && username.length >= 2) {
      if (checkUser(username)) {
        $("#user-error").css("display", "none");
        $("#pass-error").css("display", "none");

        $.ajax({
            type: "POST",
            url: 'php/functions.php',
            dataType: 'json',
            data: {function: 'login', user: username, pwd: pass},

            success: function (obj, textstatus) {
                          $(document).prop('title', obj.name + ' - GMG Wiki');
                          $("#building-name").html(obj.name);
                          $("#desc").html(obj.descr);
                          $("#images-name").html('Images of ' + obj.name);
                          $("#address").html(obj.addr);
                          $("#prim-use").html(obj.prim);
                          $("#academic").html(obj.academic);

                          obj.eagle = obj.eagle.replace(/,/g, ", ");
                          obj.fs = obj.fs.replace(/,/g, ", ");
                          obj.fcs = obj.fcs.replace(/,/g, ", ");
                          obj.rr = obj.rr.replace(/,/g, ", ");
                          obj.r = obj.r.replace(/,/g, ", ");
                          obj.ar = obj.ar.replace(/,/g, ", ");

                          if (obj.eagle == 'None') {
                            $("#eagle").html('<i class="fa fa-times""></i>');
                          } else {
                            $("#eagle").html(obj.eagle);
                          }
                          if (obj.fs == 'None') {
                            $("#fs").html('<i class="fa fa-times""></i>');
                          } else {
                            $("#fs").html(obj.fs);
                          }
                          if (obj.fcs == 'None') {
                            $("#fcs").html('<i class="fa fa-times""></i>');
                          } else {
                            $("#fcs").html(obj.fcs);
                          }
                          if (obj.rr == 'None') {
                            $("#rr").html('<i class="fa fa-times""></i>');
                          } else {
                            $("#rr").html(obj.rr);
                          }
                          if (obj.r == 'None') {
                            $("#r").html('<i class="fa fa-times""></i>');
                          } else {
                            $("#r").html(obj.r);
                          }
                          if (obj.ar == 'None') {
                            $("#ar").html('<i class="fa fa-times""></i>');
                          } else {
                            $("#ar").html(obj.ar);
                          }

                          if (obj.printer == 1) {
                            $("#printers").removeClass('fa-times');
                            $("#printers").addClass('fa-check');
                          }
                          if (obj.tutor == 1) {
                            $("#tutoring").removeClass('fa-times');
                            $("#tutoring").addClass('fa-check');
                          }

                          $("#img1").attr("src", "images/" + obj.id + "1.jpg");
                          $("#img2").attr("src", "images/" + obj.id + "2.jpg");
                          $("#img3").attr("src", "images/" + obj.id + "3.jpg");

                          $("#img1").attr("alt", "Picture of " + obj.name);
                          $("#img2").attr("alt", "Picture of " + obj.name);
                          $("#img3").attr("alt", "Picture of " + obj.name);

                          $("#google-map").attr('src', obj.google);
                    }
        });

      }
      else {
        $("#user-error").html("Only letters/numbers, first character has to be letter");
        $("#user-error").css("display", "table-cell");
      }
    }
    else {
      if (pass.length < 6)
      {
        $("#pass-error").css("display", "table-cell");
      }
      else {
        $("#pass-error").css("display", "none");
      }
      if (username.length < 2) {
        $("#user-error").html("Incorrect length");
        $("#user-error").css("display", "table-cell");
      }
      else {
        if (checkUser(username)) {
          $("#user-error").css("display", "none");
        }
        else {
          $("#user-error").html("Only letters/numbers, first character has to be letter");
          $("#user-error").css("display", "table-cell");
        }
      }
    }

  })
})
