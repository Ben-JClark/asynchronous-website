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
        while($row = $result->fetch()) 
        {
            echo "<tr>";
            echo "<td>".$row['name']."</td>";
        }
        echo "</table>";
    } 
    else
        die("Error in database query");
    
?>
</body>
</html>