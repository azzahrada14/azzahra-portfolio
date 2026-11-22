
/* =========================================================
   AZZAHRA DWI ARYATI — PROFESSIONAL PORTFOLIO
   Modern | Responsive | Interactive | Light & Dark Mode
========================================================= */

/* =========================================================
   1. THEME SWITCHER
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);

    try {
        localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }

    updateThemeIcon();
}

function updateThemeIcon() {
    if (!themeToggle) return;

    const currentTheme = htmlElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.9 13A9 9 0 0 1 11 3.1
                9 9 0 1 0 20.9 13Z"/>
            </svg>
        `;
        themeToggle.setAttribute("aria-label", "Aktifkan light mode");
    } else {
        themeToggle.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2m0 16v2
                M4.93 4.93l1.42 1.42
                m11.3 11.3 1.42 1.42
                M2 12h2m16 0h2
                M4.93 19.07l1.42-1.42
                m11.3-11.3 1.42-1.42"/>
            </svg>
        `;
        themeToggle.setAttribute("aria-label", "Aktifkan dark mode");
    }
}

// Ambil tema yang tersimpan
let savedTheme = "light";

try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
    savedTheme = "light";
}

setTheme(savedTheme === "dark" ? "dark" : "light");

// Klik tombol tema
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

function closeMobileMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("show");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("show");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu ketika link diklik
    navMenu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Tutup menu ketika klik di luar navigasi
    document.addEventListener("click", event => {
        const clickedInside =
            navMenu.contains(event.target) ||
            menuToggle.contains(event.target);

        if (!clickedInside) {
            closeMobileMenu();
        }
    });

    // Tutup menu saat kembali ke desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            closeMobileMenu();
        }
    });
}

/* =========================================================
   3. HERO TYPING ANIMATION
   "Hi, I'm Azzahra Dwi Aryati"
========================================================= */

function initializeTypingAnimation() {

    const introElement = document.querySelector(".typing-intro");
    const nameElement = document.querySelector(".typing-name");

    if (!nameElement) return;

    const introText = "Hi, I'm ";
    const nameText = "Azzahra Dwi Aryati";

    const typingSpeed = 110;
    const restartDelay = 3000;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Jika pengguna mengurangi animasi
    if (reduceMotion) {
        if (introElement) {
            introElement.textContent = introText;
        }

        nameElement.textContent = nameText;
        return;
    }

    let introIndex = 0;
    let nameIndex = 0;

    if (introElement) {
        introElement.textContent = "";
    }

    nameElement.textContent = "";

    // Mengetik "Hi, I'm"
    function typeIntro() {

        if (!introElement) {
            typeName();
            return;
        }

        if (introIndex < introText.length) {

            introElement.textContent += introText.charAt(introIndex);

            introIndex++;

            setTimeout(typeIntro, typingSpeed);

        } else {

            setTimeout(typeName, 150);

        }
    }

    // Mengetik nama
    function typeName() {

        if (nameIndex < nameText.length) {

            nameElement.textContent += nameText.charAt(nameIndex);

            nameIndex++;

            setTimeout(typeName, typingSpeed);

        } else {

            // Tunggu sebelum animasi diulang
            setTimeout(resetTyping, restartDelay);

        }
    }

    // Mengulang animasi
    function resetTyping() {

        if (introElement) {
            introElement.textContent = "";
        }

        nameElement.textContent = "";

        introIndex = 0;
        nameIndex = 0;

        typeIntro();
    }

    // Mulai animasi
    setTimeout(typeIntro, 500);
}

initializeTypingAnimation();

/* =========================================================
   4. PRELOADER
========================================================= */

const preloader = document.getElementById("preloader");

function hidePreloader() {

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("loaded");
    }, 350);
}

// Pastikan preloader tidak tertinggal
if (document.readyState === "complete") {
    hidePreloader();
} else {
    window.addEventListener("load", hidePreloader, { once: true });
}

/* =========================================================
   5. STICKY HEADER
========================================================= */

const header = document.getElementById("header");

function updateHeader() {

    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateHeader, { passive: true });

updateHeader();

/* =========================================================
   6. SCROLL REVEAL
   Desktop + Mobile
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (reduceMotion || !("IntersectionObserver" in window)) {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

} else {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px 120px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/* =========================================================
   7. PROJECT FILTER
========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Atur tombol aktif
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        // Filter project
        projectCards.forEach(card => {

            const category = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                category === selectedFilter;

            card.classList.toggle("filter-hidden", !shouldShow);
        });

    });

});

/* =========================================================
   8. IMAGE LIGHTBOX
========================================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeButton = document.getElementById("lightboxClose");
const prevButton = document.getElementById("lightboxPrev");
const nextButton = document.getElementById("lightboxNext");

let galleryImages = [];
let currentImageIndex = 0;

// Update gambar lightbox
function updateLightbox() {

    if (!lightboxImage || galleryImages.length === 0) return;

    const currentImage = galleryImages[currentImageIndex];

    lightboxImage.src = currentImage.currentSrc || currentImage.src;
    lightboxImage.alt = currentImage.alt || "Project preview";

    if (lightboxCaption) {
        lightboxCaption.textContent = currentImage.alt || "";
    }

    if (lightboxCounter) {
        lightboxCounter.textContent =
            `${currentImageIndex + 1} / ${galleryImages.length}`;
    }

    // Sembunyikan tombol navigasi jika hanya ada satu gambar
    if (prevButton) {
        prevButton.style.display =
            galleryImages.length > 1 ? "" : "none";
    }

    if (nextButton) {
        nextButton.style.display =
            galleryImages.length > 1 ? "" : "none";
    }
}

// Buka lightbox
function openLightbox(images, index = 0) {

    if (!lightbox || images.length === 0) return;

    galleryImages = images;
    currentImageIndex = index;

    updateLightbox();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");
}

// Tutup lightbox
function closeLightbox() {

    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");
}

// Gambar berikutnya
function showNextImage() {

    if (galleryImages.length === 0) return;

    currentImageIndex =
        (currentImageIndex + 1) % galleryImages.length;

    updateLightbox();
}

// Gambar sebelumnya
function showPreviousImage() {

    if (galleryImages.length === 0) return;

    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) %
        galleryImages.length;

    updateLightbox();
}

// Klik gambar project untuk membuka lightbox
const imageSelectors = [
    ".project-images img",
    ".device-gallery img",
    ".phone-screen img",
    ".creative-gallery img",
    ".certificate-images img"
].join(", ");

document.querySelectorAll(imageSelectors).forEach(image => {

    image.style.cursor = "zoom-in";

    image.addEventListener("click", () => {

        const galleryContainer = image.closest(
            ".project-images, .device-gallery, .phone-gallery, .creative-gallery, .certificate-images"
        );

        const images = galleryContainer
            ? Array.from(galleryContainer.querySelectorAll("img"))
            : [image];

        openLightbox(images, images.indexOf(image));
    });

});

// Galeri tambahan Aksesmu
document.querySelectorAll(".gallery-open").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const galleryName = button.dataset.gallery;

        const gallery = document.querySelector(
            `.hidden-gallery[data-gallery-group="${galleryName}"]`
        );

        if (!gallery) return;

        const images = Array.from(
            gallery.querySelectorAll("img")
        );

        openLightbox(images, 0);
    });

});

// Tombol lightbox
if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
}

if (prevButton) {
    prevButton.addEventListener("click", showPreviousImage);
}

if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
}

// Klik area luar gambar untuk menutup
if (lightbox) {

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });
}

// Keyboard navigation
document.addEventListener("keydown", event => {

    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

});

/* =========================================================
   9. SCROLL PROGRESS
========================================================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();

/* =========================================================
   10. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* =========================================================
   11. DYNAMIC FOOTER YEAR
========================================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   12. PAGE LOADED
========================================================= */

document.body.classList.add("page-loaded");