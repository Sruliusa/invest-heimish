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
      '<a class="navbar-brand" href="index.html">' +
        '<img src="invest-heimish-logo.svg" class="brand-mark" alt="" aria-hidden="true">' +
        '<span><span class="brand-invest">Invest</span><span class="brand-heimish">Heimish</span></span>' +
      '</a>' +
      '<button class="menu-toggle" aria-label="Menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
      '<nav class="navbar-links">' +
        '<a href="index.html" class="nav-link' + (current === "index.html" ? " active" : "") + '">Home</a>' +
        '<a href="deals.html" class="nav-link' + (current === "deals.html" || current === "deal.html" ? " active" : "") + '">Deals</a>' +
        '<a href="guide.html" class="nav-link' + (current === "guide.html" ? " active" : "") + '">Investor Guide</a>' +
        '<a href="about.html" class="nav-link' + (current === "about.html" ? " active" : "") + '">About</a>' +
        '<a href="contact.html" class="nav-link' + (current === "contact.html" ? " active" : "") + '">Contact</a>' +
        '<a href="calculator.html" class="nav-link' + (current === "calculator.html" ? " active" : "") + '">Calculator</a>' +
      '</nav>' +
      '<a class="navbar-cta" href="contact.html">Talk to Us</a>' +
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
        '<span class="footer-logo"><span class="brand-invest">Invest</span> <span class="brand-heimish">Heimish</span></span>' +
        '<p class="footer-tagline">Simple deals. Real help.</p>' +
      '</div>' +
      '<div class="footer-links">' +
        '<a href="index.html">Home</a>' +
        '<a href="deals.html">Deals</a>' +
        '<a href="about.html">About</a>' +
        '<a href="contact.html">Contact</a>' +
      '</div>' +
      '<div class="footer-contact">' +
        '<a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>' +
        '<a href="tel:+' + WHATSAPP_NUMBER + '">' + CONTACT_PHONE_DISPLAY + '</a>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<p>&copy; 2025 Invest Heimish. All rights reserved.</p>' +
    '</div>';
  document.body.appendChild(footer);
}

async function initNavAuth() {
  if (typeof supabase === "undefined" || !supabase) return;
  var { data: { user } } = await supabase.auth.getUser();
  var cta = document.querySelector(".navbar-cta");
  if (!cta) return;
  if (user) {
    cta.textContent = "Sign Out";
    cta.href = "#";
    cta.onclick = async function(e) {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.href = "index.html";
    };

    var prof = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
    if (prof && prof.data && prof.data.is_admin === true) {
      var links = document.querySelector('.navbar-links');
      if (links && !links.querySelector('.nav-admin-link')) {
        var adminLink = document.createElement('a');
        adminLink.href = 'admin.html';
        adminLink.className = 'nav-link nav-admin-link' +
          (getCurrentPage() === 'admin.html' ? ' active' : '');
        adminLink.textContent = 'Admin';
        links.appendChild(adminLink);
      }
    }
  } else {
    cta.textContent = "Sign In";
    cta.href = "login.html";
  }
}

// Auto-init
document.addEventListener("DOMContentLoaded", function() {
  renderNavbar();
  renderFooter();
  initNavAuth();
});
