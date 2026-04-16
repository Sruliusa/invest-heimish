// ── Shared components (navbar + footer) ──────────────────────────────────────

function getCurrentPage() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  return path;
}

function renderNavbar() {
  var current = getCurrentPage();
  var nav = document.createElement("header");
  nav.className = "navbar";
  nav.innerHTML =
    '<div class="navbar-inner">' +
      '<a class="navbar-brand" href="index.html">אינוועסטירן קלוג</a>' +
      '<button class="menu-toggle" aria-label="מעניו">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
      '<nav class="navbar-links">' +
        '<a href="index.html" class="nav-link' + (current === "index.html" ? " active" : "") + '">הויפט זייט</a>' +
        '<a href="deals.html" class="nav-link' + (current === "deals.html" || current === "deal.html" ? " active" : "") + '">דיעלס</a>' +
        '<a href="about.html" class="nav-link' + (current === "about.html" ? " active" : "") + '">וועגן אונז</a>' +
        '<a href="contact.html" class="nav-link' + (current === "contact.html" ? " active" : "") + '">קאנטאקט</a>' +
      '</nav>' +
      '<a class="navbar-cta" href="contact.html">רעד מיט אונז</a>' +
    '</div>';
  document.body.prepend(nav);

  // Mobile menu toggle
  var toggle = nav.querySelector(".menu-toggle");
  var links = nav.querySelector(".navbar-links");
  toggle.addEventListener("click", function() {
    links.classList.toggle("open");
    toggle.classList.toggle("open");
  });
}

function renderFooter() {
  var footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML =
    '<div class="footer-inner">' +
      '<div class="footer-brand">' +
        '<span class="footer-logo">אינוועסטירן קלוג</span>' +
        '<p class="footer-tagline">מיט א היימישע האנט</p>' +
      '</div>' +
      '<div class="footer-links">' +
        '<a href="index.html">הויפט זייט</a>' +
        '<a href="deals.html">דיעלס</a>' +
        '<a href="about.html">וועגן אונז</a>' +
        '<a href="contact.html">קאנטאקט</a>' +
      '</div>' +
      '<div class="footer-contact">' +
        '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<p>&copy; 2025 Invest Heimish. אלע רעכטן רעזערווירט.</p>' +
    '</div>';
  document.body.appendChild(footer);
}

// Auto-init
document.addEventListener("DOMContentLoaded", function() {
  renderNavbar();
  renderFooter();
});
