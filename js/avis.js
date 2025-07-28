document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('avis-wrapper');
  if (!container) return;
  const res = await fetch('/api/avis');
  const avis = await res.json();
  avis.forEach(a => {
    const card = document.createElement('div');
    card.className = 'avis-card';
    const h3 = document.createElement('h3');
    h3.textContent = a.name;
    const p = document.createElement('p');
    p.textContent = a.content;
    const stars = document.createElement('div');
    stars.className = 'stars';
    for (let i = 0; i < a.stars; i++) {
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = 'assets/avis_star.png';
      img.alt = 'Étoile';
      img.className = 'avis_star';
      stars.appendChild(img);
    }
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(stars);
    container.appendChild(card);
  });
});
