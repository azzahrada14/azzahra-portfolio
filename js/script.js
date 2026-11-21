
// =====================================
// THEME SWITCHER
// =====================================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const html = document.documentElement;

// Ambil tema yang tersimpan
const savedTheme = localStorage.getItem("portfolio-theme");

// Jika belum pernah memilih, gunakan tema light
const initialTheme = savedTheme || "light";

html.setAttribute("data-theme", initialTheme);

function updateThemeIcon() {
    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "dark") {
        themeIcon.textContent = "☀";
        themeToggle.setAttribute("aria-label", "Aktifkan Light Mode");
        themeToggle.setAttribute("title", "Aktifkan Light Mode");
    } else {
        themeIcon.textContent = "☾";
        themeToggle.setAttribute("aria-label", "Aktifkan Dark Mode");
        themeToggle.setAttribute("title", "Aktifkan Dark Mode");
    }
}

updateThemeIcon();

// Ganti tema ketika tombol diklik
themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);

    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeIcon();
});


// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );
});

// Tutup menu setelah link diklik
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Tutup menu jika klik di luar navbar
document.addEventListener("click", (event) => {
    if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navMenu.classList.remove("show");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    }
});


// =====================================
// AUTOMATIC FOOTER YEAR
// =====================================

document.getElementById("current-year").textContent =
    new Date().getFullYear();
