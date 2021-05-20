<?php
    $aResult = array(); // result to return

    if( !isset($_GET['function']) ) {
      // not a get request function
      if (!isset($_POST['function'])) {
        // not a post request function
        $aResult['error'] = 'No function!';
      }
      else {
        // is a post request function
        $function = $_POST['function'];
        if ($function == 'login') {
          // login(user, pwd);
          $user = $_POST['user'];
          $pwd = $_POST['pwd'];

          // hash the password
          $hashed_pwd = password_hash($pwd, PASSWORD_DEFAULT);

          // login details for mysql
          include('login.php');

          $dbname = 'gmgWIKI';

          // create connection
          $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

          // check connection
          if (!$conn) {
            $aResult['error'] = 'Connection failure!';
            echo json_encode($aResult);
            die("Connection failed: " . mysqli_connect_error());
          }

          // take hash for selected username
          $sql = mysqli_prepare($conn, "SELECT hash FROM Users WHERE username=?");
          mysqli_stmt_bind_param($sql, "s", $user);
          mysqli_stmt_execute($sql);
          $result = mysqli_stmt_get_result($sql);

          if (mysqli_num_rows($result) > 0) {
            // username found
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            if (password_verify($pwd, $row['hash'])) {
              // user password matches input password
              $aResult['user'] = $user;
            }
            else {
              // user password does not match input password
              $aResult['error'] = 'Incorrect Password!';
            }
          } else {
            // username not found

            // try to create new user with password
            $sql = mysqli_prepare($conn, "INSERT INTO Users VALUES (?, ?)");
            mysqli_stmt_bind_param($sql, "ss", $user, $hashed_pwd);
            mysqli_stmt_execute($sql);

            // user created
            $aResult['new'] = 'new';
            $aResult['user'] = $user;
          }
        }
        elseif ($function == 'like') {
          // like(user, building);
          $user = $_POST['user'];
          $building = $_POST['building'];

          // login details for mysql
          include('login.php');

          $dbname = 'gmgWIKI';

          // create connection
          $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

          // check connection
          if (!$conn) {
            $aResult['error'] = 'Connection failure!';
            echo json_encode($aResult);
            die("Connection failed: " . mysqli_connect_error());
          }

          $sql = mysqli_prepare($conn, "SELECT * FROM LikesComments WHERE liked=1 AND user=? AND building=?");
          mysqli_stmt_bind_param($sql, "ss", $user, $building);
          mysqli_stmt_execute($sql);
          $result = mysqli_stmt_get_result($sql);

          if (mysqli_num_rows($result) > 0) {
            // user has already liked this building
            $aResult['error'] = 'true';
          } else {
            // user hasn't liked this building
            $sql = mysqli_prepare($conn, "INSERT INTO LikesComments (liked, user, building) VALUES (1, ?, ?)");
            mysqli_stmt_bind_param($sql, "ss", $user, $building);

            if (mysqli_stmt_execute($sql)) {
              // insert success
              $sql = mysqli_prepare($conn, "UPDATE Buildings SET likes = likes + 1 WHERE id=?");
              mysqli_stmt_bind_param($sql, "s", $building);
              mysqli_stmt_execute($sql);
              $aResult['success'] = 'true';
            } else {
              // insert failure
              $aResult['error'] = 'true';
            }
          }
        }
        elseif ($function == 'comment') {
          // comment(user, building, comment);
          $user = $_POST['user'];
          $building = $_POST['building'];
          $comment = $_POST['comment'];

          // login details for mysql
          include('login.php');

          $dbname = 'gmgWIKI';

          // create connection
          $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

          // check connection
          if (!$conn) {
            $aResult['error'] = 'Connection failure!';
            echo json_encode($aResult);
            die("Connection failed: " . mysqli_connect_error());
          }

          $sql = mysqli_prepare($conn, "INSERT INTO LikesComments (liked, user, building, comment) VALUES (0, ?, ?, ?)");
          mysqli_stmt_bind_param($sql, "sss", $user, $building, $comment);

          if (mysqli_stmt_execute($sql)) {
            // insert success
            $aResult['success'] = 'true';
          } else {
            // insert failure
            $aResult['error'] = 'true';
          }
        }
        elseif ($function == 'unlike') {
          // unlike(user, building);
          $user = $_POST['user'];
          $building = $_POST['building'];

          // login details for mysql
          include('login.php');

          $dbname = 'gmgWIKI';

          // create connection
          $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

          // check connection
          if (!$conn) {
            $aResult['error'] = 'Connection failure!';
            echo json_encode($aResult);
            die("Connection failed: " . mysqli_connect_error());
          }

          $sql = mysqli_prepare($conn, "DELETE FROM LikesComments WHERE liked=1 AND user=? AND building=?");
          mysqli_stmt_bind_param($sql, "ss", $user, $building);

          if (mysqli_stmt_execute($sql)) {
            $sql = mysqli_prepare($conn, "UPDATE Buildings SET likes = likes - 1 WHERE id =?");
            mysqli_stmt_bind_param($sql, "s", $building);
            mysqli_stmt_execute($sql);
            $aResult['success'] = 'true';
          } else {
            $aResult['error'] = 'true';
          }
        }
        else {
          $aResult['error'] = 'Function not found!';
        }
      }
    } else {
      // function is a get request
      $function = $_GET['function'];
      if( $function == 'getBuildingInfo' ) {
        // getBuildingInfo(building);
        if( !isset($_GET['building']) ) {
          // parameter not found
          $aResult['error'] = 'No building name!';
        } else {
          // mysql login info
          include('login.php');

          $dbname = 'gmgWIKI';

          // create connection
          $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

          // check connection
          if (!$conn) {
            $aResult['error'] = 'Connection failure!';
            echo json_encode($aResult);
            die("Connection failed: " . mysqli_connect_error());
          }

          $building = $_GET['building'];

          // get all data for building
          $sql = mysqli_prepare($conn, "SELECT * FROM Buildings WHERE id=?");
          mysqli_stmt_bind_param($sql, "s", $building);
          mysqli_stmt_execute($sql);
          $result = mysqli_stmt_get_result($sql);

          if (mysqli_num_rows($result) > 0) {
            // building name found
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            // return all building info
            $aResult['id'] = $row['id'];
            $aResult['name'] = $row['name'];
            $aResult['descr'] = $row['descr'];
            $aResult['addr'] = $row['addr'];
            $aResult['printer'] = $row['printer'];
            $aResult['tutor'] = $row['tutor'];
            $aResult['prim'] = $row['prim'];
            $aResult['academic'] = $row['academic'];
            $aResult['eagle'] = $row['eagle'];
            $aResult['fs'] = $row['fs'];
            $aResult['fcs'] = $row['fcs'];
            $aResult['rr'] = $row['rr'];
            $aResult['r'] = $row['r'];
            $aResult['ar'] = $row['ar'];
            $aResult['google'] = $row['google'];
          }

          // get comments
          $sql = mysqli_prepare($conn, "SELECT user, comment FROM LikesComments WHERE liked=0 AND building=?");
          mysqli_stmt_bind_param($sql, "s", $building);
          mysqli_stmt_execute($sql);
          $result = mysqli_stmt_get_result($sql);
          $i = 0;
          if (mysqli_num_rows($result) > 0) {
            // page has comments
            while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
              $aResult[$i] = $row['user'] . "~;~" . $row['comment'];
              $i = $i + 1;
            }
          } else {
            // page has no comments
            $aResult['nocomments'] = 'No comments!';
          }

          mysqli_close($conn);
        }
      }
      elseif ( $function == 'getLikes') {
        // getLikes(); return like count for every building

        // mysql login info
        include('login.php');

        $dbname = 'gmgWIKI';

        // create connection
        $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

        // check connection
        if (!$conn) {
          $aResult['error'] = 'Connection failure!';
          echo json_encode($aResult);
          die("Connection failed: " . mysqli_connect_error());
        }

        $sql = "SELECT name, likes FROM Buildings";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
          while($row = mysqli_fetch_assoc($result)) {
            $aResult[$row['name']] = $row['likes'];
          }
        } else {
          $aResult['error'] = '0 buildings found';
        }
      }
      elseif ( $function == 'getTopBuilding') {
        // mysql login info
        include('login.php');

        $dbname = 'gmgWIKI';

        // create connection
        $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

        // check connection
        if (!$conn) {
          $aResult['error'] = 'Connection failure!';
          echo json_encode($aResult);
          die("Connection failed: " . mysqli_connect_error());
        }

        // get all data for building
        $sql = "SELECT id, name, likes FROM Buildings ORDER BY likes DESC LIMIT 1";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
          // building found
          $row = mysqli_fetch_assoc($result);
          // return building info
          $aResult['img'] = $row['id'];
          $aResult['name'] = $row['name'];
          $aResult['likes'] = $row['likes'];
        }

        mysqli_close($conn);
      }
      elseif ( $function == 'isLiked') {
        if( !isset($_GET['user']) ) {
          // parameter not found
          $aResult['error'] = 'No username!';
        }
        elseif( !isset($_GET['building']) ) {
          // parameter not found
          $aResult['error'] = 'No building name!';
        }
        else {
          // mysql login info
          include('login.php');

          $dbname = 'gmgWIKI';

          // create connection
          $conn = mysqli_connect($Server_Name, $User_Name, $Password, $dbname);

          // check connection
          if (!$conn) {
            $aResult['error'] = 'Connection failure!';
            echo json_encode($aResult);
            die("Connection failed: " . mysqli_connect_error());
          }

          $building = $_GET['building'];
          $user = $_GET['user'];

          // get all data for building
          $sql = "SELECT * FROM LikesComments WHERE liked=true AND user='{$user}' AND building='{$building}'";
          $sql = mysqli_prepare($conn, "SELECT * FROM LikesComments WHERE liked=true AND user=? AND building=?");
          mysqli_stmt_bind_param($sql, "ss", $user, $building);
          mysqli_stmt_execute($sql);
          $result = mysqli_stmt_get_result($sql);

          $aResult['isLiked'] = mysqli_num_rows($result) > 0;

          mysqli_close($conn);
        }
      } else {
        // no get request function
        $aResult['result'] = 'Error function not found!';
      }
    }

    echo json_encode($aResult);
?>
