<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <title>Home - GMG Wiki</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon2.png";>
</head>
<body>

  <div class="header">
    <a href="index.html"><img class="" src="images/logo.png" alt="Eagle logo for go mean green"></a>
    <div>Go Mean Green Wiki</div>
    <a href="#"><img class="" src="images/pfp.png" alt="Profile picture"></a>
  </div>

  <ul>
    <li><a class="active">Home</a></li>
    <li><a>Browse</a></li>
    <li><a>Popular</a></li>
    <li><a>About</a></li>
    <li>
      <div class="search-container">
        <form action="/search_page.php" action="get">
          <input type="text" placeholder="Search..." name="search">
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
    </li>
  </ul>

  <div class="dual-column">
    <div class="left-column">
      <div class="container">
        <h1>Search results for <?php echo $_GET["search"]; ?></h1>
        <p>Nothing yet!</p>
      </div>
    </div>
    <div class="right-column">
      <div class="container">
        <h1>Most liked building</h1>
      </div>
    </div>
  </div>

</body>
</html>
