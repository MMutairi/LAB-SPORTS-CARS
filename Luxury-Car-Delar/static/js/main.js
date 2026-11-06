document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    // Dark Mode
    function updateThemeButton() {
        const isDark = document.documentElement.dataset.theme === "dark";

        themeToggle.querySelector("span").textContent =
            isDark ? "light_mode" : "dark_mode";

        themeToggle.setAttribute("aria-pressed", String(isDark));
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    try {
        const savedTheme = localStorage.getItem("velare-theme");

        if (savedTheme === "dark" || savedTheme === "light") {
            document.documentElement.dataset.theme = savedTheme;
        }
    } catch (error) {
        // The site still works if local storage is unavailable.
    }

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.dataset.theme = newTheme;

        try {
            localStorage.setItem("velare-theme", newTheme);
        } catch (error) {
            // Continue without saving the preference.
        }

        updateThemeButton();
    });


    // Mobile Navigation
    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.querySelector("span").textContent =
            isOpen ? "menu" : "close";

        mobileNav.hidden = isOpen;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.hidden = true;
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.querySelector("span").textContent = "menu";
        });
    });

    // Scroll Reveal Animations
    const sections = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach((section) => {
            observer.observe(section);
        });

        document.documentElement.classList.add("has-scroll-reveal");
    }

    // Car Wishlist
    const storageKey = "velare-wishlist";
    let savedCars = [];

    try {
        const stored = JSON.parse(localStorage.getItem(storageKey));

        if (Array.isArray(stored)) {
            savedCars = stored;
        }
    } catch (error) {
        savedCars = [];
    }

    const wishlist = new Set(savedCars);
    const wishlistButtons = document.querySelectorAll("[data-wishlist]");

    wishlistButtons.forEach((button) => {
        const carSlug = button.dataset.wishlist;

        function updateWishlistButton() {
            const isSaved = wishlist.has(carSlug);

            button.classList.toggle("is-active", isSaved);
            button.setAttribute("aria-pressed", String(isSaved));
            button.setAttribute(
                "aria-label",
                isSaved
                    ? "Remove car from wishlist"
                    : "Add car to wishlist"
            );
        }

        updateWishlistButton();

        button.addEventListener("click", () => {
            if (wishlist.has(carSlug)) {
                wishlist.delete(carSlug);
            } else {
                wishlist.add(carSlug);
            }

            try {
                localStorage.setItem(
                    storageKey,
                    JSON.stringify([...wishlist])
                );
            } catch (error) {
                // Continue without persistent storage.
            }

            updateWishlistButton();
        });
    });
});