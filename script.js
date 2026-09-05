document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // Accessible FAQ accordion
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const icon = button.querySelector(".faq-icon");
      const expanded = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!expanded));
      answer.hidden = expanded;
      icon.textContent = expanded ? "+" : "−";
    });
  });

  // Update active nav item as the user scrolls
  const navLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${visible.target.id}`
          );
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.01, 0.25, 0.5]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
