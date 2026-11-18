
/* ==========================================
   PAULA ALCALDE®
   EDITORIAL & EXPERIMENTAL PORTFOLIO
   MAIN JAVASCRIPT
========================================== */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       01. SCROLL REVEAL ANIMATIONS
    ====================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 40px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }



    /* ======================================
       02. MOBILE NAVIGATION
    ====================================== */

    const menuButton = document.querySelector(".menu-button");
    const siteNav = document.querySelector(".site-nav");

    if (menuButton && siteNav) {

        const closeMenu = () => {

            siteNav.classList.remove("is-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "MENU";

            document.body.classList.remove("menu-open");

        };

        menuButton.addEventListener("click", () => {

            const isOpen = siteNav.classList.toggle("is-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.textContent = isOpen ? "CLOSE" : "MENU";

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* CLOSE MENU WHEN CLICKING A LINK */

        siteNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });


        /* CLOSE MENU WITH ESCAPE */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        /* RESET MENU WHEN RETURNING TO DESKTOP */

        const desktopQuery = window.matchMedia(
            "(min-width: 768px)"
        );

        const handleDesktopChange = event => {

            if (event.matches) {
                closeMenu();
            }

        };

        desktopQuery.addEventListener(
            "change",
            handleDesktopChange
        );

    }



    /* ======================================
       03. ROOMS — PROJECT FILTERS
    ====================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");

    const projectCards = document.querySelectorAll(".room-card");

    const roomsGallery = document.querySelector(".rooms-gallery");

    const noResults = document.querySelector(".no-results");

    if (
        filterButtons.length &&
        projectCards.length &&
        roomsGallery
    ) {

        filterButtons.forEach(button => {

            button.addEventListener("click", () => {

                const selectedFilter = button.dataset.filter;

                /* UPDATE ACTIVE BUTTON */

                filterButtons.forEach(btn => {

                    const isActive = btn === button;

                    btn.classList.toggle("active", isActive);

                    btn.setAttribute(
                        "aria-pressed",
                        String(isActive)
                    );

                });


                /* FILTER PROJECTS */

                let visibleCount = 0;

                projectCards.forEach(card => {

                    const categories = (
                        card.dataset.category || ""
                    ).split(/\s+/);

                    const matches =
                        selectedFilter === "all" ||
                        categories.includes(selectedFilter);

                    card.classList.toggle(
                        "is-hidden",
                        !matches
                    );

                    card.hidden = !matches;

                    if (matches) {

                        visibleCount++;

                        card.classList.add("is-visible");

                    }

                });


                /* CHANGE GALLERY LAYOUT */

                roomsGallery.classList.toggle(
                    "is-filtered",
                    selectedFilter !== "all"
                );


                /* EMPTY STATE */

                if (noResults) {

                    noResults.hidden = visibleCount !== 0;

                }

            });

        });

    }



    /* ======================================
       04. BACK TO TOP
    ====================================== */

    const backToTopLinks = document.querySelectorAll(
        'a[href="#"]'
    );

    backToTopLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "instant" : "smooth"
            });

        });

    });



    /* ======================================
       05. SUBTLE IMAGE HOVER
    ====================================== */

    const projectImages = document.querySelectorAll(
        ".project-media, .room-card-image"
    );

    if (!reducedMotion) {

        projectImages.forEach(container => {

            const image = container.querySelector("img");

            if (!image) return;

            container.addEventListener("mouseenter", () => {

                image.style.transform = "scale(1.035)";

            });

            container.addEventListener("mouseleave", () => {

                image.style.transform = "";

            });

        });

    }



    /* ======================================
       06. PAGE TRANSITIONS
    ====================================== */

    if (!reducedMotion) {

        document.body.classList.add("page-ready");

        const internalLinks = document.querySelectorAll(
            'a[href$=".html"]'
        );

        internalLinks.forEach(link => {

            link.addEventListener("click", event => {

                if (
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey ||
                    event.button !== 0 ||
                    link.target === "_blank"
                ) {
                    return;
                }

                const destination = link.getAttribute("href");

                if (!destination) return;

                event.preventDefault();

                document.body.classList.add("page-leaving");

                setTimeout(() => {

                    window.location.href = destination;

                }, 350);

            });

        });

    }



    /* ======================================
       07. RESTORE PAGE WHEN USING BACK BUTTON
    ====================================== */

    window.addEventListener("pageshow", () => {

        document.body.classList.remove("page-leaving");

    });

});



/* ======================================
   HERO VIDEO CONTROLS
====================================== */

const heroVideo = document.querySelector(".hero-video");
const videoToggle = document.querySelector(".video-toggle");

if (heroVideo && videoToggle) {

    const updateVideoButton = () => {

        const paused = heroVideo.paused;

        videoToggle.textContent = paused
            ? "PLAY ◌"
            : "PAUSE ◌";

        videoToggle.setAttribute(
            "aria-pressed",
            String(paused)
        );

        videoToggle.setAttribute(
            "aria-label",
            paused
                ? "Play background video"
                : "Pause background video"
        );

    };

    videoToggle.addEventListener("click", async () => {

        if (heroVideo.paused) {

            try {
                await heroVideo.play();
            } catch (error) {
                console.log("Video playback unavailable.");
            }

        } else {
            heroVideo.pause();
        }

        updateVideoButton();

    });

    heroVideo.addEventListener("play", updateVideoButton);
    heroVideo.addEventListener("pause", updateVideoButton);

    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        heroVideo.pause();
    }

    updateVideoButton();
}
