<?php
    $aResult = array();

    if( !isset($_GET['function']) ) {
      if (!isset($_POST['function'])) {
        $aResult['error'] = 'No function!';
      }
      else {
        $function = $_POST['function'];
        if ($function == 'login') {
          $user = $_POST['user'];
          $pwd = $_POST['pwd'];

          $hashed_pwd = password_hash($pwd, PASSWORD_DEFAULT);

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

          $sql = "SELECT hash FROM Users WHERE username = '" . $user . "'";
          $result = mysqli_query($conn, $sql);

          if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
              if (password_verify($pwd, $row['hash'])) {
                $aResult['user'] = $user;
              }
              else {
                $aResult['error'] = 'Incorrect Password!';
              }
            }
          } else {
            // username not found
            $sql = "INSERT INTO Users VALUES ('" . $user . "', '" . $hashed_pwd . "')";

            if (mysqli_query($conn, $sql)) {
              $aResult['new'] = 'new';
              $aResult['user'] = $user;
            } else {
              $aResult['error'] = "Couldn't create user";
            }
          }
        }
        else {
          $aResult['error'] = 'Function not found!';
        }
      }
    } else {
      $function = $_GET['function'];
      if( $function == 'getBuildingInfo' ) {
        if( !isset($_GET['building']) ) {
          $aResult['error'] = 'No building name!';
        } else {
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

          $sql = "SELECT * FROM Buildings WHERE id = '" . $_GET['building'] . "'";
          $result = mysqli_query($conn, $sql);

          if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
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
          echo "0 results";
        }
      }
      else {
        $aResult['result'] = 'Error function not found!';
      }
    }

    echo json_encode($aResult);
?>
