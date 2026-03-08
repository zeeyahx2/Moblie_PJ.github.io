<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>แบบประเมินเว็บไซต์</title>

<style>
    @font-face {
    font-family: 'THK2D';
    src: url('TH K2D July8.ttf');
}
body {
    font-family: 'THK2D', sans-serif;
    background: #0f2b5b;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.container {
    background: #1f3d73;
    padding: 40px;
    border-radius: 20px;
    width: 400px;
    color: white;
}

h2 {
    text-align: center;
    margin-bottom: 25px;
}

input, textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: none;
}

button {
    background: #e6d28f;
    border: none;
    padding: 12px;
    width: 100%;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #d6c27f;
}

.success {
    color: lightgreen;
    text-align: center;
    margin-bottom: 10px;
}
</style>

</head>
<body>

<div class="container">

<?php if(isset($_GET['success'])): ?>
<p class="success">Saved successfully!</p>
<?php endif; ?>

<h2>แบบประเมินเว็บไซต์</h2>

<form action="save.php" method="POST">
    Name:
    <input type="text" name="name" required>

    Email:
    <input type="email" name="email" required>

    Comment:
    <textarea name="comment" rows="4" required></textarea>

    <button type="submit">Submit</button>
</form>

</div>

</body>
</html>
