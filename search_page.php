<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <link id="theme" rel="stylesheet" href="css/main_light.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <title>Search - '<?php echo $_GET["search"]; ?>'</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon.png";>
</head>
<body>

  <div class="header">
    <a href="index.html"><img class="" src="images/logo.png" alt="Eagle logo for go mean green"></a>
    <div>Go Mean Green Wiki</div>
    <a href="#"><img class="" src="images/pfp.png" alt="Profile picture"></a>
  </div>

  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="browse.html">Browse</a></li>
    <li><a href="#">Popular</a></li>
    <li><a href="#">About</a></li>
    <li style="float: right;">
      <div class="search-container">
        <form action="/search_page.php" action="get">
          <input type="text" placeholder="Search building..." name="search">
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </li>
    <li class="mode-switch"><button id="theme-toggle"><i class="fa fa-lightbulb-o"></i></button></li>
  </ul>

  <div class="dual-column">
    <div class="left-column">
      <div class="container">
        <h1>Search results for '<?php echo $_GET["search"]; ?>'</h1>
        <p>Nothing yet!</p>
      </div>
    </div>
    <div class="right-column">
      <div class="container">
        <h1>Most liked building</h1>
      </div>
    </div>
  </div>

<script type="text/javascript" src="javascript/main.js"></script>
</body>
</html>
