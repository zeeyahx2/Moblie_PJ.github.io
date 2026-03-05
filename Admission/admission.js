document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Top tabbar + indicator
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
    indicator.style.left = (rect.left - containerRect.left) + "px";
  }

  topTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      topTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      moveIndicator(this);

      // ปิดเมนูมือถืออัตโนมัติเมื่อเลือกเมนู
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

  // =========================
  // Hamburger (mobile)
  // =========================
  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // =========================
  // Admission page: Tabs
  // =========================
  const admisTabs = Array.from(document.querySelectorAll('.tab-admis[role="tab"]'));
  const admisPanels = Array.from(document.querySelectorAll('.admis-panel[role="tabpanel"]'));

  // ทำงานเฉพาะหน้าที่มี admission tabs จริง ๆ
  if (admisTabs.length && admisPanels.length) {
    function activateAdmisTab(tab) {
      const targetId = tab.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetId);

      admisTabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute("aria-selected", String(active));
        t.tabIndex = active ? 0 : -1;
      });

      admisPanels.forEach((p) => (p.hidden = true));
      if (targetPanel) targetPanel.hidden = false;
    }

    // init: เปิดแท็บที่ aria-selected="true" หรือเปิดตัวแรก
    const selected = admisTabs.find((t) => t.getAttribute("aria-selected") === "true") || admisTabs[0];
    activateAdmisTab(selected);

    // click admission tabs
    admisTabs.forEach((tab) => tab.addEventListener("click", () => activateAdmisTab(tab)));

    // =========================
    // Admission page: Accordion
    // =========================
    document.addEventListener("click", (e) => {
      const header = e.target.closest(".project-header");
      if (!header) return;

      const panel = header.closest(".admis-panel");
      if (!panel) return;

      const contentId = header.getAttribute("aria-controls");
      const content = contentId ? document.getElementById(contentId) : null;
      if (!content) return;

      const isOpen = header.getAttribute("aria-expanded") === "true";

      // ปิดทุกอันใน panel เดียวกันก่อน
      panel.querySelectorAll(".project-header").forEach((h) => h.setAttribute("aria-expanded", "false"));
      panel.querySelectorAll(".project-content").forEach((c) => (c.hidden = true));

      // เปิดอันที่กด (ถ้ามันยังไม่เปิด)
      if (!isOpen) {
        header.setAttribute("aria-expanded", "true");
        content.hidden = false;
      }
    });
  }

  const contactTab = Array.from(document.querySelectorAll('.bch-tab[role="tab"]'));
  const contactPanel = Array.from(document.querySelectorAll('.contact-panel[role = "tabpanel"]'));

  function resetContactTab() {
    // close the tab not click
    contactTab.forEach(t => t.setAttribute("aria-selected", "false"));
    contactPanel.forEach(p => p.hidden =true);
  }

  function openContactTab(tab) {
    resetContactTab();
    // open first tab
    tab.setAttribute("aria-selected","true");

    const panelID = tab.getAttribute("aria-controls")
    const panel = document.getElementById(panelID);

    if (panel) panel.hidden = false;
  }
contactTab.forEach(tab => {
    tab.addEventListener("click", () => openContactTab(tab));
  });

  const defaultTab = contactTab.find(t => t.getAttribute("aria-selected") === "true") || contactTab[0];
  openContactTab(defaultTab);

});