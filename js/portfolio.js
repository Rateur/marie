document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('#portfolio-carousel img');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  const popup = document.getElementById('portfolio-popup');
  const popupImg = document.getElementById('popup-image');
  const popupTitle = document.getElementById('popup-title');
  const popupDesc = document.getElementById('popup-description');
  const openPopup = document.getElementById('open-popup');
  const popupClose = popup.querySelector('.popup-close');

  let current = 0;

  const showImage = index => {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
  };

  const updatePopup = index => {
    const img = images[index];
    popupImg.src = img.src;
    popupTitle.textContent = img.dataset.title;
    popupDesc.textContent = img.dataset.description;
  };

  const nextImage = () => {
    current = (current + 1) % images.length;
    showImage(current);
    updatePopup(current);
  };

  const prevImage = () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
    updatePopup(current);
  };

  showImage(current);
  updatePopup(current);

  rightBtn.addEventListener('click', nextImage);
  leftBtn.addEventListener('click', prevImage);

  openPopup.addEventListener('click', () => {
    updatePopup(current);
    popup.classList.add('active');
  });

  images.forEach((img, i) => {
    img.addEventListener('click', () => {
      current = i;
      updatePopup(current);
      popup.classList.add('active');
    });
  });

<<<<<<< HEAD
  popupClose.addEventListener('click', () => {
    popup.classList.remove('active');
  });

  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('active');
  });
});
=======
popup.addEventListener('click', (e) => {
  if (e.target === popup) popup.classList.remove('active');
});
>>>>>>> origin/codex/modifier-fichiers-javascript-et-supprimer-script-vide
