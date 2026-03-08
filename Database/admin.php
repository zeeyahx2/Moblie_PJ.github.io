<?php

$host = "sql113.infinityfree.com";
$user = "if0_41328502";
$password = "JvkwDLS1OscdtP";
$dbname = "if0_41328502_form";

$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("❌ เชื่อมต่อไม่สำเร็จ: " . $conn->connect_error);
}

// ── ดึงข้อมูลทั้งหมด ──────────────────────────────
$result = $conn->query("SELECT * FROM feedback ORDER BY created_at DESC");
$total  = $result->num_rows;
$conn->close();
?>
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin — ดูข้อมูลแบบประเมิน</title>
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Sarabun', sans-serif;
      background: #f0f4f8;
      min-height: 100vh;
      padding: 40px 20px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .header {
      background: #2b4a7a;
      color: white;
      padding: 24px 32px;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header h1 {
      font-size: 1.3rem;
      color: #f5e47a;
    }

    .badge {
      background: #f5e47a;
      color: #2b4a7a;
      padding: 6px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .table-wrap {
      background: white;
      border-radius: 0 0 12px 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #e8eef5;
    }

    th {
      padding: 14px 18px;
      text-align: left;
      font-weight: 600;
      color: #2b4a7a;
      font-size: 0.95rem;
      border-bottom: 2px solid #d0dce8;
    }

    td {
      padding: 14px 18px;
      border-bottom: 1px solid #eef2f7;
      color: #333;
      font-size: 0.95rem;
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: #f7fafd;
    }

    .no-data {
      text-align: center;
      padding: 60px;
      color: #999;
      font-size: 1rem;
    }

    .comment-cell {
      max-width: 300px;
      word-break: break-word;
      line-height: 1.5;
    }

    .date-cell {
      white-space: nowrap;
      color: #666;
      font-size: 0.88rem;
    }

    .id-cell {
      color: #aaa;
      font-size: 0.85rem;
    }

    .back-btn {
      display: inline-block;
      margin-bottom: 16px;
      color: #2b4a7a;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .back-btn:hover { text-decoration: underline; }

    .refresh-btn {
      background: #2b4a7a;
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-family: 'Sarabun', sans-serif;
      font-size: 0.9rem;
      transition: background 0.2s;
    }

    .refresh-btn:hover { background: #1a3560; }
  </style>
</head>
<body>
  <div class="container">


    <div class="header">
      <h1>📋 ข้อมูลแบบประเมินเว็บไซต์</h1>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="badge">ทั้งหมด <?= $total ?> รายการ</span>
        <button class="refresh-btn" onclick="location.reload()">🔄 รีเฟรช</button>
      </div>
    </div>

    <div class="table-wrap">
      <?php if ($total === 0): ?>
        <p class="no-data">ยังไม่มีข้อมูลครับ</p>
      <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ชื่อ</th>
            <th>อีเมล</th>
            <th>ความคิดเห็น</th>
            <th>วันที่ส่ง</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $result->fetch_assoc()): ?>
          <tr>
            <td class="id-cell"><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['name']) ?></td>
            <td><?= htmlspecialchars($row['email']) ?></td>
            <td class="comment-cell"><?= nl2br(htmlspecialchars($row['comment'])) ?></td>
            <td class="date-cell"><?= $row['created_at'] ?></td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
      <?php endif; ?>
    </div>
  </div>
</body>
</html>