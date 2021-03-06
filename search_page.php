<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <meta content="utf-8" http-equiv="encoding">
  <link rel="stylesheet" href="css/main.css">
  <link id="theme" rel="stylesheet" href="css/light.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <title>Search - '<?php echo $_GET["search"]; ?>'</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon.png";>
</head>
<body>

  <div class="header">
    <a href="index.html"><img src="images/logo.png" alt="Eagle logo for go mean green"></a>
    <div>Go Mean Green Wiki</div>
    <div class="dropdown">
      <button id="pfp-button"><i class="fa fa-user fa-5x" id="pfp-img"></i></button>
      <div class="dropdown-content" id="loginDrop">
        <a id="logout" style="color: red;">Logout</a>
      </div>
    </div>
  </div>

  <div class="modal" id="login">
    <div class="modal-content">

      <div class="modal-header">
        <span id="close">&times;</span>
        <h2>Account Login (and Signup)</h2>
      </div>

      <div class="modal-body">
        <form>
          <div class="row">
            <span style="display: table-cell;"></span>
            <div style="display: none; color: red; padding-left: 20px; padding-top: 10px;" id="user-error">At least 2 characters!</div>
          </div>
          <div class="row">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Username (length >= 2)"><br><br>
          </div>

          <div class="row">
            <span style="display: table-cell;"></span>
            <div style="display: none; color: red; padding-left: 20px; padding-top: 10px;" id="pass-error">At least 6 characters!</div>
          </div>
          <div class="row">
            <label for="pwd">Password</label>
            <input type="password" id="pwd" name="pwd" placeholder="Password (length >= 6)"><br><br>
          </div>
        </form>
      </div>

      <div class="modal-footer">
        <div class="buttons">
          <button id="login-button">Login</button>
        </div>
      </div>

    </div>
  </div>

  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="browse.html">Browse</a></li>
    <li><a href="popular.html">Popular</a></li>
    <li><a href="about.html">About</a></li>
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

  <div class="single-column">
    <div class="container">
      <h1>Search results for '<span id="search-query"><?php echo $_GET["search"]; ?></span>'</h1>
      <table id="search-buildings">
      </table>
    </div>
  </div>

<script type="text/javascript" src="javascript/main.js"></script>
</body>
</html>
