// ===== QR Passport Photo — API Helper =====
// Sab HTML files mein yeh script include karo:
// <script src="api.js"></script>

const API = (() => {

  // ✅ Render deploy hone ke baad apna URL yahan daalo
  const BASE_URL = window.QR_API_URL || 'https://qrsephoto-backend.onrender.com';

  function getToken(type = 'shop') {
    return localStorage.getItem(type === 'admin' ? 'adminToken' : 'shopToken');
  }

  async function req(method, path, body = null, auth = 'shop') {
    const headers = { 'Content-Type': 'application/json' };
    const token = getToken(auth);
    if (token) headers['Authorization'] = 'Bearer ' + token;

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    try {
      const res = await fetch(BASE_URL + path, opts);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Server error');
      return data;
    } catch (err) {
      console.error(`API ${method} ${path}:`, err.message);
      throw err;
    }
  }

  return {
    // ===== SUPER ADMIN =====
    adminLogin: (id, password) =>
      req('POST', '/api/admin/login', { id, password }).then(d => {
        localStorage.setItem('adminToken', d.token);
        return d;
      }),

    adminGetShops: () => req('GET', '/api/admin/shops', null, 'admin'),
    adminDeleteShop: (shopId) => req('DELETE', `/api/admin/shops/${shopId}`, null, 'admin'),
    adminGetRevenue: () => req('GET', '/api/admin/revenue', null, 'admin'),
    adminGetInstructions: () => req('GET', '/api/admin/instructions'),
    adminSaveInstructions: (instructions) =>
      req('POST', '/api/admin/instructions', { instructions }, 'admin'),
    adminGetExeLink: () => req('GET', '/api/admin/exe-link'),
    adminSaveExeLink: (link) =>
      req('POST', '/api/admin/exe-link', { link }, 'admin'),
    adminGetPricing: () => req('GET', '/api/admin/pricing'),
    adminSavePricing: (actualPrice, offerPrice) =>
      req('POST', '/api/admin/pricing', { actualPrice, offerPrice }, 'admin'),

    // ===== SHOP OWNER =====
    shopRegister: (data) => req('POST', '/api/shop/register', data),
    shopLogin: (shopId, password) =>
      req('POST', '/api/shop/login', { shopId, password }).then(d => {
        localStorage.setItem('shopToken', d.token);
        localStorage.setItem('shopId', d.shop.shopId);
        return d;
      }),
    shopGetMe: () => req('GET', '/api/shop/me'),
    shopUpdateDetails: (data) => req('PUT', '/api/shop/update', data),
    shopUpdatePricing: (copies4, copies6, copies10) =>
      req('PUT', '/api/shop/pricing', { copies4, copies6, copies10 }),
    shopUpdatePaymentMode: (paymentMode) =>
      req('PUT', '/api/shop/payment-mode', { paymentMode }),
    shopUpdateGateway: (keys) => req('PUT', '/api/shop/gateway', keys),
    shopUpdatePrinter: (printer) => req('PUT', '/api/shop/printer', { printer }),
    shopGetQR: () => req('GET', '/api/shop/qr'),

    // ===== CUSTOMER =====
    getShopInfo: (shopId) => req('GET', `/api/shop/${shopId}/info`),

    // ===== PHOTO =====
    uploadPhoto: async (file) => {
      const formData = new FormData();
      formData.append('photo', file);
      const token = getToken('shop');
      const headers = {};
      if (token) headers['Authorization'] = 'Bearer ' + token;
      const res = await fetch(BASE_URL + '/api/photo/upload', { method: 'POST', headers, body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload error');
      return data;
    },
    deletePhoto: (publicId) =>
      req('DELETE', `/api/photo/${encodeURIComponent(publicId)}`),

    // ===== PAYMENT =====
    counterApprove: (orderId, copies, amount) =>
      req('POST', '/api/payment/counter-approve', { orderId, copies, amount }),
    recordPrint: (copies, amount) =>
      req('POST', '/api/stats/print', { copies, amount }),

    // ===== LOGOUT =====
    shopLogout: () => {
      localStorage.removeItem('shopToken');
      localStorage.removeItem('shopId');
    },
    adminLogout: () => {
      localStorage.removeItem('adminToken');
    }
  };
})();
