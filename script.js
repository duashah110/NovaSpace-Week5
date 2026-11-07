
const app = document.getElementById("app");
const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");

document.getElementById("year").textContent =
    new Date().getFullYear();

const pages = {

    "/": `
        <section class="page hero">
            <div>
                <p class="eyebrow">Welcome to TechNova</p>
                <h1>Ideas deserve <span>better</span> digital experiences.</h1>
                <p class="lead">
                    We create modern websites and digital solutions
                    that help businesses grow.
                </p>
                <a href="/services" data-link class="btn">
                    Explore Services ↗
                </a>
                <a href="/about" data-link class="btn btn-outline">
                    Learn More
                </a>
            </div>

            <div class="hero-art" role="img"
                 aria-label="Purple abstract technology illustration">
                <span class="hero-icon">✦</span>
            </div>
        </section>

        <section class="page">
            <div class="section-heading">
                <p class="eyebrow">Our Expertise</p>
                <h2>What We Do</h2>
            </div>
            ${serviceCards()}
        </section>

        <section class="band">
            <h2>Ready to start your next project?</h2>
            <p>Let's turn your ideas into something meaningful.</p>
            <a href="/contact" data-link class="btn">
                Contact Us
            </a>
        </section>
    `,

    "/about": `
        <section class="page">
            <p class="eyebrow">Who We Are</p>
            <h1>About <span>TechNova</span></h1>
            <p class="lead">
                TechNova is a digital solutions studio focused
                on creative design, modern technology and
                meaningful user experiences.
            </p>

            <div class="cards">
                <article class="card">
                    <h3>Our Mission</h3>
                    <p>To create accessible and reliable digital products.</p>
                </article>
                <article class="card">
                    <h3>Our Vision</h3>
                    <p>To make technology useful and simple for everyone.</p>
                </article>
                <article class="card">
                    <h3>Our Values</h3>
                    <p>Creativity, collaboration and continuous improvement.</p>
                </article>
            </div>
        </section>
    `,

    "/services": `
        <section class="page">
            <div class="section-heading">
                <p class="eyebrow">What We Offer</p>
                <h1>Our <span>Services</span></h1>
                <p class="lead">
                    Digital services designed to support your business goals.
                </p>
            </div>
            ${serviceCards()}
        </section>
    `,

    "/projects": `
        <section class="page">
            <p class="eyebrow">Our Portfolio</p>
            <h1>Featured <span>Projects</span></h1>
            <p class="lead">
                Explore examples of digital experiences we love creating.
            </p>

            <div class="cards">
                <article class="card">
                    <div class="card-icon">▦</div>
                    <h3>Business Dashboard</h3>
                    <p>A clean dashboard for managing business information.</p>
                </article>

                <article class="card">
                    <div class="card-icon">◎</div>
                    <h3>E-commerce Website</h3>
                    <p>A modern online shopping experience.</p>
                </article>

                <article class="card">
                    <div class="card-icon">✦</div>
                    <h3>Creative Portfolio</h3>
                    <p>A professional website for creative professionals.</p>
                </article>
            </div>
        </section>
    `,

    "/contact": `
        <section class="page">
            <p class="eyebrow">Get In Touch</p>
            <h1>Let's <span>Connect</span></h1>
            <p class="lead">
                Have a project in mind? Send us a message.
            </p>

            <form class="contact-form card" id="contactForm">
                <div>
                    <label for="name">Your Name</label>
                    <input type="text" id="name" required
                        placeholder="Enter your name">
                </div>

                <div>
                    <label for="email">Email Address</label>
                    <input type="email" id="email" required
                        placeholder="Enter your email">
                </div>

                <div>
                    <label for="message">Your Message</label>
                    <textarea id="message" required minlength="10"
                        placeholder="Write your message"></textarea>
                </div>

                <button type="submit" class="btn">Send Message</button>
                <p class="status" id="formStatus"
                    role="status" aria-live="polite"></p>
            </form>
        </section>
    `
};

function serviceCards() {
    return `
        <div class="cards">
            <article class="card">
                <div class="card-icon">✦</div>
                <h3>Web Design</h3>
                <p>Beautiful and responsive website interfaces.</p>
            </article>

            <article class="card">
                <div class="card-icon">⌘</div>
                <h3>Web Development</h3>
                <p>Modern and reliable web applications.</p>
            </article>

            <article class="card">
                <div class="card-icon">↗</div>
                <h3>Digital Strategy</h3>
                <p>Practical digital solutions for business growth.</p>
            </article>
        </div>
    `;
}

function normalizePath(path) {
    if (path === "/index.html" || !path) return "/";
    return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

function renderPage(path, addHistory = false) {
    const route = normalizePath(path);

    if (addHistory) {
        history.pushState({ route }, "", route);
    }

    app.innerHTML = pages[route] || `
        <section class="page not-found">
            <p class="eyebrow">404 Error</p>
            <h1>Page Not Found</h1>
            <p class="lead">The requested page does not exist.</p>
            <a href="/" data-link class="btn">Return Home</a>
        </section>
    `;

    document.querySelectorAll("nav a[data-link]").forEach(link => {
        const linkPath = normalizePath(
            new URL(link.href, location.origin).pathname
        );

        if (linkPath === route) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");

    app.focus({ preventScroll: true });
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth"
    });

    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            if (!form.reportValidity()) return;

            document.getElementById("formStatus").textContent =
                "Your form has been validated successfully! (Demo only; no message was sent.)";

            form.reset();
        });
    }
}

// Intercept internal navigation links
document.addEventListener("click", function(event) {
    const link = event.target.closest("a[data-link]");

    if (!link) return;

    const url = new URL(link.href, location.origin);

    if (url.origin !== location.origin) return;

    event.preventDefault();

    const nextPath = normalizePath(url.pathname);

    if (nextPath !== normalizePath(location.pathname)) {
        renderPage(nextPath, true);
    }
});

// Browser Back and Forward buttons
window.addEventListener("popstate", function() {
    renderPage(location.pathname);
});

// Mobile menu
menuToggle.addEventListener("click", function() {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" &&
        navigation.classList.contains("open")) {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
    }
});

// Initial page rendering
renderPage(location.pathname);
