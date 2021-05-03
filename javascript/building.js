$(document).ready(function(){
  const urlParams = new URLSearchParams(window.location.search);
  const buildingName = urlParams.get('name');

  $.ajax({
      type: "GET",
      url: 'php/functions.php',
      dataType: 'json',
      data: {building: buildingName},

      success: function (obj, textstatus) {
                    $("#search-q").html(obj.result);
              }
  });
});