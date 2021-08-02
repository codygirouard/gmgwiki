$(document).ready(function(){

  // get value from url ?name=_something_
  const urlParams = new URLSearchParams(window.location.search);
  const buildingName = urlParams.get('name');

  // send get request to server/functions.php


  var likeBtn = $("#like-button");
  var liked = false;
  var storedUser = localStorage.getItem('user');

  // check if user liked the page

  likeBtn.click(function() {
    storedUser = localStorage.getItem('user');

    if (!storedUser || storedUser.length < 2) {
      // user is not logged in
      alert('Login to like building pages!');
    } else {
      // user is logged in
      if (liked) {
        // unlike the page

      } else {
        // like the page

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

      
    }
  })

});
