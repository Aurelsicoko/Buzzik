<?php

	try{
	    $db = new PDO('mysql:host=localhost;dbname=buzzik', 'root', 'root');
	    $db->exec("SET CHARACTER SET utf8");
	}
	catch(PDOException $e){
	    print "Erreur !: " . $e->getMessage() . "<br/>";
	    die();
	}

?>