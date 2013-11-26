<?php
	
	require 'connexionBdd.php';

	$nbrJoueur = $_POST['nbrJoueur'];
	$nomPartie = $_POST['nomPartie'];
	$nbrChanson = $_POST['nbrChanson'];

	$sql = "INSERT INTO rooms VALUE('', :nomRoom, :dateRoom, :nbUserRoom, :nbSongRoom)";
	$req = $db->prepare($sql);
	$req->bindValue(':nomRoom', $nomPartie, PDO::PARAM_STR);
	$req->bindValue(':dateRoom', time(), PDO::PARAM_STR);
	$req->bindValue(':nbUserRoom', $nbrJoueur, PDO::PARAM_INT);
	$req->bindValue(':nbSongRoom', $nbrChanson, PDO::PARAM_INT);
	$req->execute();

	$idRoom = $db->lastInsertId();

	// Temporaire : permet de m'associer à la room
	$sql = "INSERT INTO correspondre VALUE(:idRoom, :email, '0')";
	$query = $db->prepare($sql);
	$query->bindValue(':idRoom', $idRoom, PDO::PARAM_INT);
	$query->bindValue(':email', 'aurelsicoko@gmail.com', PDO::PARAM_STR);
	$query->execute();

	echo $idRoom;
?>