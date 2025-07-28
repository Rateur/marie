# 🌊 Site de Marie — Facilitatrice graphique & UX/UI

Ce dépôt contient le code du site officiel de **Marie**, facilitatrice en intelligence collective et en facilitation graphique. Le site utilise désormais **Netlify Functions** et une base de données **Neon** pour gérer les avis clients et les éléments du portfolio.

## Structure du projet

- `index.html` – page principale
- `admin.html` – interface d'administration protégée par mot de passe
- `css/` et `js/` – ressources front‑end
- `netlify/functions/` – API (avis, portfolio, login)
- `assets/` – images
- `package.json` – dépendances (pg)

## Installation

1. Clonez le dépôt puis installez les dépendances :

```bash
npm install
```

2. Copiez `.env.example` en `.env` et remplissez les variables :

```bash
NETLIFY_DATABASE_URL_UNPOOLED="postgresql://neondb_owner:npg_4nwCJNUlgiV6@ep-winter-star-a57ner9y.us-east-2.aws.neon.tech/neondb?sslmode=require"
ADMIN_PASSWORD="e73rfSQXsFLyf7Cf"
```

Ces variables sont également à définir dans le **dashboard Netlify** (onglet *Environment variables*).

## Lancement en local

```bash
netlify dev
```

L'interface d'administration est accessible sur `/admin`.

## Déploiement

Poussez simplement vos changements sur GitHub. Netlify déclenchera automatiquement le build et le déploiement.

## Mot de passe d'administration

Le mot de passe unique à utiliser pour accéder à `/admin` est :

```
e73rfSQXsFLyf7Cf
```

Il est stocké dans la variable `ADMIN_PASSWORD` côté serveur.

## Contact

En cas de besoin : [valentinperies007@gmail.com](mailto:valentinperies007@gmail.com)

---

© 2025 – ValDev & Marie. Tous droits réservés.
