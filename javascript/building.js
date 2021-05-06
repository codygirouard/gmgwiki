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

      // put spacing in between numbers (1,2,3,4 -> 1, 2, 3, 4)
      obj.eagle = obj.eagle.replace(/,/g, ", ");
      obj.fs = obj.fs.replace(/,/g, ", ");
      obj.fcs = obj.fcs.replace(/,/g, ", ");
      obj.rr = obj.rr.replace(/,/g, ", ");
      obj.r = obj.r.replace(/,/g, ", ");
      obj.ar = obj.ar.replace(/,/g, ", ");

      // if no parking spots, html changed to an X
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
    }
  });
});
