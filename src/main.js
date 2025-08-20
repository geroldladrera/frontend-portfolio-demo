/**
 * Main entry: interactions & small enhancements.
 * - Global anchor click logger (requirement)
 * - Scroll reveal animations via IntersectionObserver
 * - Taste the Colours: open images in modal
 * - Accessible modal with keyboard support
 */

// Anchor click logger — logs the element that was clicked.
document.addEventListener('click', (evt) => {
  const a = evt.target.closest('a');
  if (!a) return;
  console.log('Anchor clicked:', a);
}, { capture: true });

// Scroll reveal (graceful if unsupported)
const reveal = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('inview--visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = ('IntersectionObserver' in window)
  ? new IntersectionObserver(reveal, { threshold: 0.15 })
  : null;

document.querySelectorAll('.inview').forEach(el => {
  if (observer) observer.observe(el);
  else el.classList.add('inview--visible');
});

// Modal logic
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
let lastFocused = null;

function openModal(src, alt, caption) {
  lastFocused = document.activeElement;
  modalImg.src = src;
  modalImg.alt = alt || '';
  modalCaption.textContent = caption || '';
  modal.removeAttribute('aria-hidden');
  modal.classList.add('is-open');
  // move focus
  modal.querySelector('.modal__close').focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.removeAttribute('src');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.addEventListener('click', (evt) => {
  const trigger = evt.target.closest('a[data-modal="image"], [data-close="modal"]');
  if (!trigger) return;
  if (trigger.matches('[data-close="modal"]')) {
    closeModal();
    return;
  }
  evt.preventDefault();
  const img = trigger.querySelector('img');
  const src = trigger.getAttribute('href') || img?.src;
  const alt = img?.alt || '';
  const caption = trigger.getAttribute('data-caption') || img?.alt || '';
  openModal(src, alt, caption);
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

// Optional: click on backdrop closes too
modal.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('modal__backdrop')) {
    closeModal();
  }
});
