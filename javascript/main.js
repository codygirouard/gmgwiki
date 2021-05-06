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
  $("#user-error").html("At least 2 characters!");
  $("#pass-error").html("At least 6 characters!");
  $("#login-button").html("Login");
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
  var logout = $("#logout");
  var storedUser = localStorage.getItem('user');

  if (storedUser && storedUser.length > 2) {
    $("#pfp-img").css("color", "#FBFB3C");
  }

  btn.click(function() {
    storedUser = localStorage.getItem('user');
    if (!storedUser || storedUser.length < 2) {
      modal.css("display", "block");
    } else {
      if ($("#loginDrop").is(":hidden")) {
        $("#loginDrop").show(100);
      } else {
        $("#loginDrop").hide(100);
      }
    }
  })

  exit.click(function() {
    modal.css("display", "none");
    clearLogin();
  })

  logout.click(function() {
    localStorage.setItem('user', '');
    $("#pfp-img").css("color", "white");
    $("#loginDrop").hide(100);
  })

  $(window).mousedown(function(e) {
    if (e.target.id == 'login') {
      modal.css("display", "none");
      clearLogin();
    } else if (e.target.id != 'pfp-img' && e.target.id != 'logout') {
      $("#loginDrop").hide(100);
    }
  })

  var user = $("#username");
  var pwd = $("#pwd");
  var loginbtn = $("#login-button");

  loginbtn.click(function() {
    var pass = pwd.val();
    var username = user.val();

    if (pass.length >= 6 && username.length >= 2) {
      $("#pass-error").css("display", "none");
      if (checkUser(username)) {
        $("#user-error").css("display", "none");
        $("#pass-error").css("display", "none");

        $.ajax({
          type: "POST",
          url: 'php/functions.php',
          dataType: 'json',
          data: {function: 'login', user: username, pwd: pass},

          success: function (obj, textstatus) {
            if (obj.error) {
              if (obj.error.includes('Incorrect Password')) {
                $("#pass-error").css("display", "table-cell");
                $("#pass-error").html("Wrong Password!");
              }
              else {
                $("#user-error").css("display", "table-cell");
                $("#user-error").html("Sorry, could not create user!");
              }
            }
            else {
              localStorage.setItem('user', username);
              $("#pfp-img").css("color", "#FBFB3C");
              if (obj.new) {
                // new account created
                loginbtn.html("Account Created &#10004;");
                setTimeout(function() {
                  modal.css("display", "none");
                  clearLogin();
                }, 1000);
              }
              else {
                // login
                loginbtn.html("Login Successful &#10004;");
                setTimeout(function() {
                  modal.css("display", "none");
                  clearLogin();
                }, 1000);
              }
            }
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
        $("#user-error").html("At least 2 characters!");
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
