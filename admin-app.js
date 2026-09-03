/* ==========================================================================
   MOZZARO ADMIN APP - API Client & Mobile Push Notification Logic
   ========================================================================== */

// Universal API Base URL Resolution (Works on Localhost, Network IP, LocalTunnel, & Production)
const getApiBaseUrl = () => {
  if (window.location.origin && window.location.origin !== 'null') {
    if (window.location.port === '3000') {
      return `${window.location.protocol}//${window.location.hostname}:3001/api`;
    }
    return `${window.location.origin}/api`;
  }
  return 'http://localhost:3001/api';
};
const API_BASE_URL = getApiBaseUrl();

// Admin App State
let ordersList = [];
let currentFilter = 'all';
let knownOrderIds = new Set();
let isFirstLoad = true;

// Register PWA Service Worker for Mobile Application
let deferredPrompt = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[PWA] Service Worker registrado con éxito:', reg.scope))
      .catch(err => console.log('[PWA Error] Fallo al registrar Service Worker:', err));
  });
}

// PWA Installation Handler
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  const pwaCard = document.getElementById('pwaInstallCard');
  const installBtn = document.getElementById('installPwaBtn');
  
  if (pwaCard) pwaCard.style.display = 'flex';
  if (installBtn) installBtn.style.display = 'inline-flex';
});

function installAppPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        showToast('¡App Móvil Mozzaro Admin instalada!');
        document.getElementById('pwaInstallCard').style.display = 'none';
      }
      deferredPrompt = null;
    });
  } else {
    alert('Para instalar la App en tu Celular:\n\n• Android: Toca los 3 puntos del navegador (⋮) y selecciona "Instalar aplicación" o "Añadir a la pantalla de inicio".\n• iPhone / Safari: Toca el botón Compartir (⎋) y selecciona "Agregar a inicio".');
  }
}

const ADMIN_PIN = '1234';

function checkAdminPinAuth() {
  const isAuth = sessionStorage.getItem('mozzaro_admin_auth') === 'true';
  const overlay = document.getElementById('pinAuthOverlay');
  if (overlay) {
    if (isAuth) {
      overlay.style.display = 'none';
    } else {
      overlay.style.display = 'flex';
      setTimeout(() => document.getElementById('adminPinInput')?.focus(), 100);
    }
  }
}

function verifyAdminPin(event) {
  event.preventDefault();
  const pinInput = document.getElementById('adminPinInput');
  const errorMsg = document.getElementById('pinErrorMessage');
  
  if (pinInput && pinInput.value.trim() === ADMIN_PIN) {
    sessionStorage.setItem('mozzaro_admin_auth', 'true');
    const overlay = document.getElementById('pinAuthOverlay');
    if (overlay) overlay.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';
    showToast('🔓 ¡Acceso concedido al Panel Admin!');
  } else {
    if (errorMsg) errorMsg.style.display = 'block';
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkAdminPinAuth();
  fetchOrdersFromAPI();
  checkNotificationStatus();

  // Poll API every 5 seconds for real-time updates
  setInterval(fetchOrdersFromAPI, 5000);
});

// 1. Fetch Orders from Node.js API
async function fetchOrdersFromAPI() {
  const statusIndicator = document.getElementById('apiStatusIndicator');

  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const result = await response.json();

    if (result.success) {
      if (statusIndicator) {
        statusIndicator.innerHTML = `<i class="fa-solid fa-circle text-success"></i> API Conectada (Online)`;
      }

      // Check if new order arrived to trigger mobile push notification & audio alert
      detectNewOrders(result.data);

      ordersList = result.data;
      updateStats();
      renderOrdersList();
    }
  } catch (error) {
    console.error('Error al conectar con la API:', error);
    if (statusIndicator) {
      statusIndicator.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-danger" style="color:#e07a5f;"></i> Servidor Offline`;
    }
  }
}

// Detect new incoming orders and send mobile notification
function detectNewOrders(freshOrders) {
  if (isFirstLoad) {
    freshOrders.forEach(o => knownOrderIds.add(o.id));
    isFirstLoad = false;
    return;
  }

  freshOrders.forEach(o => {
    if (!knownOrderIds.has(o.id)) {
      knownOrderIds.add(o.id);
      triggerNewOrderAlert(o);
    }
  });
}

function triggerNewOrderAlert(order) {
  // Toast
  showToast(`🚨 ¡NUEVO PEDIDO RECIBIDO! #${order.id} - ${order.clientName}`);

  // Native Mobile / Browser Push Notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(`🚨 Nuevo Pedido Mozzaro: #${order.id}`, {
      body: `Cliente: ${order.clientName}\nFecha: ${order.deliveryDate} (${order.deliveryTime})\nTotal: $${(order.total || 0).toLocaleString('es-CL')}`,
      icon: 'assets/logo_mozzaro.jpeg'
    });
  }
}

// 2. Update Stats
function updateStats() {
  const todayStr = new Date().toISOString().split('T')[0];

  const total = ordersList.length;
  const today = ordersList.filter(o => o.deliveryDate === todayStr).length;
  const pending = ordersList.filter(o => o.status === 'Pendiente' || o.status === 'En Preparación').length;
  const totalRevenue = ordersList.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statToday').textContent = today;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statRevenue').textContent = `$${totalRevenue.toLocaleString('es-CL')}`;
}

// 3. Render Orders List
function renderOrdersList() {
  const grid = document.getElementById('ordersGrid');
  if (!grid) return;

  const todayStr = new Date().toISOString().split('T')[0];

  let filtered = ordersList;
  if (currentFilter === 'today') {
    filtered = ordersList.filter(o => o.deliveryDate === todayStr);
  } else if (currentFilter === 'pending') {
    filtered = ordersList.filter(o => o.status !== 'Entregado');
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-gold);"></i>
        <p>No hay pedidos registrados en este filtro.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(order => {
    const isToday = order.deliveryDate === todayStr;
    const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');

    return `
      <div class="order-item-card ${isToday ? 'is-today' : ''}">
        <div class="card-top">
          <div>
            <div class="client-name">${order.clientName} <span style="font-size:0.8rem; color:var(--text-muted);">#${order.id}</span></div>
            <div style="font-size:0.85rem; color:var(--primary-gold); margin-top:0.2rem;">
              <i class="fa-solid fa-phone"></i> ${order.phone}
            </div>
          </div>
          <span class="order-badge ${isToday ? 'badge-today' : 'badge-future'}">
            ${isToday ? `🚨 HOY ${order.deliveryTime}` : `📅 ${order.deliveryDate}`}
          </span>
        </div>

        <div class="details-box">
          <strong style="color:var(--text-main);">Pedido:</strong><br>
          ${order.details}
          ${order.address ? `<div style="margin-top:0.4rem; font-size:0.85rem;"><i class="fa-solid fa-location-dot text-gold"></i> ${order.address}</div>` : ''}
        </div>

        <div class="meta-info">
          <div><strong>Total:</strong> $${(order.total || 0).toLocaleString('es-CL')}</div>
          <div><strong>Estado actual:</strong> ${order.status}</div>
        </div>

        <div class="card-actions">
          <select class="select-status" onchange="updateOrderStatusAPI('${order.id}', this.value)">
            <option value="Pendiente" ${order.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="En Preparación" ${order.status === 'En Preparación' ? 'selected' : ''}>En Preparación</option>
            <option value="Listo para Entrega" ${order.status === 'Listo para Entrega' ? 'selected' : ''}>Listo para Entrega</option>
            <option value="Entregado" ${order.status === 'Entregado' ? 'selected' : ''}>Entregado</option>
          </select>

          <div style="display:flex; gap:0.5rem;">
            <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(order.clientName)},%20te%20contactamos%20de%20Mozzaro%20respecto%20a%20tu%20pedido%20%23${order.id}" target="_blank" class="btn btn-whatsapp btn-sm" title="Contactar por WhatsApp">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
            <button class="btn btn-outline btn-sm" onclick="deleteOrderAPI('${order.id}')" title="Eliminar Pedido" style="color:var(--accent-red);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 4. Create New Order via API
async function submitNewOrder(e) {
  e.preventDefault();

  const newOrder = {
    clientName: document.getElementById('inputClientName').value,
    phone: document.getElementById('inputPhone').value,
    email: document.getElementById('inputEmail').value,
    deliveryDate: document.getElementById('inputDate').value,
    deliveryTime: document.getElementById('inputTime').value,
    address: document.getElementById('inputAddress').value,
    details: document.getElementById('inputDetails').value,
    total: document.getElementById('inputTotal').value,
    status: document.getElementById('inputStatus').value
  };

  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
    const result = await res.json();

    if (result.success) {
      showToast(`¡Pedido de ${newOrder.clientName} guardado en la API!`);
      toggleOrderFormModal();
      document.getElementById('createOrderForm').reset();
      fetchOrdersFromAPI();
    }
  } catch (err) {
    alert('Error al guardar el pedido en el servidor');
  }
}

// 5. Update Status via API
async function updateOrderStatusAPI(id, newStatus) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const result = await res.json();

    if (result.success) {
      showToast(`Estado del pedido #${id} actualizado a: ${newStatus}`);
      fetchOrdersFromAPI();
    }
  } catch (err) {
    console.error('Error al actualizar estado:', err);
  }
}

// 6. Delete Order via API
async function deleteOrderAPI(id) {
  if (!confirm(`¿Eliminar definitivamente el pedido #${id}?`)) return;

  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (result.success) {
      showToast(`Pedido #${id} eliminado.`);
      fetchOrdersFromAPI();
    }
  } catch (err) {
    alert('Error al eliminar el pedido.');
  }
}

// Filter Control
function applyFilter(filterType) {
  currentFilter = filterType;
  document.querySelectorAll('.pill-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === filterType);
  });
  renderOrdersList();
}

// Modal Controls
function toggleOrderFormModal() {
  document.getElementById('orderModalOverlay')?.classList.toggle('active');
  document.getElementById('orderModal')?.classList.toggle('active');
}

// Mobile / Desktop Push Notifications
function checkNotificationStatus() {
  const card = document.getElementById('notifCard');
  if ('Notification' in window && Notification.permission === 'granted') {
    // Keep visible for test button
  }
}

function requestPushNotifications() {
  if (!('Notification' in window)) {
    // iOS Safari browser tab mode
    alert('📲 REQUISITO DE APPLE IPHONE (iOS):\n\nPara activar notificaciones en tu iPhone:\n\n1. Toca el botón Compartir (⎋) en la barra inferior de Safari.\n2. Selecciona "Agregar a inicio".\n3. Abre la App Mozzaro Admin desde el ícono de tu celular.\n\nAhí Apple habilitará el permiso de notificaciones emergentes.');
    dispatchTestNotification();
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showToast('¡Notificaciones Push activadas en tu teléfono!');
      checkNotificationStatus();
      dispatchTestNotification();
    } else {
      alert('Permiso de notificaciones bloqueado por el navegador. Si usas iPhone, debes agregar la app a tu Pantalla de Inicio primero.');
    }
  });
}

function sendTestNotification() {
  if (!('Notification' in window)) {
    dispatchTestNotification();
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        dispatchTestNotification();
      } else {
        dispatchTestNotification();
      }
    });
  } else {
    dispatchTestNotification();
  }
}

function playAlertChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch(e) {}
}

function dispatchTestNotification() {
  playAlertChime();
  showToast('🔔 ¡Enviando notificación de prueba a tu celular!');

  const notifTitle = '🚨 ALERTA MOZZARO ADMIN';
  const notifBody = '¡Prueba exitosa! Tu celular está listo para recibir notificaciones de pedidos y entregas.';

  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(notifTitle, {
          body: notifBody,
          icon: 'assets/logo_mozzaro.jpeg',
          badge: 'assets/logo_mozzaro.jpeg',
          vibrate: [200, 100, 200, 100, 200]
        });
      });
    } else {
      try {
        new Notification(notifTitle, {
          body: notifBody,
          icon: 'assets/logo_mozzaro.jpeg'
        });
      } catch(e) {}
    }
  }

  // Auto create test order in API
  const todayStr = new Date().toISOString().split('T')[0];
  const nowTime = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });

  fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientName: 'Cliente Prueba iPhone 📲',
      phone: '+56912345678',
      deliveryDate: todayStr,
      deliveryTime: nowTime,
      details: '2x Empanadas de Queso (50 u), 1x Empanadas de Pino (100 u)',
      total: 109000,
      status: 'Pendiente'
    })
  }).then(() => fetchOrdersFromAPI()).catch(() => {});
}

// Toast Helper
function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '2rem';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = 'rgba(230, 194, 128, 0.95)';
  toast.style.color = '#090B0E';
  toast.style.padding = '0.75rem 1.5rem';
  toast.style.borderRadius = '9999px';
  toast.style.fontWeight = '700';
  toast.style.boxShadow = '0 8px 25px rgba(0,0,0,0.5)';
  toast.style.zIndex = '3000';
  toast.style.fontSize = '0.9rem';
  toast.textContent = msg;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
