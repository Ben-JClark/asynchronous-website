<?php
	$dsn = "";
    $user = "";
    $passwd = "";
   
   try{
		$con = new PDO($dsn,$user,$passwd);
	} 
	catch (PDOException $e) {
   		echo "Database connection error " . $e->getMessage();
   	}
?>
