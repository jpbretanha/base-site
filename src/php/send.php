<?php
/**
 * ======================= ATENÇÃO ========================= 
 * Nunca em hipótese alguma colocar frases aleatórias 
 * no email a ser enviado para o cliente nem msg de agradecimento
 */

// address do envio e da empresa 
$subject = 'Agendamento HIT 30 Dual Gym';
$assunto = 'Agendamento Dual Gym';
$empresa = '';
$address = '';

$nome = $_POST['nome']; 
$email = $_POST['email'];
$telefone = $_POST['telefone'];
//$check = $_POST['check'];

$html='
	<!DOCTYPE html>
	<html>
	<head>
	</head>
	<body>
	<p>	Contato : '.$nome.' </br></p>
	<p>	Email : '.$email.' </br></p>
	<p>	Telefone : <a href=tel:'.$tel.'>' .$telefone. '</a> </br></p>
	</body>
	</html>';

require 'PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;
// Set PHPMailer to use the sendmail transport
$mail->isSendmail();
//Set who the message is to be sent from

//nao esquecer do .com.br senão cai no span o email...
$mail->setFrom($address, $empresa);
//Set an alternative reply-to address
//$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to

//usar as variaveis no lugar do email e nome
$mail->addAddress($address, $nome);
//$mail->addAddress($address, 'Contato');
//Set the subject line

//alterar o nome do subject para não dar erros 
$mail->Subject = $subject;
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
//$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
$mail->msgHTML($html);
//Replace the plain text body with one created manually
$mail->AltBody = $assunto;
//Attach an image file
//$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
