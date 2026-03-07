// ===== DARK MODE TOGGLE - ใช้ได้กับทุกหน้า =====
document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  // 1. ตรวจสอบสถานะเดิมจาก LocalStorage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if(modeToggle) modeToggle.checked = true;
  }

  // 2. ทำงานเมื่อคลิกสลับปุ่ม
  if(modeToggle) {
    modeToggle.addEventListener("change", () => {
      if (modeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }
});


