/* ===================================
   MOBILE NAVIGATION
   =================================== */
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMobile = document.querySelector('.navbar-mobile');

if (navbarToggle && navbarMobile) {
    navbarToggle.addEventListener('click', () => {
        navbarMobile.classList.toggle('open');
        // Prevent body scroll when mobile menu is open
        if (navbarMobile.classList.contains('open')) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    });
    
    // Close mobile nav when clicking a link
    const mobileLinks = navbarMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMobile.classList.remove('open');
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        });
    });
}

/* ===================================
   GALLERY FILTER
   =================================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/* ===================================
   LIGHTBOX
   =================================== */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentImageIndex = 0;
let visibleItems = [];

if (lightbox && lightboxImage) {
    // Get all gallery items
    const allGalleryItems = document.querySelectorAll('.gallery-item');
    
    // Function to update visible items based on current filter
    function updateVisibleItems() {
        visibleItems = Array.from(allGalleryItems).filter(item => !item.classList.contains('hidden'));
    }
    
    // Initial update
    updateVisibleItems();
    
    // Open lightbox when clicking a gallery item
    allGalleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            currentImageIndex = visibleItems.indexOf(item);
            
            // Get the image source from the clicked item
            const img = item.querySelector('img');
            if (img) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxImage.style.display = 'block';
            }
            
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
    
    // Navigate to previous image
    function showPrevImage() {
        updateVisibleItems();
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        const prevItem = visibleItems[currentImageIndex];
        
        const img = prevItem.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }
    
    // Navigate to next image
    function showNextImage() {
        updateVisibleItems();
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        const nextItem = visibleItems[currentImageIndex];
        
        const img = nextItem.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
}

/* ===================================
   CONTACT FORM VALIDATION
   =================================== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Reset error states
        [name, phone, email, message].forEach(field => {
            field.classList.remove('error');
        });
        
        // Check required fields
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }
        
        if (!phone.value.trim()) {
            phone.classList.add('error');
            isValid = false;
        }
        
        if (!email.value.trim()) {
            email.classList.add('error');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - in production, this would submit to a backend
            // For now, just log the data and show a success message
            console.log('Form submitted successfully:', {
                name: name.value,
                phone: phone.value,
                email: email.value,
                message: message.value
            });
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

/* ===================================
   ACTIVE NAV LINK
   =================================== */
// Set active nav link based on current page
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.navbar-links a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ============================================================
// BEFORE & AFTER - Scroll-triggered auto-reveal
// ============================================================
function initBeforeAfterReveal() {
    const sliders = document.querySelectorAll('img-comparison-slider');
    if (!sliders.length) return;

    const animateSlider = (slider) => {
        if (slider.dataset.animated) return;
        slider.dataset.animated = 'true';

        let start = null;
        const duration = 1200;
        const from = 0;
        const to = 50;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            slider.value = from + (to - from) * eased;
            if (progress < 1) requestAnimationFrame(step);
        };

        // Wait for component to be ready before animating
        if (typeof slider.value !== 'undefined') {
            slider.value = 0;
            requestAnimationFrame(step);
        } else {
            // Component not ready yet — wait for it
            slider.addEventListener('ready', () => {
                slider.value = 0;
                requestAnimationFrame(step);
            }, { once: true });

            // Fallback: try again after 300ms if 'ready' never fires
            setTimeout(() => {
                if (!slider.dataset.animated) return;
                slider.value = 0;
                requestAnimationFrame(step);
            }, 300);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSlider(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const setSliderValue = (slider, value) => {
        if (typeof slider.value !== 'undefined') {
            slider.value = value;
            return;
        }
        slider.addEventListener('ready', () => {
            slider.value = value;
        }, { once: true });
        setTimeout(() => {
            if (typeof slider.value !== 'undefined') {
                slider.value = value;
            }
        }, 300);
    };

    // Wait for web component to register before observing
    customElements.whenDefined('img-comparison-slider').then(() => {
        sliders.forEach((slider, index) => {
            if (index < 2) {
                // Tutorial pair: start on "before", animate to center when scrolled in
                setSliderValue(slider, 0);
                observer.observe(slider);
            } else {
                // Rest: start centered, no overlay hint
                setSliderValue(slider, 50);
            }
        });
    });
}

initBeforeAfterReveal();

/* ===================================
   SCROLL INDICATOR
   =================================== */
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.querySelector('.services-grid');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================================
// GALLERY SLIDESHOW
// ============================================================
const gallerySlideshow = document.querySelector('.gallery-slideshow');
if (gallerySlideshow) {
    const slides = gallerySlideshow.querySelectorAll('.gallery-slide');
    const progressBar = document.createElement('div');
    progressBar.className = 'gallery-progress';
    gallerySlideshow.appendChild(progressBar);
    
    let currentSlide = 0;
    let progressInterval;
    const slideDuration = 3000; // 3 seconds
    const progressUpdateInterval = 50; // Update every 50ms
    
    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    };
    
    const startProgress = () => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = `width ${slideDuration}ms linear`;
            progressBar.style.width = '100%';
        }, 10);
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        startProgress();
    };
    
    // Start progress bar and slide cycling
    startProgress();
    setInterval(nextSlide, slideDuration);
}

// ============================================================
// BEFORE & AFTER - Drag labels
// ============================================================
document.querySelectorAll('img-comparison-slider').forEach(slider => {
    let fadeTimeout;
    let dragInterval;
    const labels = slider.querySelectorAll('.ba-label');
    const hint = slider.parentElement.querySelector('.ba-hint');
    const hintTop = slider.parentElement.querySelector('.ba-hint-top');
    const hintTopLabel = hintTop ? hintTop.querySelector('.ba-hint-top--label') : null;

    // Update label based on slider position
    const updateHintLabel = () => {
        if (!hintTopLabel) return;
        const value = slider.value || 0;
        hintTopLabel.textContent = value < 50 ? 'BEFORE' : 'AFTER';
    };

    // Initialize label on load
    if (hintTopLabel) {
        updateHintLabel();
    }

    const startDragPolling = () => {
        if (dragInterval) clearInterval(dragInterval);
        dragInterval = setInterval(updateHintLabel, 16); // ~60fps
    };

    const stopDragPolling = () => {
        if (dragInterval) {
            clearInterval(dragInterval);
            dragInterval = null;
        }
    };

    slider.addEventListener('mousedown', () => {
        clearTimeout(fadeTimeout);
        labels.forEach(l => l.style.opacity = '1');
        if (hint) hint.classList.add('hidden');
        if (hintTop) hintTop.classList.add('visible');
        updateHintLabel();
        startDragPolling();
    });
    slider.addEventListener('touchstart', () => {
        clearTimeout(fadeTimeout);
        labels.forEach(l => l.style.opacity = '1');
        if (hint) hint.classList.add('hidden');
        if (hintTop) hintTop.classList.add('visible');
        updateHintLabel();
        startDragPolling();
    });
    slider.addEventListener('mouseup', () => {
        fadeTimeout = setTimeout(() => {
            labels.forEach(l => l.style.opacity = '0');
        }, 800);
        if (hintTop) hintTop.classList.remove('visible');
        stopDragPolling();
    });
    slider.addEventListener('touchend', () => {
        fadeTimeout = setTimeout(() => {
            labels.forEach(l => l.style.opacity = '0');
        }, 800);
        if (hintTop) hintTop.classList.remove('visible');
        stopDragPolling();
    });
});
