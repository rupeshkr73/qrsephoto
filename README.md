# 📸 QR se Passport Photo Nikalo

> Cyber cafe ke liye QR-based instant passport photo system

---

## 📁 File Structure

```
📦 passport-photo/
├── 📄 homepage.html          ← Main website (GitHub Pages)
├── 📄 index.html             ← Customer flow (QR se open hoga)
├── 📄 shop-register.html     ← Shop registration
├── 📄 shop-owner-panel.html  ← Shop owner dashboard
├── 📄 super-admin.html       ← Super admin panel
├── 📄 api.js                 ← Frontend ↔ Backend connector
└── 📁 backend/
    ├── 📄 server.js          ← Main Express backend
    ├── 📄 package.json
    └── 📄 .env.example       ← Copy karke .env banao
```

---

## 🚀 STEP 1 — Firebase Setup (Free)

1. [firebase.google.com](https://firebase.google.com) → **New Project** banao
2. **Firestore Database** enable karo (Start in test mode)
3. **Project Settings → Service Accounts → Generate New Private Key**
4. Download ki gayi JSON file ka content copy karo

---

## 🖼️ STEP 2 — Cloudinary Setup (Free)

1. [cloudinary.com](https://cloudinary.com) → Free account banao
2. Dashboard se **Cloud Name, API Key, API Secret** copy karo

---

## ⚙️ STEP 3 — Backend Deploy (Render — Free)

1. `backend/` folder ko **alag GitHub repo** mein push karo
2. [render.com](https://render.com) → **New Web Service** → GitHub repo connect karo
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. **Environment Variables** add karo (`.env.example` dekho):

| Variable | Value |
|----------|-------|
| `JWT_SECRET` | koi bhi random string |
| `SUPER_ADMIN_ID` | `rupeshkr73` |
| `SUPER_ADMIN_PASS` | `Rupesh@2608` |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase JSON (single line) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary se |
| `CLOUDINARY_API_KEY` | Cloudinary se |
| `CLOUDINARY_API_SECRET` | Cloudinary se |
| `FRONTEND_URL` | `https://rupeshkr73.github.io/passport-photo` |

5. Deploy karo — **Render URL** milegi (jaise `https://qr-passport-backend.onrender.com`)

---

## 🌐 STEP 4 — Frontend Deploy (GitHub Pages — Free)

1. `api.js` mein apna Render URL update karo:
   ```js
   const BASE_URL = 'https://qr-passport-backend.onrender.com';
   ```

2. Sab HTML files + `api.js` ko GitHub repo mein push karo:
   ```
   rupeshkr73/passport-photo (repo name)
   ```

3. **Settings → Pages → Branch: main → / (root)** → Save

4. Site live hogi:
   `https://rupeshkr73.github.io/passport-photo/homepage.html`

---

## 🔗 STEP 5 — api.js Connect Karo

Har HTML file mein `</body>` se pehle yeh add karo:
```html
<script src="api.js"></script>
```

---

## 🔑 Login Credentials

| Panel | URL | Credentials |
|-------|-----|-------------|
| Super Admin | `/super-admin.html` | `rupeshkr73` / `Rupesh@2608` |
| Shop Owner | `/shop-owner-panel.html` | Shop ID + Password (registration se) |

---

## 💰 Zero Cost Setup

| Service | Free Tier |
|---------|-----------|
| GitHub Pages | Unlimited static hosting |
| Render | 750 hrs/month free |
| Firebase Firestore | 1GB + 50k reads/day free |
| Cloudinary | 25GB storage + 25GB bandwidth free |

---

## ⚠️ Important Notes

- Render free tier mein server **15 min inactivity ke baad sleep** ho jaata hai
- Pehli request slow hogi (cold start ~30 sec) — normal hai
- Production mein Render paid plan use karo (₹700/month)
- Firebase Service Account JSON ko `.gitignore` mein add karo

---

## 📞 Support

Instagram: [@rupeshkr73](https://instagram.com/rupeshkr73)
