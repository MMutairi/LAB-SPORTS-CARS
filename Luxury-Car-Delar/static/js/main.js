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
});