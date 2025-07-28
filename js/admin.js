document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const adminSection = document.getElementById('admin-section');
  const passwordInput = document.getElementById('password');

  let adminPassword = localStorage.getItem('adminPassword') || '';

  async function login(pwd) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd })
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success;
  }

  function authHeaders() {
    return { 'Content-Type': 'application/json', 'x-admin': adminPassword };
  }

  async function loadAvis() {
    const res = await fetch('/api/avis');
    const avis = await res.json();
    const list = document.getElementById('avis-list');
    list.innerHTML = '';
    avis.forEach(a => {
      const li = document.createElement('li');
      li.textContent = `${a.name}: ${a.content} (${a.stars}\u2605)`;
      const edit = document.createElement('button');
      edit.textContent = 'Modifier';
      edit.onclick = async () => {
        const name = prompt('Nom', a.name);
        if (name === null) return;
        const content = prompt('Avis', a.content);
        if (content === null) return;
        const stars = parseInt(prompt('Étoiles', a.stars));
        await fetch(`/api/avis?id=${a.id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ name, content, stars }) });
        loadAvis();
      };
      const del = document.createElement('button');
      del.textContent = 'Supprimer';
      del.onclick = async () => {
        await fetch(`/api/avis?id=${a.id}`, { method: 'DELETE', headers: authHeaders() });
        loadAvis();
      };
      li.append(' ', edit, ' ', del);
      list.appendChild(li);
    });
  }

  async function loadPortfolio() {
    const res = await fetch('/api/portfolio');
    const items = await res.json();
    const list = document.getElementById('portfolio-list');
    list.innerHTML = '';
    items.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.title}: ${p.description} [${p.image_url}]`;
      const edit = document.createElement('button');
      edit.textContent = 'Modifier';
      edit.onclick = async () => {
        const title = prompt('Titre', p.title);
        if (title === null) return;
        const description = prompt('Description', p.description);
        if (description === null) return;
        const image_url = prompt("URL de l'image", p.image_url);
        await fetch(`/api/portfolio?id=${p.id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ title, description, image_url }) });
        loadPortfolio();
      };
      const del = document.createElement('button');
      del.textContent = 'Supprimer';
      del.onclick = async () => {
        await fetch(`/api/portfolio?id=${p.id}`, { method: 'DELETE', headers: authHeaders() });
        loadPortfolio();
      };
      li.append(' ', edit, ' ', del);
      list.appendChild(li);
    });
  }

  document.getElementById('avis-form').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('avis-name').value;
    const content = document.getElementById('avis-content').value;
    const stars = parseInt(document.getElementById('avis-stars').value);
    await fetch('/api/avis', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ name, content, stars }) });
    e.target.reset();
    loadAvis();
  });

  document.getElementById('portfolio-form').addEventListener('submit', async e => {
    e.preventDefault();
    const title = document.getElementById('portfolio-title').value;
    const description = document.getElementById('portfolio-description').value;
    const image_url = document.getElementById('portfolio-image').value;
    await fetch('/api/portfolio', { method: 'POST', headers: authHeaders(), body: JSON.stringify({ title, description, image_url }) });
    e.target.reset();
    loadPortfolio();
  });

  async function init() {
    await loadAvis();
    await loadPortfolio();
  }

  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const pwd = passwordInput.value;
    if (await login(pwd)) {
      adminPassword = pwd;
      localStorage.setItem('adminPassword', pwd);
      loginForm.classList.add('hidden');
      adminSection.classList.remove('hidden');
      init();
    } else {
      alert('Mot de passe incorrect');
    }
  });

  (async () => {
    if (adminPassword && await login(adminPassword)) {
      loginForm.classList.add('hidden');
      adminSection.classList.remove('hidden');
      init();
    }
  })();
});
