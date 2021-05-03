<?php

    $aResult = array();

    if( !isset($_GET['building']) ) { $aResult['error'] = 'No building name!'; }

    if( !isset($aResult['error']) ) {

        $aResult['result'] = $_GET['building'];

    }

    echo json_encode($aResult);

?>
