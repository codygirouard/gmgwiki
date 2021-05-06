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
          $sql = "SELECT hash FROM Users WHERE username = '" . $user . "'";
          $result = mysqli_query($conn, $sql);

          if (mysqli_num_rows($result) > 0) {
            // username found
            $row = mysqli_fetch_assoc($result);
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
            $sql = "INSERT INTO Users VALUES ('" . $user . "', '" . $hashed_pwd . "')";

            if (mysqli_query($conn, $sql)) {
              // user created
              $aResult['new'] = 'new';
              $aResult['user'] = $user;
            } else {
              // failed to create user
              $aResult['error'] = "Couldn't create user";
            }
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

          // get all data for building
          $sql = "SELECT * FROM Buildings WHERE id = '" . $_GET['building'] . "'";
          $result = mysqli_query($conn, $sql);

          if (mysqli_num_rows($result) > 0) {
            // building name found
            $row = mysqli_fetch_assoc($result);
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
      else {
        // no get request function
        $aResult['result'] = 'Error function not found!';
      }
    }

    echo json_encode($aResult);
?>
