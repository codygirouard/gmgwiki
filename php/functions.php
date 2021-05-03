<?php

    include('login.php');

    // Create connection
    $conn = mysqli_connect($Server_Name, $User_Name, $Password);

    // Check connection
    if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
    }

    $aResult = array();

    if( !isset($_GET['building']) ) { $aResult['error'] = 'No building name!'; }

    if( !isset($aResult['error']) ) {

        $aResult['result'] = $_GET['building'];

    }

    echo json_encode($aResult);

?>
