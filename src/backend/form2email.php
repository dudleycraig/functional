<?php

// logging
$myfile = fopen("log.txt", "a");
$txt = 'date: ' . date("l jS \of F Y h:i:s A");
fwrite($myfile, $txt . "\n");
fclose($myfile);

include('zoho.php');

header_remove();
header('content-type: application/json; charset=utf-8');

ob_start();

// if(!isset($_POST['submitButton']))
// {
// 	//This page should not be accessed directly. Need to submit the form.
// 	echo "error; you need to submit the form!";
// }

$visitor_first_name = $_POST['VisitorFirstName'];
$visitor_surname = $_POST['VisitorSurname'];
$visitor_email = $_POST['VisitorEmail'];
$visitor_phone = $_POST['VisitorPhone'];
$visitor_unit_type = $_POST['VisitorUnitType'];
$visitor_number_of_people = $_POST['VisitorNumberOfPeople'];
$visitor_agent = $_POST['VisitorAgent'];

$message = "First Name: $visitor_first_name\r\n";
$message .= "Surname: $visitor_surname\r\n";
$message .= "Email: $visitor_email\r\n";
$message .= "Phone: $visitor_phone\r\n";
$message .= "Unit Type: $visitor_unit_type\r\n";
$message .= "Number Of People: $visitor_number_of_people\r\n";
$message .= "Agent: $visitor_agent\r\n";

$myfile = fopen("log.txt", "a");
fwrite($myfile, $message . "\n");
fclose($myfile);

//Validate first
// if(empty($visitor_first_name)||empty($visitor_email)) 
// {
//     echo "Name and email are mandatory!";
//     exit;
// }

if(IsInjected($visitor_email))
{
    $myfile = fopen("log.txt", "a");
    $txt2 = date("EMAIL INJECTION");
    fwrite($myfile, $txt2 . "\n");
    fclose($myfile);
    exit;
}

$email_from = "webmaster@golfcartrentals.co.za";//<== update the email address
$email_subject = "SANDTON VIEW RENTAL ENQUIRY";
$email_body = $message;
    
$to = "letting@sandtonview.co.za";//<== update the email address
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

//Send the email!
if(mail($to,$email_subject,$email_body,$headers))
{
  $myfile = fopen("log.txt", "a");
  $txt3 = "MAIL SUCCESS";
  fwrite($myfile, $txt3 . "\n");
  fclose($myfile);
  // http_response_code(200);
  // header('Status: 200 OK');
  // post_lead($visitor_surname, $visitor_first_name, $visitor_email, $visitor_phone, $visitor_unit_type, $visitor_number_of_people, $visitor_agent);
}else{
  $myfile = fopen("log.txt", "a");
  $txt4 = "MAIL SEND FAIL";
  fwrite($myfile, $txt4 . "\n");
  fclose($myfile);
  // http_response_code(500);
  // header('Status: 500 Internal Server Error');
  // echo json_encode(array("error" => array("message" => "MAIL SEND FAIL")));
}
post_lead($visitor_surname, $visitor_first_name, $visitor_email, $visitor_phone, $visitor_unit_type, $visitor_number_of_people, $visitor_agent);
ob_end_clean();

http_response_code(200);
header('Status: 200 OK');
echo json_encode(array("data" => array("message" => "MAIL SUCCESS")));
exit();

//done. redirect to thank-you page.
//header('Location: thank-you.html');

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
} 

?>
