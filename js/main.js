/* ===================================
   MOBILE NAVIGATION
   =================================== */
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMobile = document.querySelector('.navbar-mobile');

if (navbarToggle && navbarMobile) {
    navbarToggle.addEventListener('click', () => {
        navbarMobile.classList.toggle('open');
    });
    
    // Close mobile nav when clicking a link
    const mobileLinks = navbarMobile.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMobile.classList.remove('open');
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
            
            // For now, use the placeholder text as the "image source"
            // When real images are added, this will need to be updated to use the img src
            const placeholder = item.querySelector('.img-placeholder');
            if (placeholder) {
                lightboxImage.src = '';
                lightboxImage.alt = placeholder.textContent;
                lightboxImage.style.display = 'none';
                
                // Create a temporary div to show the placeholder content
                const tempDiv = document.createElement('div');
                tempDiv.className = 'img-placeholder';
                tempDiv.style.height = '400px';
                tempDiv.style.width = '100%';
                tempDiv.style.maxWidth = '90%';
                tempDiv.style.maxHeight = '90%';
                tempDiv.textContent = placeholder.textContent;
                
                // Replace the image with the placeholder div
                lightboxImage.parentNode.insertBefore(tempDiv, lightboxImage);
                lightboxImage.style.display = 'none';
                
                // Store reference to remove later
                lightbox.tempPlaceholder = tempDiv;
            }
            
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        
        // Remove temporary placeholder if exists
        if (lightbox.tempPlaceholder) {
            lightbox.tempPlaceholder.remove();
            lightbox.tempPlaceholder = null;
        }
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
        
        // Remove old placeholder
        if (lightbox.tempPlaceholder) {
            lightbox.tempPlaceholder.remove();
        }
        
        const placeholder = prevItem.querySelector('.img-placeholder');
        if (placeholder) {
            const tempDiv = document.createElement('div');
            tempDiv.className = 'img-placeholder';
            tempDiv.style.height = '400px';
            tempDiv.style.width = '100%';
            tempDiv.style.maxWidth = '90%';
            tempDiv.style.maxHeight = '90%';
            tempDiv.textContent = placeholder.textContent;
            
            lightboxImage.parentNode.insertBefore(tempDiv, lightboxImage);
            lightboxImage.style.display = 'none';
            lightbox.tempPlaceholder = tempDiv;
        }
    }
    
    // Navigate to next image
    function showNextImage() {
        updateVisibleItems();
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        const nextItem = visibleItems[currentImageIndex];
        
        // Remove old placeholder
        if (lightbox.tempPlaceholder) {
            lightbox.tempPlaceholder.remove();
        }
        
        const placeholder = nextItem.querySelector('.img-placeholder');
        if (placeholder) {
            const tempDiv = document.createElement('div');
            tempDiv.className = 'img-placeholder';
            tempDiv.style.height = '400px';
            tempDiv.style.width = '100%';
            tempDiv.style.maxWidth = '90%';
            tempDiv.style.maxHeight = '90%';
            tempDiv.textContent = placeholder.textContent;
            
            lightboxImage.parentNode.insertBefore(tempDiv, lightboxImage);
            lightboxImage.style.display = 'none';
            lightbox.tempPlaceholder = tempDiv;
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
