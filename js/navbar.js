document.addEventListener('DOMContentLoaded', () => {
  const logoImg = document.querySelector('.nav-logo img');
  if (!logoImg) return;

  const defaultSrc = logoImg.getAttribute('src');
  const hoverSrc = 'assets/logo-hover.png';

  logoImg.addEventListener('mouseenter', () => {
    logoImg.src = hoverSrc;
  });

  logoImg.addEventListener('mouseleave', () => {
    logoImg.src = defaultSrc;
  });
});
