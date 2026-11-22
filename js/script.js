
/* =========================================================
   AZZAHRA DWI ARYATI — PROFESSIONAL PORTFOLIO
   Responsive | Safari iOS Friendly | Interactive
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       1. THEME SWITCHER
    ===================================================== */

    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

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

    function setTheme(theme) {
        htmlElement.setAttribute("data-theme", theme);

        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch (error) {
            // Tetap gunakan tema meskipun penyimpanan tidak tersedia.
        }

        updateThemeIcon();
    }

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    setTheme(savedTheme === "dark" ? "dark" : "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = htmlElement.getAttribute("data-theme");

            setTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }


    /* =====================================================
       2. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navMenu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("show");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navMenu.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", function (event) {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) {
                closeMobileMenu();
            }
        });

        window.addEventListener("pageshow", function () {
            if (window.innerWidth > 820) {
                closeMobileMenu();
            }
        });
    }


    
// =====================================
// 3. HERO TYPING ANIMATION
// =====================================

function initializeTypingAnimation() {
    const introElement = document.querySelector(".typing-intro");
    const nameElement = document.querySelector(".typing-name");

    if (!introElement || !nameElement) return;

    const introText = "Hi, I'm ";
    const nameText = "Azzahra Dwi Aryati";

    const typingSpeed = 100;
    const deletingSpeed = 45;
    const pauseAfterTyping = 2500;
    const pauseAfterDeleting = 500;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        introElement.textContent = introText;
        nameElement.textContent = nameText;
        return;
    }

    let index = 0;
    let isDeleting = false;
    let timer = null;

    function typeEffect() {
        if (document.hidden) {
            timer = setTimeout(typeEffect, 500);
            return;
        }

        const fullText = introText + nameText;

        if (!isDeleting) {
            index++;
        } else {
            index--;
        }

        introElement.textContent = fullText.substring(0, Math.min(index, introText.length));
        nameElement.textContent = index > introText.length
            ? fullText.substring(introText.length, index)
            : "";

        if (!isDeleting && index >= fullText.length) {
            isDeleting = true;
            timer = setTimeout(typeEffect, pauseAfterTyping);
            return;
        }

        if (isDeleting && index <= 0) {
            isDeleting = false;
            timer = setTimeout(typeEffect, pauseAfterDeleting);
            return;
        }

        timer = setTimeout(
            typeEffect,
            isDeleting ? deletingSpeed : typingSpeed
        );
    }

    introElement.textContent = "";
    nameElement.textContent = "";

    timer = setTimeout(typeEffect, 500);
}

initializeTypingAnimation();

    /* =====================================================
       4. PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    function hidePreloader() {
        if (!preloader) return;

        preloader.classList.add("loaded");
    }

    if (document.readyState === "complete") {
        setTimeout(hidePreloader, 350);
    } else {
        window.addEventListener("load", function () {
            setTimeout(hidePreloader, 350);
        }, { once: true });
    }

    // Fallback agar preloader tidak tertinggal.
    window.addEventListener("pageshow", function () {
        setTimeout(hidePreloader, 350);
    });


    /* =====================================================
       5. STICKY HEADER
    ===================================================== */

    const header = document.getElementById("header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 40);
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    window.addEventListener("pageshow", updateHeader);

    updateHeader();


    // =====================================
// 6. SCROLL REVEAL
// =====================================

const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function showAllRevealElements() {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}

// Jika pengguna memilih mengurangi animasi
// atau browser tidak mendukung IntersectionObserver
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    showAllRevealElements();
} else {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    // Animasi cukup dijalankan satu kali
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}


    /* =====================================================
       7. PROJECT FILTER
    ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const selectedFilter = button.dataset.filter;

            projectCards.forEach(function (card) {

                const category = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                card.classList.toggle(
                    "filter-hidden",
                    !shouldShow
                );

            });

        });

    });


    /* =====================================================
       8. IMAGE LIGHTBOX
    ===================================================== */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxCounter = document.getElementById("lightboxCounter");

    const closeButton = document.getElementById("lightboxClose");
    const prevButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    let galleryImages = [];
    let currentImageIndex = 0;

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

        if (prevButton) {
            prevButton.style.display =
                galleryImages.length > 1 ? "" : "none";
        }

        if (nextButton) {
            nextButton.style.display =
                galleryImages.length > 1 ? "" : "none";
        }
    }

    function openLightbox(images, index) {

        if (!lightbox || !images || images.length === 0) return;

        galleryImages = images;
        currentImageIndex = index || 0;

        updateLightbox();

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");
    }

    function showNextImage() {

        if (galleryImages.length === 0) return;

        currentImageIndex =
            (currentImageIndex + 1) % galleryImages.length;

        updateLightbox();
    }

    function showPreviousImage() {

        if (galleryImages.length === 0) return;

        currentImageIndex =
            (currentImageIndex - 1 + galleryImages.length) %
            galleryImages.length;

        updateLightbox();
    }

    const imageSelectors = [
        ".project-images img",
        ".device-gallery img",
        ".phone-screen img",
        ".creative-gallery img",
        ".certificate-images img"
    ].join(", ");

    document.querySelectorAll(imageSelectors).forEach(function (image) {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", function () {

            const galleryContainer = image.closest(
                ".project-images, .device-gallery, .phone-gallery, .creative-gallery, .certificate-images"
            );

            const images = galleryContainer
                ? Array.from(galleryContainer.querySelectorAll("img"))
                : [image];

            openLightbox(images, images.indexOf(image));
        });

    });

    // Galeri tambahan Aksesmu.
    document.querySelectorAll(".gallery-open").forEach(function (button) {

        button.addEventListener("click", function (event) {

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

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    if (prevButton) {
        prevButton.addEventListener("click", showPreviousImage);
    }

    if (nextButton) {
        nextButton.addEventListener("click", showNextImage);
    }

    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (!lightbox || !lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showNextImage();
        if (event.key === "ArrowLeft") showPreviousImage();

    });


    /* =====================================================
       9. SCROLL PROGRESS
    ===================================================== */

    const scrollProgress = document.getElementById("scrollProgress");

    function updateScrollProgress() {

        if (!scrollProgress) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = documentHeight > 0
            ? Math.min(100, Math.max(0,
                (scrollTop / documentHeight) * 100))
            : 0;

        scrollProgress.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });

    window.addEventListener("resize", updateScrollProgress);
    window.addEventListener("pageshow", updateScrollProgress);

    updateScrollProgress();


    /* =====================================================
       10. ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navLinks.forEach(function (link) {

                            const isActive =
                                link.getAttribute("href") ===
                                "#" + entry.target.id;

                            link.classList.toggle("active", isActive);
                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       11. DYNAMIC FOOTER YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       12. PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

});
