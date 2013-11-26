<?php
	
	require 'connexionBdd.php';

	$idRoom = $_POST['idRoom'];
	$email = $_POST['email'];

	$sql = "SELECT COUNT(*) AS nb FROM correspondre WHERE idRoom = :idRoom && email = :email";
	$req = $db->prepare($sql);
	$req->bindValue(':idRoom', $idRoom, PDO::PARAM_INT);
	$req->bindValue(':email', $email, PDO::PARAM_STR);
	$req->execute();

	$res = $req->fetch(PDO::FETCH_ASSOC);

	echo $res['nb'];

?>