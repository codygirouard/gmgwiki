$(document).ready(function(){

  // get value from url ?name=_something_
  const urlParams = new URLSearchParams(window.location.search);
  const buildingName = urlParams.get('name');

  // send get request to server/functions.php
  $.ajax({
    type: "GET",
    url: 'php/functions.php',
    dataType: 'json',
    // getBuildingInfo(buildingName);
    data: {function: 'getBuildingInfo', building: buildingName},

    success: function (obj, textstatus) {
      // change title of webpage
      $(document).prop('title', obj.name + ' - GMG Wiki');

      // load database information into html
      $("#building-name").html(obj.name);
      $("#desc").html(obj.descr);
      $("#images-name").html('Images of ' + obj.name);
      $("#address").html(obj.addr);
      $("#prim-use").html(obj.prim);
      $("#academic").html(obj.academic);

      var lots = ['eagle', 'fs', 'fcs', 'rr', 'r', 'ar'];
      var l = 0;

      // load parking lot values
      for (l = 0; l < lots.length; l++) {
        var lot = lots[l];

        // put spacing in between numbers (1,2,3,4 -> 1, 2, 3, 4)
        obj[lot] = obj[lot].replace(/,/g, ", ");
        if (obj[lot] == 'None') {
          // if no parking spots, html change to an X
          $("#" + lot).html('<i class="fa fa-times""></i>');
        } else {
          $("#" + lot).html(obj[lot]);
        }
      }

      // check if building has printers/tutors; true = check, false = X
      if (obj.printer == 1) {
        $("#printers").removeClass('fa-times');
        $("#printers").addClass('fa-check');
      }
      if (obj.tutor == 1) {
        $("#tutoring").removeClass('fa-times');
        $("#tutoring").addClass('fa-check');
      }

      // images and alt texts determined by building's id
      $("#img1").attr("src", "images/" + obj.id + "1.jpg");
      $("#img2").attr("src", "images/" + obj.id + "2.jpg");
      $("#img3").attr("src", "images/" + obj.id + "3.jpg");

      $("#img1").attr("alt", "Picture of " + obj.name);
      $("#img2").attr("alt", "Picture of " + obj.name);
      $("#img3").attr("alt", "Picture of " + obj.name);

      // load google maps of building location
      $("#google-map").attr('src', obj.google);

      // load comments
      if (!obj.nocomments) {
        // page has comments
        var comments = $("#comment-container");
        var inHTML = "";
        var i = 0;
        while(obj[i]) {
          // add comments to comment container
          var user = obj[i].split("~;~")[0];
          var comment = obj[i].split("~;~")[1];
          inHTML = inHTML + '<div class="container comments"><h2 class="upper">' + user + ':</h2><p>' + comment + '</p></div>';
          i = i + 1;
        }
        comments.html(inHTML);
      }
    }
  });

  var likeBtn = $("#like-button");
  var liked = false;
  var storedUser = localStorage.getItem('user');

  // check if user liked the page
  $.ajax({
    type: "GET",
    url: 'php/functions.php',
    dataType: 'json',
    // isLiked(user, building);
    data: {function: 'isLiked', user: storedUser, building: buildingName},

    success: function (obj, textstatus) {
      if (obj.isLiked) {
        // user liked this page already
        likeBtn.html('<i class="fa fa-heart"></i>');
        liked = true;
      }
    }
  });

  likeBtn.click(function() {
    storedUser = localStorage.getItem('user');

    if (!storedUser || storedUser.length < 2) {
      // user is not logged in
      alert('Login to like building pages!');
    } else {
      // user is logged in
      if (liked) {
        // unlike the page
        $.ajax({
          type: "POST",
          url: 'php/functions.php',
          dataType: 'json',
          // like(user, building);
          data: {function: 'unlike', user: storedUser, building: buildingName},

          success: function (obj, textstatus) {
            if (obj.success) {
              // user liked this page already
              likeBtn.html('<i class="fa fa-heart-o"></i>');
              liked = false;
            } else {
              alert('Failed to unlike page.\nTry again later.');
            }
          }
        });
      } else {
        // like the page
        $.ajax({
          type: "POST",
          url: 'php/functions.php',
          dataType: 'json',
          // like(user, building);
          data: {function: 'like', user: storedUser, building: buildingName},

          success: function (obj, textstatus) {
            if (obj.success) {
              // user liked this page already
              likeBtn.html('<i class="fa fa-heart"></i>');
              liked = true;
            } else {
              alert('Failed to like page.\nTry again later.');
            }
          }
        });
      }
    }
  })

  $("#submit-button").click(function() {
    storedUser = localStorage.getItem('user');

    if (!storedUser || storedUser.length < 2) {
      // user is not logged in
      alert('Login to comment on building pages!');
    } else {
      // user is logged in
      var comment = $.trim($("#comment-box").val());

      $.ajax({
        type: "POST",
        url: 'php/functions.php',
        dataType: 'json',
        // comment(user, building, text);
        data: {function: 'comment', user: storedUser, building: buildingName, comment: comment},

        success: function (obj, textstatus) {
          if (obj.success) {
            // comment posted
            var comments = $("#comment-container");
            if (comments.html().includes('No comments yet!')) {
              comments.html('<div class="container comments"><h2 class="upper">' + storedUser + ':</h2><p>' + comment + '</p></div>');
            } else {
              comments.html(comments.html() + '<div class="container comments"><h2 class="upper">' + storedUser + ':</h2><p>' + comment + '</p></div>');
            }

            $("#comment-box").val('');
          } else {
            // comment failed to post
            alert('Failed to comment on page.\nTry again later.');
          }
        }
      });
    }
  })

});
