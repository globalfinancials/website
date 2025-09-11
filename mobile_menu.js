// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// close the mobile nav bar if user selects any option
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    mobileMenu.classList.add("hidden");
  });
});
