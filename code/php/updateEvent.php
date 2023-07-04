<?php
    require_once('connect.php');

    $jsondata = file_get_contents("php://input");
    $data = json_decode($jsondata, true);

    $name = $data['name'];
    $category = $data['category'];
    $time = $data['time'];
    $date = $data['date'];
    $cost = $data['cost'];
    $location = $data['location'];
    $notes = $data['notes'];
    //$lat_lon = $data['lat_lon'];
    $id = $data['id'];

    //get the details of the event with the specific id
    //$query = "insert into `events` where `id` = '".$id."'";
    $query = "UPDATE events SET name = '$name', category = '$category', time = '$time', day = '$date', cost = '$cost',  location = '$location', notes = '$notes' WHERE id = '$id'";
    //echo $query;
    $result = $con->query($query);

    //send the result back to javascript for debugging
    
    if($result != FALSE) 
    {
        echo "event data has been successfully updated!";
    } 
    else
        die("Error in database query");
        
?>