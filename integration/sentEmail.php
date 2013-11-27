<html>
<body>
<?php

require_once 'lib/swift_required.php';

$idRoom = $_POST['id'];
$listeEmails = $_POST['listeEmails'];

$headers = 'MIME-Version: 1.0'."\r\n";
$headers .= 'Content-type: text/html; charset=utf-8'."\r\n";
$headers .= 'From: invitation@buzzik.com'."\r\n";

for($i=0; $i<count($listeEmails); $i++){
	$urlRoom = "http://buzzik.local/buzzik/?room=".$idRoom;
	$message = "<a href='".$urlRoom."'>Cliquez ici pour jouer !</a>";
	mail($listeEmails[$i], "Invitation à jouer", $message, $headers);
}
	
return $idRoom;

?>
</body>
</html>