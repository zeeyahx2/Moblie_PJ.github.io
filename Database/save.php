<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];

    $sql = "INSERT INTO feedback (name, email, comment)
            VALUES ('$name', '$email', '$comment')";

    if ($conn->query($sql) === TRUE) {
        header("Location: success.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }

} else {
    header("Location: form.php");
    exit();
}
?>
