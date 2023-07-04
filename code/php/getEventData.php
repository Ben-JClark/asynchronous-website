<?php
    require_once('connect.php');

    //get the id of the event
    $id = $_POST["id"];
    //get the details of the event with the specific id
    $query = "select * from `events` where `id` = '".$id."'";

    $result = $con->query($query);
    
    if($result != FALSE) 
    {
        $events = array();
        while($row = $result->fetch()) 
        {
            $events[] = $row;
        }
        echo json_encode($events);
    } 
    else
        die("Error in database query");
?>