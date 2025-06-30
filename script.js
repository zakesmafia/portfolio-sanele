// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all fade-in elements when page loads
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  }
});

// Form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    });
  }
});

// Active navigation highlighting
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.style.color = "#3498db";
    }
  });
}

// Call setActiveNav when page loads
document.addEventListener("DOMContentLoaded", setActiveNav);

// Image lazy loading for better performance
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Photo gallery lightbox functionality
function initPhotoLightbox() {
  const photos = document.querySelectorAll(".photo-item img");

  photos.forEach((photo) => {
    photo.addEventListener("click", function () {
      createLightbox(this.src, this.alt);
    });
  });
}

function createLightbox(src, alt) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${src}" alt="${alt}">
        </div>
    `;

  // Add lightbox styles
  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;

  const content = lightbox.querySelector(".lightbox-content");
  content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

  const img = lightbox.querySelector("img");
  img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    `;

  const close = lightbox.querySelector(".lightbox-close");
  close.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
    `;

  document.body.appendChild(lightbox);

  // Close lightbox on click
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target === close) {
      document.body.removeChild(lightbox);
    }
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.querySelector(".lightbox")) {
      document.body.removeChild(lightbox);
    }
  });
}

// Initialize photo lightbox when DOM is ready
document.addEventListener("DOMContentLoaded", initPhotoLightbox);

// Mobile menu toggle
function initMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");

  // Create mobile menu toggle button
  const menuToggle = document.createElement("button");
  menuToggle.className = "mobile-menu-toggle";
  menuToggle.innerHTML = "☰";
  menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #333;
        cursor: pointer;
    `;

  navbar.querySelector(".nav-container").appendChild(menuToggle);

  // Toggle menu on mobile
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("mobile-active");
  });

  // Add mobile styles
  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-toggle {
                display: block !important;
            }
            
            .nav-links {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: white;
                flex-direction: column;
                align-items: center;
                justify-content: start;
                padding-top: 2rem;
                transition: left 0.3s ease;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .nav-links.mobile-active {
                left: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize mobile menu when DOM is ready
document.addEventListener("DOMContentLoaded", initMobileMenu);
