document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Top tabbar + hamburger
  // =========================
  const topTabs = document.querySelectorAll(".tab-link");
  const indicator = document.querySelector(".indicator");
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  function moveIndicator(element) {
    if (!indicator || !element) return;

    const rect = element.getBoundingClientRect();
    const containerRect = element.parentElement.getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    indicator.style.left = rect.left - containerRect.left + "px";
  }

  topTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      topTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      moveIndicator(this);

      if (menu) menu.classList.remove("active");
      if (hamburger) hamburger.classList.remove("active");
    });
  });

  window.addEventListener("load", () => {
    moveIndicator(document.querySelector(".tab-link.active"));
    if (menu) menu.classList.remove("active");
    if (hamburger) hamburger.classList.remove("active");
  });

  window.addEventListener("resize", () => {
    moveIndicator(document.querySelector(".tab-link.active"));
  });

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // =========================
  // Admission tabs
  // =========================
  const admisTabs = Array.from(document.querySelectorAll('.bch-tab[role="tab"]'));
  const admisPanels = Array.from(document.querySelectorAll('.admis-panel[role="tabpanel"]'));

  function resetAdmisTabs() {
    admisTabs.forEach((tab) => {
      tab.setAttribute("aria-selected", "false");
      tab.tabIndex = -1;
    });

    admisPanels.forEach((panel) => {
      panel.hidden = true;
    });
  }

  function openAdmisTab(tab) {
    if (!tab) return;

    resetAdmisTabs();

    tab.setAttribute("aria-selected", "true");
    tab.tabIndex = 0;

    const panelId = tab.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    if (panel) {
      panel.hidden = false;
    }
  }

  admisTabs.forEach((tab) => {
    tab.addEventListener("click", () => openAdmisTab(tab));
  });

  const defaultTab =
    admisTabs.find((tab) => tab.getAttribute("aria-selected") === "true") ||
    admisTabs[0];

  openAdmisTab(defaultTab);
  
  // Admission accordion

  const projectHeaders = document.querySelectorAll(".project-header");

  projectHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const panel = header.closest(".admis-panel");
      const contentId = header.getAttribute("aria-controls");
      const content = document.getElementById(contentId);

      if (!panel || !content) return;

      const isOpen = header.getAttribute("aria-expanded") === "true";

      // ปิดทุกอันใน panel เดียวกันก่อน
      panel.querySelectorAll(".project-header").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
      });

      panel.querySelectorAll(".project-content").forEach((box) => {
        box.hidden = true;
      });

      // เปิดอันที่กด ถ้ายังไม่ได้เปิด
      if (!isOpen) {
        header.setAttribute("aria-expanded", "true");
        content.hidden = false;
      }
    });
  });
});