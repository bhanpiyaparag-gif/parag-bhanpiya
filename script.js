
/* ==========================================================
   PARAG BHANPIYA — INTERACTIONS
========================================================== */

(() => {

    "use strict";

    const progressBar = document.getElementById("progress-bar");
    const header = document.querySelector("header");

    const sections = Array.from(
        document.querySelectorAll("main section[id]")
    );

    const navLinks = Array.from(
        document.querySelectorAll("nav a[href^='#']")
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* ==========================================================
       SCROLL PROGRESS + HEADER BACKGROUND
    ========================================================== */

    let scrollUpdatePending = false;

    function updateScrollUI() {

        const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollableHeight > 0
            ? Math.min(
                100,
                Math.max(0, (scrollTop / scrollableHeight) * 100)
            )
            : 0;

        if (progressBar) {

            progressBar.style.width = `${progress}%`;

            progressBar.setAttribute(
                "aria-valuenow",
                String(Math.round(progress))
            );

        }

        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollTop > 40
            );

        }

        scrollUpdatePending = false;

    }


    function requestScrollUpdate() {

        if (scrollUpdatePending) return;

        scrollUpdatePending = true;

        window.requestAnimationFrame(updateScrollUI);

    }


    window.addEventListener(
        "scroll",
        requestScrollUpdate,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        requestScrollUpdate
    );

    updateScrollUI();


    /* ==========================================================
       ACTIVE NAVIGATION
    ========================================================== */

    function setActiveLink(sectionId) {

        navLinks.forEach((link) => {

            const isActive =
                link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "location"
                );

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }


    if ("IntersectionObserver" in window && sections.length) {

        const navigationObserver = new IntersectionObserver(
            (entries) => {

                const visibleSections = entries
                    .filter(entry => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length) {

                    setActiveLink(
                        visibleSections[0].target.id
                    );

                }

            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );


        sections.forEach(section => {

            navigationObserver.observe(section);

        });

    }


    /* ==========================================================
       FADE-IN ANIMATIONS
    ========================================================== */

    const revealTargets = document.querySelectorAll(
        "main section .container > *, " +
        ".stat-card, " +
        ".leadership-card, " +
        ".achievement-card, " +
        ".project-card, " +
        ".book-card"
    );


    if (
        !prefersReducedMotion.matches &&
        "IntersectionObserver" in window
    ) {

        document.documentElement.classList.add(
            "reveal-enabled"
        );


        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealTargets.forEach(element => {

            element.classList.add("fade");

            revealObserver.observe(element);

        });

    }


    /* ==========================================================
       STATISTICS COUNTER
    ========================================================== */

    const statNumbers = document.querySelectorAll(
        ".stat-card h3[data-count]"
    );


    function animateCounter(element) {

        const target = Number(element.dataset.count);

        if (!Number.isFinite(target)) return;

        const prefix = element.dataset.prefix || "";

        const suffix = element.dataset.suffix || "";

        const decimals = (
            String(element.dataset.count).split(".")[1] || ""
        ).length;


        /* Reduced motion: display the final value immediately */

        if (prefersReducedMotion.matches) {

            element.textContent =
                `${prefix}${target.toFixed(decimals)}${suffix}`;

            return;

        }


        const duration = 1300;

        const startTime = performance.now();


        function frame(now) {

            const elapsed = Math.min(
                (now - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - elapsed, 3);

            const value = target * eased;


            const display = elapsed === 1
                ? target.toFixed(decimals)
                : (
                    decimals
                        ? value.toFixed(decimals)
                        : Math.floor(value).toString()
                );


            element.textContent =
                `${prefix}${display}${suffix}`;


            if (elapsed < 1) {

                window.requestAnimationFrame(frame);

            }

        }


        window.requestAnimationFrame(frame);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


        statNumbers.forEach(number => {

            counterObserver.observe(number);

        });

    } else {

        statNumbers.forEach(animateCounter);

    }


    /* ==========================================================
       PROJECT CARD POINTER EFFECT
    ========================================================== */

    if (window.matchMedia("(pointer: fine)").matches) {

        document.querySelectorAll(".project-card").forEach(card => {

            card.addEventListener(
                "pointermove",
                (event) => {

                    const rect = card.getBoundingClientRect();

                    const x = event.clientX - rect.left;

                    const y = event.clientY - rect.top;

                    card.style.setProperty("--x", `${x}px`);

                    card.style.setProperty("--y", `${y}px`);

                },
                { passive: true }
            );

        });

    }


    /* ==========================================================
       AUTOMATIC FOOTER YEAR
    ========================================================== */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {

        yearElement.textContent =
            String(new Date().getFullYear());

    }


    /* ==========================================================
       CONSOLE MESSAGE
    ========================================================== */

    console.log(
        "%cWelcome 👋",
        "font-size:20px;font-weight:bold;color:#111;"
    );

    console.log(
        "Designed & Developed by Parag Bhanpiya"
    );

})();
