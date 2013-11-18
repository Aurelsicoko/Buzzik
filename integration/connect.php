<?php
	
	require 'connexionBdd.php';

	$idRoom = $_POST['idRoom'];
	$emailUser = $_POST['emailUser'];
	$nomUser = $_POST['nomUser'];
	$prenomUser = $_POST['prenomUser'];
	$avatarUser = $_POST['avatarUser'];
	$paysUser = $_POST['paysUser'];
	$ageUser = explode($_POST['ageUser'], "/");
	$ageUser = $ageUser[1]."/".$ageUser[0]."/".$ageUser[2];

	$sql = "SELECT COUNT(*) AS nb, idUser FROM users WHERE emailUser = :emailUser";
	$req = $db->prepare($sql);
	$req->bindValue(':emailUser', $emailUser, PDO::PARAM_STR);
	$req->execute();

	$res = $req->fetch(PDO::FETCH_ASSOC);

	$idUser = $res['idUser'];

	if($res['nb'] == 0){
		$sql = "INSERT INTO users VALUE('', :prenomUser, :nomUser, :emailUser, :avatarUser, :paysUser, :ageUser)";
		$req = $db->prepare($sql);
		$req->bindValue(':prenomUser', $prenomUser, PDO::PARAM_STR);
		$req->bindValue(':nomUser', $nomUser, PDO::PARAM_STR);
		$req->bindValue(':emailUser', $emailUser, PDO::PARAM_STR);
		$req->bindValue(':avatarUser', $avatarUser, PDO::PARAM_STR);
		$req->bindValue(':paysUser', $paysUser, PDO::PARAM_STR);
		$req->bindValue(':ageUser', $ageUser, PDO::PARAM_STR);
		$req->execute();

		$idUser = $db->lastInsertId();

		$sql = "INSERT INTO personnaliser VALUE(:idUser, :idBuzzer)";
		$req = $db->prepare($sql);
		$req->bindValue(':idUser', $idUser, PDO::PARAM_INT);
		$req->bindValue(':idBuzzer', 1, PDO::PARAM_INT);
		$req->execute();

		$sql = "SELECT COUNT(*) AS nb FROM jouer WHERE idRoom = :idRoom && idUser = :idUser";
		$query = $db->prepare($sql);
		$query->bindValue(':idRoom', $idRoom, PDO::PARAM_INT);
		$query->bindValue(':idUser', $idUser, PDO::PARAM_INT);
		$query->execute();

		$result = $req->fetch(PDO::FETCH_ASSOC);

		if($result['nb'] == 0){
			$sql = "INSERT INTO jouer VALUE(:idRoom, :idUser, 0)";
			$queries = $db->prepare($sql);
			$queries->bindValue(':idRoom', $idRoom, PDO::PARAM_INT);
			$queries->bindValue(':idUser', $idUser, PDO::PARAM_INT);
			$queries->execute();
		}	

		$response = 'add';
	}
	else if($res['nb'] == 1){

		$sql = "SELECT COUNT(*) AS nb FROM jouer WHERE idRoom = :idRoom && idUser = :idUser";
		$query = $db->prepare($sql);
		$query->bindValue(':idRoom', $idRoom, PDO::PARAM_INT);
		$query->bindValue(':idUser', $idUser, PDO::PARAM_INT);
		$query->execute();

		$result = $req->fetch(PDO::FETCH_ASSOC);

		if($result['nb'] == 0){
			$sql = "INSERT INTO jouer VALUE(:idRoom, :idUser, 0)";
			$queries = $db->prepare($sql);
			$queries->bindValue(':idRoom', $idRoom, PDO::PARAM_INT);
			$queries->bindValue(':idUser', $idUser, PDO::PARAM_INT);
			$queries->execute();
		}

		$response = 'ok';
	}
	else{
		$response = 'nok';
	}

	$sql = "SELECT B.nomBuzzer, B.sonnerieBuzzer FROM users U, buzzer B, personnaliser P WHERE B.idBuzzer = P.idBuzzer && P.idUser = U.idUser && U.idUser = :idUser";
	$req = $db->prepare($sql);
	$req->bindValue(':idUser', $idUser, PDO::PARAM_INT);
	$req->execute();

	$res = stripslashes(json_encode($req->fetch(PDO::FETCH_ASSOC)));

	$arr = array('response' => $response, 'buzzer' => $res);

	echo json_encode($arr);

?>