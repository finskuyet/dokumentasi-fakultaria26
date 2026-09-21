// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Filter Gallery Items by category
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Reset state
    filterButtons.forEach(b => {
      b.classList.remove('bg-fki-cyan', 'text-fki-dark', 'border-2', 'border-fki-cyan', 'shadow-pop-dark', 'font-black');
      b.classList.add('bg-slate-100', 'dark:bg-fki-navy', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-300', 'dark:border-fki-border', 'hover:border-fki-cyan', 'hover:text-slate-900', 'dark:hover:text-white', 'font-bold');
    });

    // Set active state
    btn.classList.add('bg-fki-cyan', 'text-fki-dark', 'border-2', 'border-fki-cyan', 'shadow-pop-dark', 'font-black');
    btn.classList.remove('bg-slate-100', 'dark:bg-fki-navy', 'text-slate-600', 'dark:text-slate-300', 'border', 'border-slate-300', 'dark:border-fki-border', 'hover:border-fki-cyan', 'hover:text-slate-900', 'dark:hover:text-white', 'font-bold');

    const category = btn.getAttribute('data-category');

    galleryCards.forEach(card => {
      const cardCategories = (card.getAttribute('data-category') || '').split(' ');
      if (category === 'all' || cardCategories.includes(category)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Real-time Search input for photo titles
const setupSearch = (input) => {
  if (input) {
    input.addEventListener('keyup', (e) => {
      const query = e.target.value.toLowerCase().trim();
      galleryCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }
};
setupSearch(document.getElementById('searchInput'));
setupSearch(document.getElementById('mobileSearchInput'));

// Lightbox modal functionality
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxMeta = document.getElementById('lightboxMeta');

function openLightbox(imgSrc, title, meta) {
  if (!lightboxModal) return;
  lightboxImg.src = imgSrc;
  lightboxTitle.textContent = title;
  lightboxMeta.textContent = meta;
  lightboxModal.classList.remove('hidden');
  lightboxModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.add('hidden');
  lightboxModal.classList.remove('flex');
  document.body.style.overflow = 'auto';
}

// Close when clicking modal backdrop
if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });
}

// Close on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggleBtn');
const htmlElement = document.documentElement;
const currentTheme = localStorage.getItem('theme');

// Set initial theme based on localStorage or system preference
if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  htmlElement.classList.add('dark');
} else {
  htmlElement.classList.remove('dark');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

  });
}

// Role Gateway Logic
const roleGateway = document.getElementById('role-gateway');
const tokenSection = document.getElementById('token-section');
const roleButtons = document.getElementById('role-buttons');
const panitiaTokenInput = document.getElementById('panitia-token');
const tokenError = document.getElementById('token-error');

// Check if role is already selected
if (roleGateway) {
  const savedRole = sessionStorage.getItem('fki_role');
  if (savedRole === 'peserta') {
    roleGateway.classList.add('hidden');
  } else if (savedRole === 'panitia' && window.location.pathname.indexOf('panitia.html') === -1) {
    // Optional: Auto redirect if already logged in as panitia but visiting index.html
    window.location.href = 'panitia.html';
  }
}

function selectRole(role) {
  if (role === 'peserta') {
    sessionStorage.setItem('fki_role', 'peserta');
    roleGateway.classList.add('opacity-0');
    setTimeout(() => {
      roleGateway.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

function showPanitiaToken() {
  roleButtons.classList.remove('opacity-100', 'scale-100');
  roleButtons.classList.add('opacity-0', 'scale-95');
  
  setTimeout(() => {
    roleButtons.classList.add('hidden');
    tokenSection.classList.remove('hidden');
    tokenSection.classList.add('flex');
    
    // trigger reflow
    void tokenSection.offsetWidth;
    
    tokenSection.classList.remove('opacity-0', 'scale-95');
    tokenSection.classList.add('opacity-100', 'scale-100');
  }, 300);
}

function hidePanitiaToken() {
  tokenSection.classList.remove('opacity-100', 'scale-100');
  tokenSection.classList.add('opacity-0', 'scale-95');
  
  setTimeout(() => {
    tokenSection.classList.remove('flex');
    tokenSection.classList.add('hidden');
    tokenError.classList.add('hidden');
    panitiaTokenInput.value = '';
    
    roleButtons.classList.remove('hidden');
    
    // trigger reflow
    void roleButtons.offsetWidth;
    
    roleButtons.classList.remove('opacity-0', 'scale-95');
    roleButtons.classList.add('opacity-100', 'scale-100');
  }, 300);
}

function verifyToken() {
  const token = panitiaTokenInput.value.trim();
  if (token === 'PANITIA-FKI-2026') {
    sessionStorage.setItem('fki_role', 'panitia');
    window.location.href = 'panitia.html';
  } else {
    tokenError.classList.remove('hidden');
  }
}

// Recap Carousel & Auto-play Logic
const recapCarousels = document.querySelectorAll('.recap-carousel');

recapCarousels.forEach(carousel => {
  const prevBtn = carousel.parentElement.querySelector('.recap-prev');
  const nextBtn = carousel.parentElement.querySelector('.recap-next');
  const videoItems = Array.from(carousel.querySelectorAll('.snap-center'));
  
  // Add transition classes for smooth scaling/dimming
  videoItems.forEach(item => {
    item.classList.add('transition-all', 'duration-500', 'ease-in-out');
  });

  function getCenterItem() {
    const containerCenter = carousel.getBoundingClientRect().left + (carousel.clientWidth / 2);
    let closestItem = videoItems[0];
    let minDistance = Infinity;

    videoItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + (rect.width / 2);
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestItem = item;
      }
    });
    return closestItem;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const centerItem = getCenterItem();
      const currentIndex = videoItems.indexOf(centerItem);
      if (currentIndex > 0) {
        videoItems[currentIndex - 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
    
    nextBtn.addEventListener('click', () => {
      const centerItem = getCenterItem();
      const currentIndex = videoItems.indexOf(centerItem);
      if (currentIndex < videoItems.length - 1) {
        videoItems[currentIndex + 1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    });
  }

  let isCarouselInView = false;
  
  const carouselObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isCarouselInView = entry.isIntersecting;
      updateActiveVideo();
    });
  }, { threshold: 0.3 });
  
  carouselObserver.observe(carousel);

  function updateActiveVideo() {
    if (!isCarouselInView) {
      videoItems.forEach(item => {
        const vid = item.querySelector('video');
        if (vid) vid.pause();
        item.classList.remove('scale-105', 'opacity-100');
        item.classList.add('opacity-50', 'scale-90');
      });
      return;
    }

    const centerItem = getCenterItem();
    
    videoItems.forEach(item => {
      const vid = item.querySelector('video');
      if (item === centerItem) {
        item.classList.add('scale-105', 'opacity-100');
        item.classList.remove('opacity-50', 'scale-90');
        if (vid) vid.play().catch(e => console.log('Autoplay prevented:', e));
      } else {
        item.classList.remove('scale-105', 'opacity-100');
        item.classList.add('opacity-50', 'scale-90');
        if (vid) vid.pause();
      }
    });
  }

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    scrollTimeout = requestAnimationFrame(() => {
      updateActiveVideo();
    });
  });
  
  // Initial update
  setTimeout(updateActiveVideo, 300);
});
