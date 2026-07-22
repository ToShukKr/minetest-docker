/**
 * Cubely Luanti Server Network - Interactive JavaScript Core
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCopyIP();
  initOnlineCounter();
  initParallax();
  initSmoothScroll();
});

/* --------------------------------------------------------------------------
   1. Header Scroll Effect & Mobile Nav
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Clipboard Copy IP & Toast Notifications
   -------------------------------------------------------------------------- */
function initCopyIP() {
  const copyButtons = document.querySelectorAll('[data-copy-ip]');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const ip = btn.getAttribute('data-copy-ip') || 'play.cubely.net';

      navigator.clipboard.writeText(ip).then(() => {
        showToast(`IP Address <strong>${ip}</strong> copied to clipboard!`);
        
        // Button click visual feedback animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      }).catch(err => {
        // Fallback for clipboard permission issues
        const textArea = document.createElement('textarea');
        textArea.value = ip;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`IP <strong>${ip}</strong> copied!`);
      });
    });
  });
}

function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 10 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove toast after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   3. Dynamic Online Player Counter
   -------------------------------------------------------------------------- */
function initOnlineCounter() {
  const totalOnlineElement = document.getElementById('total-online');
  let baseTotalOnline = 1260;

  // Count up effect on load
  if (totalOnlineElement) {
    animateCount(totalOnlineElement, 0, baseTotalOnline, 1500);
  }

  // Realistic random fluctuation every 5 seconds
  setInterval(() => {
    const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
    baseTotalOnline = Math.max(1000, Math.min(1600, baseTotalOnline + delta));

    if (totalOnlineElement) {
      totalOnlineElement.textContent = baseTotalOnline.toLocaleString('en-US');
    }
  }, 5000);
}

function animateCount(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeProgress * (end - start) + start);
    element.textContent = currentValue.toLocaleString('en-US');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   4. Smooth Background Parallax Effect
   -------------------------------------------------------------------------- */
function initParallax() {
  const bgImage = document.querySelector('.bg-image');
  if (!bgImage) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
    bgImage.style.transform = `scale(1.05) translate(${mouseX}px, ${mouseY}px)`;
  });
}

/* --------------------------------------------------------------------------
   5. Smooth Scroll Navigation & Active Link Highlight
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}
