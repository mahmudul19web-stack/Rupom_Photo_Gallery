/* =========================================================
   RUPOM PHOTO GALLERY — JAVASCRIPT
   Interactive filters, search, lightbox, theme and animations
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 01. PRELOADER: hide the intro screen after page assets load
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        setTimeout(() => preloader?.classList.add("hide"), 350);
    });
    // Safety fallback in case a remote image takes too long
    setTimeout(() => preloader?.classList.add("hide"), 1800);

    // 02. NAVBAR: add a compact style when the page is scrolled
    const siteNav = document.getElementById("siteNav");
    const updateNavbar = () => siteNav?.classList.toggle("scrolled", window.scrollY > 35);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // 03. THEME SWITCHER: remember the visitor's selected theme
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("rupomGalleryTheme");
    if (savedTheme === "light") document.body.classList.add("light-theme");
    const updateThemeIcon = () => {
        if (!themeToggle) return;
        themeToggle.innerHTML = document.body.classList.contains("light-theme")
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon-stars"></i>';
    };
    updateThemeIcon();
    themeToggle?.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        localStorage.setItem("rupomGalleryTheme",
            document.body.classList.contains("light-theme") ? "light" : "dark");
        updateThemeIcon();
    });

    // 04. GALLERY FILTER + SEARCH: combine category and text matching
    const galleryItems = [...document.querySelectorAll(".gallery-item")];
    const filterButtons = [...document.querySelectorAll(".filter-btn")];
    const collectionButtons = [...document.querySelectorAll(".collection-card")];
    const searchInput = document.getElementById("gallerySearch");
    const emptyState = document.getElementById("emptyState");
    let activeFilter = "All";

    function filterGallery() {
        const keyword = (searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        galleryItems.forEach((item) => {
            const categoryMatches = activeFilter === "All" || item.dataset.category === activeFilter;
            const searchableText = `${item.dataset.title || ""} ${item.textContent}`.toLowerCase();
            const searchMatches = searchableText.includes(keyword);
            const shouldShow = categoryMatches && searchMatches;
            item.classList.toggle("is-hidden", !shouldShow);
            if (shouldShow) visibleCount++;
        });

        emptyState?.classList.toggle("d-none", visibleCount !== 0);
    }

    function setFilter(filterName) {
        activeFilter = filterName;
        filterButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.filter === filterName);
        });
        filterGallery();
        document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => setFilter(button.dataset.filter));
    });
    collectionButtons.forEach((button) => {
        button.addEventListener("click", () => setFilter(button.dataset.filter));
    });
    searchInput?.addEventListener("input", filterGallery);

    // 05. LIGHTBOX: open a larger view and navigate between visible images
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");
    let currentImageIndex = 0;
    let visibleCards = [];

    function refreshVisibleCards() {
        visibleCards = galleryItems.filter((item) => !item.classList.contains("is-hidden"));
    }

    function showLightboxImage(index) {
        refreshVisibleCards();
        if (!visibleCards.length) return;
        currentImageIndex = (index + visibleCards.length) % visibleCards.length;
        const card = visibleCards[currentImageIndex];
        const image = card.querySelector(".photo-frame img");
        const title = card.querySelector(".photo-info h3")?.textContent || image?.alt || "Gallery photo";
        if (!image) return;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = title;
    }

    function openLightbox(card) {
        refreshVisibleCards();
        const index = visibleCards.indexOf(card);
        showLightboxImage(index < 0 ? 0 : index);
        lightbox?.classList.add("open");
        lightbox?.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox?.classList.remove("open");
        lightbox?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    galleryItems.forEach((card) => {
        card.querySelector(".view-photo")?.addEventListener("click", () => openLightbox(card));
        card.querySelector(".photo-frame img")?.addEventListener("click", () => openLightbox(card));
    });
    closeButton?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    previousButton?.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
    nextButton?.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));

    // Keyboard controls for a more comfortable image-viewing experience
    document.addEventListener("keydown", (event) => {
        if (!lightbox?.classList.contains("open")) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
        if (event.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
    });

    // 06. SCROLL REVEAL: animate section headings into view
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("visible"));
    }

    // 07. FOOTER YEAR: keep the copyright year current
    const yearElement = document.getElementById("currentYear");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // 08. INITIAL FILTER STATE
    filterGallery();
});
