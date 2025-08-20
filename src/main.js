
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



