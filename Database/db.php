
<?php
$host = "sql113.infinityfree.com";
$user = "if0_41328502";
$password = "JvkwDLS1OscdtP";
$dbname = "if0_41328502_form";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>