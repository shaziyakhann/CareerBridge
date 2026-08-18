/* ==========================================================
   CareerBridge — Landing Page Interactivity
   ========================================================== */
// CareerBridge frontend functionality

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initRevealOnScroll();
  initHeroStats();
  initFunnelBars();
  initScrollTopButton();
  initCtaForm();
  initSmoothAnchorClose();
});

/* ---------------- Mobile nav toggle ---------------- */
function initMobileNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

/* Close mobile menu when a nav link is clicked */
function initSmoothAnchorClose() {
  const nav = document.getElementById("nav");
  document.querySelectorAll(".nav-links a, .nav-cta a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

/* ---------------- Reveal-on-scroll ----------------
   Progressive enhancement: content is visible by default via CSS. Here we
   only *hide* the below-the-fold elements so they can animate in, then
   reveal them as they scroll into view. If anything goes wrong (no JS,
   unsupported IntersectionObserver, a slow/odd browser), the safety net
   below guarantees every section still becomes visible. */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) return; // stays visible (CSS default)

  // Only pre-hide elements that start below the fold, so above-the-fold
  // content never flashes or depends on the observer firing.
  items.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.92) {
      el.classList.add("pre-hide");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("pre-hide");
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));

  // Safety net: force-reveal everything after a few seconds no matter what.
  setTimeout(() => {
    items.forEach((el) => {
      el.classList.remove("pre-hide");
      el.classList.add("in-view");
    });
  }, 3000);
}

/* ---------------- Animated hero stat counters ---------------- */
function initHeroStats() {
  const statEls = document.querySelectorAll(".stat-num");
  if (!statEls.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statEls.forEach(animateCount);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  const wrap = document.getElementById("heroStats");
  if (wrap) observer.observe(wrap);
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(target * eased);
    el.textContent = value.toLocaleString("en-IN") + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------------- Funnel bar width animation ---------------- */
function initFunnelBars() {
  const funnels = document.querySelectorAll(".mock-funnel");
  if (!funnels.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".mock-bar");
          bars.forEach((bar, i) => {
            const width = bar.dataset.width || "0";
            setTimeout(() => {
              bar.style.width = width + "%";
            }, i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  funnels.forEach((f) => observer.observe(f));
}

/* ---------------- Scroll-to-top button ---------------- */
function initScrollTopButton() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------- CTA form (demo request) ---------------- */
function initCtaForm() {
  const form = document.getElementById("ctaForm");
  const note = document.getElementById("ctaNote");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("ctaEmail").value.trim();
    if (!email) return;

    note.textContent = `Thanks — a placement cell walkthrough will be sent to ${email}.`;
    form.reset();

    setTimeout(() => {
      note.textContent = "";
    }, 6000);
  });
}
