<?php
    // variables start
	$name = "";
	$email = "";
	$message = "";
	
	$name =  trim($_POST['contactNameField']);
	$email =  trim($_POST['contactEmailField']);
	$message =  trim($_POST['contactMessageTextarea']);
	// variables end
	
	// email address starts
	$emailAddress = 'info@aandachts.nl';
	// email address ends
	
	$subject = "Bericht via de App van: $name";	
	$message = "<strong>Van:</strong> $name <br/><br/> <strong>Bericht:</strong> $message";
	
	$headers .= 'From: '. $name . '<' . $email . '>' . "\r\n";
	$headers .= 'Reply-To: ' . $email . "\r\n";
	
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	//send email function starts
	mail($emailAddress, $subject, $message, $headers);
	//send email function ends
?>