<?php

header_remove();

header('content-type: application/json; charset=utf-8');
ob_start();
ob_end_clean();

http_response_code(200);

header('Status: 200 OK');
echo json_encode(array("success" => "Success"));
exit();

?>
