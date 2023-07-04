<!DOCTYPE html>
<html>
    <head>
        <meta charset='UTF-8'>
        <title>Customer data</title>
    </head>
    <body>
<?php
    require_once('connect.php');


    $query = "select * from `events`";
    $result = $con->query($query);
    
    if($result != FALSE) 
    {
        echo "<table><tr></tr>";
        //<th>Name of Event</th><th>category</th><th>month</th>";
        //echo "<th>day</th><th>time</th></tr>";
        while($row = $result->fetch()) 
        {
            echo "<tr>";
            echo "<td>".$row['name']."</td>";
            /*
            echo "<td>".$row['category']."</td>";
            echo "<td>".$row['month']."</td>";
            echo "<td>".$row['day']."</td>";
            echo "<td>".$row['time']."</td>";
            echo "<td>".$row['cost']."</td>";
            echo "<td>".$row['location']."</td>";
            echo "<td>".$row['id']."</td>";
            echo "<td>".$row['tagged']."</td>";
            echo "<td>".$row['lon_lat']."</td>";
            echo "<td>".$row['notes']."</td>";
            echo "</tr>";
            */
        }
        echo "</table>";
    } 
    else
        die("Error in database query");
    
?>
</body>
</html>