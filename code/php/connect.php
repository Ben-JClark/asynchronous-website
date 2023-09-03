<?php
	$dsn = "mysql:host=localhost;dbname=322";
    $user = "root";
    $passwd = "";
   
	
   try{
		$con = new PDO($dsn,$user,$passwd);
	} 
	catch (PDOException $e) {
   		echo "Database connection error " . $e->getMessage();
   	}
?>
