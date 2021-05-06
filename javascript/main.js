// wait for page to load
document.addEventListener('DOMContentLoaded', () => {
  const theme = document.getElementById('theme');
  const themeToggle = document.getElementById('theme-toggle');

  // load saved them if available
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    theme.href = storedTheme;
  }

  // toggle light mode on button click
  themeToggle.addEventListener('click', () => {
    if (theme.href.includes('light')) {
      // if light mode
      theme.href = 'css/dark.css';
    }
    else {
      // if dark mode
      theme.href = 'css/light.css';
    }

    // save user preference
    localStorage.setItem('theme', theme.href);
  })

  // filter input box from browse.html
  const filter = document.getElementById('filter');
  // table of buildings
  const buildings = document.getElementById('buildings');
  // search input for search.php
  const search = document.getElementById('search-query');

  // list of building names
  var buildingArr = ["AFROTC Building", "Alumni Pavilion", "Apogee Stadium", "Art Building", "Athletic Center Building", "Auditorium-English Building", "Bain Hall", "Bruce Hall", "Business Leadership Building", "Chemistry Building", "Chestnut Hall", "Chilton Hall", "Clark Hall", "Coliseum", "College Inn", "Crumley Hall", "Curry Hall", "Dance and Theater", "Discovery Park Building", "Eagle Landing", "Eagle Student Services Center", "Enviornmental Science Building", "Gateway Center", "General Acadmic Building", "Goolsby Chapel", "Greek Life Center", "Hickory Hall", "Highland Street Parking Garage", "Honors Hall", "Hurley Administration Building", "Joe Greene Hall", "Ken Bahnsen Gym", "Kerr Hall", "Language Building", "Legends Hall", "Library Annex Building", "Life Sciences Complex", "Maple Street Hall", "Marquis Hall", "Matthews Hall", "McConnell Hall", "Mozart Square Hall", "Murchison Performing Arts Center", "Music Building", "Oak Street Hall", "Physical Education Building", "Physics Building", "Pohl Recreation Center", "Radio, TV, Film & Performing Arts", "Rawlins Hall", "Sage Hall", "Santa Fe Squre Hall", "Science Research Building", "Speech & Hearing Clinic", "Sycamore Hall", "Terrill Hall", "Traditions Hall", "Union Circle Parking Garage", "University Union", "UNT Frisco", "Victory Hall", "Welcome Center", "West Hall", "Willis Library", "Wooten Hall"];

  // list of building ids
  var links = ['afrotcbuilding', 'alumnipavilion', 'apogeestadium', 'artbuilding', 'athleticcenterbuilding', 'auditoriumenglishbuilding', 'bainhall', 'brucehall', 'businessleadershipbuilding', 'chemistrybuilding', 'chestnuthall', 'chiltonhall', 'clarkhall', 'coliseum', 'collegeinn', 'crumleyhall', 'curryhall', 'danceandtheater', 'discoveryparkbuilding', 'eaglelanding', 'eaglestudentservicescenter', 'enviornmentalsciencebuilding', 'gatewaycenter', 'generalacadmicbuilding', 'goolsbychapel', 'greeklifecenter', 'hickoryhall', 'highlandstreetparkinggarage', 'honorshall', 'hurleyadministrationbuilding', 'joegreenehall', 'kenbahnsengym', 'kerrhall', 'languagebuilding', 'legendshall', 'libraryannexbuilding', 'lifesciencescomplex', 'maplestreethall', 'marquishall', 'matthewshall', 'mcconnellhall', 'mozartsquarehall', 'murchisonperformingartscenter', 'musicbuilding', 'oakstreethall', 'physicaleducationbuilding', 'physicsbuilding', 'pohlrecreationcenter', 'radiotvfilmperformingarts', 'rawlinshall', 'sagehall', 'santafesqurehall', 'scienceresearchbuilding', 'speechhearingclinic', 'sycamorehall', 'terrillhall', 'traditionshall', 'unioncircleparkinggarage', 'universityunion', 'untfrisco', 'victoryhall', 'welcomecenter', 'westhall', 'willislibrary', 'wootenhall']

  if (filter) {
    // if page is browse.html
    var interval, i, inHTML;
    var oldValue = filter.value;
    var id = '';

    inHTML = "<tr><th>Building</th></tr>";
    // add all buildings into table
    for (i = 0; i < buildingArr.length; i++) {
      if (id === buildingArr[i].charAt(0)) {
        // first instance of the building's first letter
        inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
      }
      else {
        id = buildingArr[i].charAt(0);
        inHTML += "<tr id='" + id + "'><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
      }
    }
    buildings.innerHTML = inHTML;

    // when user has entered the filter input box
    filter.addEventListener('focus', () => {
      interval = setInterval(function(){
        // check user's input every 100 milliseconds
        if (oldValue === filter.value) return; // user hasn't changed input
        id = '';
        oldValue = filter.value;
        inHTML = "<tr><th>Building</th></tr>";
        for (i = 0; i < buildingArr.length; i++) {
          if (buildingArr[i].toLowerCase().includes(filter.value.toLowerCase())) {
            // search parameter is found in the building's name
            if (id === buildingArr[i].charAt(0)) {
              inHTML += "<tr><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
            }
            else {
              // first instance of the building's first letter
              id = buildingArr[i].charAt(0);
              inHTML += "<tr id='" + id + "'><td><a href='building.html?name=" + links[i] + "'>" + buildingArr[i] + "</a></td></tr>";
            }
          }
        }
        buildings.innerHTML = inHTML;
      }, 100);
    })

    // stop checking for new input when user left input box
    filter.addEventListener('focusout', () =>
      clearInterval(interval);
    })
  }
  else if (search) {
    // if page is search.php
    var i, inHTML = "", x;
    x = 0;
    for (i = 0; i < buildingArr.length; i++) {
      if (buildingArr[i].toLowerCase().includes(search.innerHTML.toLowerCase())) {
        // search parameter is found with the building's name
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

// reset html/css in login modal
function clearLogin() {
  $("#username").val('');
  $("#pwd").val('');
  $("#user-error").css("display", "none");
  $("#pass-error").css("display", "none");
  $("#user-error").html("At least 2 characters!");
  $("#pass-error").html("At least 6 characters!");
  $("#login-button").html("Login");
}

// check if username is first char = alphabet, rest = alphanumeric
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

// jQuery on page load
$(document).ready(function(){
  var modal = $("#login");
  var btn = $("#pfp-button");
  var exit = $("#close");
  var logout = $("#logout");
  var storedUser = localStorage.getItem('user');

  // if user is logged in, color in the profile pic
  if (storedUser && storedUser.length > 2) {
    $("#pfp-img").css("color", "#FBFB3C");
  }

  // pfp button is clicked
  btn.click(function() {
    storedUser = localStorage.getItem('user'); // retrieve stored user
    if (!storedUser || storedUser.length < 2) {
      // if no one is logged in, show login modal
      modal.css("display", "block");
    } else {
      // someone is logged in, give option to logout
      if ($("#loginDrop").is(":hidden")) {
        $("#loginDrop").show(100);
      } else {
        $("#loginDrop").hide(100);
      }
    }
  })

  // user clicks the X in login modal
  exit.click(function() {
    // modal now hidden
    modal.css("display", "none");
    clearLogin();
  })

  // user clicks logout
  logout.click(function() {
    // unset user and set pfp image to white
    localStorage.setItem('user', '');
    $("#pfp-img").css("color", "white");
    $("#loginDrop").hide(100);
  })

  // window has been clicked
  $(window).mousedown(function(e) {
    if (e.target.id == 'login') {
      // user clicked outside of the login modal
      modal.css("display", "none");
      clearLogin();
    } else if (e.target.id != 'pfp-img' && e.target.id != 'logout') {
      // user clicked outside of the logout dropdown
      $("#loginDrop").hide(100);
    }
  })

  var user = $("#username");
  var pwd = $("#pwd");
  var loginbtn = $("#login-button");

  // user tries to login
  loginbtn.click(function() {
    var pass = pwd.val();
    var username = user.val();

    if (pass.length >= 6 && username.length >= 2) {
      // length requirements fulfilled
      $("#pass-error").css("display", "none");
      if (checkUser(username)) {
        // username is correct format
        $("#user-error").css("display", "none");
        $("#pass-error").css("display", "none");

        // send post request to login
        $.ajax({
          type: "POST",
          url: 'php/functions.php',
          dataType: 'json',
          // login(username, pass);
          data: {function: 'login', user: username, pwd: pass},

          success: function (obj, textstatus) {
            if (obj.error) {
              // error with login
              if (obj.error.includes('Incorrect Password')) {
                // incorrect password entered
                $("#pass-error").css("display", "table-cell");
                $("#pass-error").html("Wrong Password!");
              }
              else {
                // unsuccesful attempt at creating user
                $("#user-error").css("display", "table-cell");
                $("#user-error").html("Sorry, could not create user!");
              }
            }
            else {
              // login/signup was successful
              localStorage.setItem('user', username); // set current saved user
              $("#pfp-img").css("color", "#FBFB3C"); // color in pfp image
              if (obj.new) {
                // new account created
                loginbtn.html("Account Created &#10004;");
                setTimeout(function() {
                  modal.css("display", "none");
                  clearLogin();
                }, 1000);
              }
              else {
                // login successful
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
        // username not correct format
        $("#user-error").html("Only letters/numbers, first character has to be letter");
        $("#user-error").css("display", "table-cell");
      }
    }
    else {
      // length requirements failed
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
          // username is correct format
          $("#user-error").css("display", "none");
        }
        else {
          // username is not correct format
          $("#user-error").html("Only letters/numbers, first character has to be letter");
          $("#user-error").css("display", "table-cell");
        }
      }
    }

  })
})
