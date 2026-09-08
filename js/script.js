const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuButton.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
const statObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const stat = entry.target, target = Number(stat.dataset.count), suffix = stat.dataset.suffix || '', prefix = stat.dataset.prefix || '';
  const start = performance.now(), duration = 1100;
  const update = now => { const progress = Math.min((now - start) / duration, 1), value = target * progress; stat.textContent = prefix + (target % 1 ? value.toFixed(1) : Math.round(value)) + suffix; if (progress < 1) requestAnimationFrame(update); };
  requestAnimationFrame(update); statObserver.unobserve(stat);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(stat => statObserver.observe(stat));
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 600), { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

