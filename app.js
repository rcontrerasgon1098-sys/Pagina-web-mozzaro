/* ==========================================================================
   MOZZARO - Bocaditos & Comida para Cócteles y Eventos
   Application Logic & State Management
   ========================================================================== */

// Menu Catalog Data (Productos Reales Mozzaro)
const MENU_ITEMS = [
  {
    id: 1,
    name: 'Canapés Salados Variados',
    category: 'salados',
    price: 0,
    portion: 'Porciones a cotizar',
    desc: 'Elegantes canapés preparados frescos con ingrediente variado de primera calidad (salmón ahumado, jamón serrano, espárragos y tartelitas de queso).',
    image: 'assets/canape_1.jpeg',
    gallery: ['assets/canape_1.jpeg', 'assets/canape_2.jpeg']
  },
  {
    id: 2,
    name: 'Empanadas de Queso Cóctel',
    category: 'salados',
    price: 33000,
    portion: '50 u / 100 u',
    priceFormatted: '50 u: $33.000 | 100 u: $60.000',
    desc: 'Crocantes y sabrosas mini empanaditas cóctel rellenas de queso derretido, listas para calentar, servir y compartir.',
    image: 'assets/empanadas_queso.jpeg'
  },
  {
    id: 3,
    name: 'Empanadas de Pino Cóctel',
    category: 'salados',
    price: 33000,
    portion: '50 u / 100 u',
    priceFormatted: '50 u: $33.000 | 100 u: $60.000',
    desc: 'Tradicionales mini empanaditas cóctel rellenas de pino de carne jugoso con especias.',
    image: 'assets/empanadas_pino.jpeg'
  },
  {
    id: 4,
    name: 'Mini Hamburguesas',
    category: 'salados',
    price: 45000,
    portion: '50 u / 100 u',
    priceFormatted: '50 u: $45.000 | 100 u: $80.000',
    desc: 'Sabrosas mini hamburguesitas en tierno pan brioche fresco con queso derretido y aderezos.',
    image: 'assets/mini_hamburguesas.jpeg'
  },
  {
    id: 5,
    name: 'Tapaditos de Pollo',
    category: 'salados',
    price: 33000,
    portion: '50 u / 100 u',
    priceFormatted: '50 u: $33.000 | 100 u: $60.000',
    desc: 'Suaves bocaditos de pan de molde o brioche rellenos de cremosa pasta de pollo casera.',
    image: 'assets/tapaditos_pollo.jpeg'
  },
  {
    id: 6,
    name: 'Mini Chaparritas',
    category: 'salados',
    price: 28000,
    portion: '50 u / 100 u',
    priceFormatted: '50 u: $28.000 | 100 u: $52.000',
    desc: 'Deliciosas mini chaparritas horneadas rellenas de vienesa jugosa y queso fundido.',
    image: 'assets/mini_chaparritas.jpeg'
  },
  {
    id: 15,
    name: 'Empanada Tradicional de Queso (Tamaño Normal - Grande)',
    category: 'salados',
    price: 0,
    portion: 'Unidades a cotizar (Tamaño Tradicional)',
    desc: 'Exquisita empanada doradita de queso en tamaño grande/tradicional (no de cóctel), rellena de abundante queso fundido.',
    image: 'assets/empanada_queso_alejada.jpeg'
  },
  {
    id: 7,
    name: 'Mini Sopaipillas (5 cm aprox.)',
    category: 'salados',
    price: 13000,
    portion: '50 u / 100 u',
    priceFormatted: '50 u: $13.000 | 100 u: $20.000',
    desc: 'Tradicionales mini sopaipillas crujientes y doraditas, ideales para picotear y compartir en cualquier evento (se entregan sin pebre).',
    image: 'assets/mini_sopaipillas.jpeg'
  },
  {
    id: 13,
    name: 'Mini Pizza Napolitana (5 cm)',
    category: 'salados',
    price: 28000,
    portion: '48 u / 96 u',
    priceFormatted: '48 u: $28.000 | 96 u: $52.000',
    desc: 'Deliciosas mini pizzas horneadas estilo napolitana con salsa de tomate casera, queso mozzarella fundido y orégano.',
    image: 'assets/mini_pizzas_coctel.jpeg'
  },
  {
    id: 8,
    name: 'Mini Cupcakes Rellenos (Chocolate o Frosting)',
    category: 'dulces',
    price: 33000,
    portion: '45 unidades',
    priceFormatted: '45 u (Bañados en chocolate y sprinkles): $33.000 | 45 u (Con frosting): $40.990',
    desc: 'Esponjosos mini cupcakes caseros rellenos. Disponibles bañados en fina cobertura de chocolate con sprinkles o con suave frosting cremoso.',
    image: 'assets/cupcake_frosting.jpeg'
  },
  {
    id: 9,
    name: 'Mini Donas simples o Temáticas',
    category: 'dulces',
    price: 18000,
    portion: '60 unidades',
    priceFormatted: '60 u (Chocolate): $18.000 | 60 u (Sprinkles): $23.000 | 60 u (Personalizadas): $27.000',
    desc: 'Deliciosas mini donitas cubiertas con chocolate tradicional, chispitas de colores o decoradas según la temática de tu evento.',
    image: 'assets/mini_donas_tematica.jpeg'
  },
  {
    id: 10,
    name: 'Mini Tartas de Fruta',
    category: 'dulces',
    price: 33000,
    portion: '45 unidades',
    priceFormatted: '45 unidades: $33.000',
    desc: 'Crocantes mini tartaletas artesanales (45 u). Incluyen variedades: 1) Mermelada, crema chantilly y frutillas. 2) Mermelada, crema pastelera, durazno, piña y cereza.',
    image: 'assets/tarta_fruta.jpeg'
  },
  {
    id: 14,
    name: 'Galletas Temáticas Personalizadas',
    category: 'dulces',
    price: 0,
    portion: 'A pedido a tu medida',
    priceFormatted: 'Precio a cotizar según requerimiento del cliente',
    desc: 'Hermosas galletas glaseadas artesanales 100% personalizadas. El precio varía según la complejidad del diseño, la temática y la cantidad requerida por el cliente.',
    image: 'assets/galleta_bautizo.jpeg'
  }
];

// App State
let cart = [];
let currentCategory = 'all';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  renderMenu();
  initCategoryTabs();
  initCalculator();
  initFaqAccordion();
  initCartDrawer();
  initMobileMenu();
  initProductModal();
  initScrollspy();
  initAdminPanel();
  updateCartUI();
  filterPortfolio('all');
  initMaintenanceMode();
});

// Maintenance Mode Handler
function initMaintenanceMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const isPreviewParam = urlParams.get('preview') === 'true';
  const isUnlockedSession = sessionStorage.getItem('mozzaro_preview_unlocked') === 'true';

  const overlay = document.getElementById('constructionOverlay');
  const banner = document.getElementById('previewBanner');

  if (isPreviewParam || isUnlockedSession) {
    if (overlay) overlay.style.display = 'none';
    if (banner) banner.style.display = 'block';
    sessionStorage.setItem('mozzaro_preview_unlocked', 'true');
  } else {
    if (overlay) overlay.style.display = 'flex';
    if (banner) banner.style.display = 'none';
  }
}

let logoClickCount = 0;
let logoClickTimer;

function handleLogoClick() {
  logoClickCount++;
  clearTimeout(logoClickTimer);
  logoClickTimer = setTimeout(() => {
    logoClickCount = 0;
  }, 1200);

  if (logoClickCount >= 3) {
    unlockPreviewMode();
    logoClickCount = 0;
  }
}

function unlockPreviewMode() {
  const overlay = document.getElementById('constructionOverlay');
  const banner = document.getElementById('previewBanner');
  if (overlay) overlay.style.display = 'none';
  if (banner) banner.style.display = 'block';
  sessionStorage.setItem('mozzaro_preview_unlocked', 'true');
}

function lockMaintenanceMode() {
  const overlay = document.getElementById('constructionOverlay');
  const banner = document.getElementById('previewBanner');
  if (overlay) overlay.style.display = 'flex';
  if (banner) banner.style.display = 'none';
  sessionStorage.removeItem('mozzaro_preview_unlocked');
}

function toggleDetailsModal(show) {
  const modal = document.getElementById('detailsModal');
  if (modal) {
    modal.style.display = show ? 'flex' : 'none';
    document.body.style.overflow = show ? 'hidden' : '';
  }
}

// 1. Header Scroll Effect & Scrollspy
function initNavbarScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Mobile Menu Handler
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

// 2. Render Catalog Menu (Showcase Mode - Direct Quotation)
function renderMenu() {
  const menuGrid = document.getElementById('menuGrid');
  if (!menuGrid) return;

  const filteredItems = currentCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === currentCategory);

  menuGrid.innerHTML = filteredItems.map(item => {
    const waText = encodeURIComponent(`Hola Mozzaro, quisiera consultar disponibilidad y cotizar el producto: ${item.name}`);

    return `
      <div class="menu-card" data-id="${item.id}">
        <div class="menu-card-img-wrap" onclick="openProductModal(${item.id})" style="cursor: pointer;">
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
          ${item.badge ? `<span class="badge badge-gold menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <h3 class="menu-card-title" onclick="openProductModal(${item.id})" style="cursor: pointer;">${item.name}</h3>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-portion">
            <i class="fa-solid fa-utensils text-gold"></i> ${item.portion}
          </div>
          ${item.priceFormatted ? `
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--primary-gold); background: rgba(230, 194, 128, 0.08); border: 1px solid var(--border-gold); padding: 0.5rem 0.75rem; border-radius: 6px; margin: 0.5rem 0; line-height: 1.5;">
              <div style="margin-bottom: 0.2rem;"><i class="fa-solid fa-tag"></i> Precios Oficiales:</div>
              ${item.priceFormatted.split(' | ').map(p => `<div style="font-weight:600;">• ${p}</div>`).join('')}
            </div>
          ` : ''}
          <div class="menu-card-actions" style="margin-top: 1.25rem;">
            <button class="btn btn-gold btn-sm" onclick="openProductModal(${item.id})" style="width: 100%;">
              <i class="fa-solid fa-eye"></i> Ver Detalle & Cotizar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Product Quick View Modal Logic (Showcase Mode)
function initProductModal() {
  const overlay = document.getElementById('productModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (overlay) overlay.addEventListener('click', closeProductModal);
  if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
}

let activeGalleryImages = [];
let activeGalleryIndex = 0;

function openProductModal(id) {
  const item = MENU_ITEMS.find(m => m.id === id);
  if (!item) return;

  const modalBody = document.getElementById('modalBody');
  const overlay = document.getElementById('productModalOverlay');
  const modal = document.getElementById('productModal');

  const waText = encodeURIComponent(`Hola Mozzaro, me interesa cotizar: ${item.name} (${item.portion})`);

  activeGalleryImages = (item.gallery && item.gallery.length > 0) ? item.gallery : [item.image];
  activeGalleryIndex = 0;

  const hasGallery = activeGalleryImages.length > 1;

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-wrap" style="position: relative; overflow: hidden; border-radius: 12px;">
        <img src="${activeGalleryImages[0]}" alt="${item.name}" id="modalMainImg" class="modal-img" style="transition: all 0.3s ease;">
        ${hasGallery ? `
          <button class="gallery-arrow arrow-left" onclick="slideModalGallery(-1)" aria-label="Anterior foto">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="gallery-arrow arrow-right" onclick="slideModalGallery(1)" aria-label="Siguiente foto">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <div class="gallery-badge-indicator" id="modalGalleryCounter">1 / ${activeGalleryImages.length} fotos</div>
        ` : ''}
      </div>
      <div class="modal-content">
        <div>
          <h2 class="modal-title">${item.name}</h2>
          <div class="modal-portion">
            <i class="fa-solid fa-utensils text-gold"></i> ${item.portion}
          </div>
          <p class="modal-desc" style="margin: 0.75rem 0; font-size: 0.95rem;">${item.desc}</p>

          ${item.priceFormatted ? `
            <div style="background: rgba(230, 194, 128, 0.1); border: 1px solid var(--border-gold); border-radius: 8px; padding: 0.85rem 1rem; margin: 1rem 0;">
              <span style="font-size: 0.8rem; color: var(--primary-gold); font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 0.4rem;"><i class="fa-solid fa-calculator"></i> Precios Oficiales por Variedad:</span>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); line-height: 1.6;">
                ${item.priceFormatted.split(' | ').map(p => `<div>• ${p}</div>`).join('')}
              </div>
            </div>
          ` : ''}

          ${hasGallery ? `
            <div style="margin-bottom: 1rem;">
              <span style="font-size: 0.8rem; color: var(--primary-gold); font-weight: 600; display: block; margin-bottom: 0.4rem;"><i class="fa-solid fa-images"></i> Desliza para ver más fotos (${activeGalleryImages.length}):</span>
              <div class="modal-thumbnails-strip" style="display: flex; gap: 0.5rem;">
                ${activeGalleryImages.map((img, idx) => `
                  <img src="${img}" class="modal-thumb" onclick="setModalGalleryIndex(${idx})" alt="Foto ${idx + 1}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--primary-gold)' : 'transparent'}; opacity: ${idx === 0 ? '1' : '0.5'}; transition: all 0.2s ease;">
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="modal-tags">
            <span class="modal-tag"><i class="fa-solid fa-box text-gold"></i> Presentación en Cajas</span>
            <span class="modal-tag"><i class="fa-solid fa-circle-check text-gold"></i> Listo para Servir</span>
          </div>
        </div>

        <div class="modal-footer" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem;">
          <a href="https://wa.me/56912345678?text=${waText}" target="_blank" class="btn btn-gold" onclick="closeProductModal()">
            <i class="fa-brands fa-whatsapp"></i> Cotizar por WhatsApp
          </a>
          <a href="#contacto-directo" class="btn btn-outline" onclick="closeProductModal()">
            <i class="fa-solid fa-envelope"></i> Cotizar por Formulario
          </a>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  modal.classList.add('active');
}

function slideModalGallery(direction) {
  if (!activeGalleryImages || activeGalleryImages.length <= 1) return;
  activeGalleryIndex = (activeGalleryIndex + direction + activeGalleryImages.length) % activeGalleryImages.length;
  updateModalGalleryUI();
}

function setModalGalleryIndex(index) {
  activeGalleryIndex = index;
  updateModalGalleryUI();
}

function updateModalGalleryUI() {
  const mainImg = document.getElementById('modalMainImg');
  const counter = document.getElementById('modalGalleryCounter');
  const thumbs = document.querySelectorAll('.modal-thumb');

  if (mainImg) mainImg.src = activeGalleryImages[activeGalleryIndex];
  if (counter) counter.textContent = `${activeGalleryIndex + 1} / ${activeGalleryImages.length} fotos`;

  thumbs.forEach((thumb, idx) => {
    if (idx === activeGalleryIndex) {
      thumb.style.borderColor = 'var(--primary-gold)';
      thumb.style.opacity = '1';
    } else {
      thumb.style.borderColor = 'transparent';
      thumb.style.opacity = '0.5';
    }
  });
}

function closeProductModal() {
  document.getElementById('productModalOverlay')?.classList.remove('active');
  document.getElementById('productModal')?.classList.remove('active');
}


// 3. Category Tabs Filtering
function initCategoryTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.getAttribute('data-category');
      renderMenu();
    });
  });
}

// 4. Interactive Event Calculator Logic
function initCalculator() {
  const guestSlider = document.getElementById('guestSlider');
  const guestValDisplay = document.getElementById('guestValDisplay');
  const eventTypeBtns = document.querySelectorAll('.event-type-btn');
  
  if (!guestSlider) return;

  let guests = parseInt(guestSlider.value);
  let eventFactor = 1.0; // Normal social event

  // Update slider guest display
  guestSlider.addEventListener('input', (e) => {
    guests = parseInt(e.target.value);
    guestValDisplay.textContent = `${guests} personas`;
    calculateResults(guests, eventFactor);
  });

  // Event type selection
  eventTypeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      eventTypeBtns.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      eventFactor = parseFloat(target.getAttribute('data-factor') || 1.0);
      calculateResults(guests, eventFactor);
    });
  });

  // Initial calculation
  calculateResults(guests, eventFactor);
}

function calculateResults(guests, factor) {
  // Average bites per person for cocktail events:
  // Salados: 7-9 per person
  // Dulces: 3-4 per person
  
  const saladosCount = Math.round(guests * 8 * factor);
  const dulcesCount = Math.round(guests * 3.5 * factor);
  
  // Price estimate per person approx $6.500 - $8.500 CLP depending on factor
  const pricePerPerson = Math.round(7500 * factor);
  const totalEstimatedPrice = guests * pricePerPerson;

  // Render to UI
  const resSalados = document.getElementById('resSalados');
  const resDulces = document.getElementById('resDulces');
  const resTotalPrice = document.getElementById('resTotalPrice');
  if (resSalados) resSalados.textContent = `${saladosCount} unidades`;
  if (resDulces) resDulces.textContent = `${dulcesCount} unidades`;
  if (resTotalPrice) resTotalPrice.textContent = `$${totalEstimatedPrice.toLocaleString('es-CL')}`;
}

// Send Calculator Recommendation directly to WhatsApp
function addCalculatorToCart() {
  const guestSlider = document.getElementById('guestSlider');
  const guests = parseInt(guestSlider?.value || 30);

  const saladosCount = Math.round(guests * 8 * eventFactor);
  const dulcesCount = Math.round(guests * 3.5 * eventFactor);

  let msg = `Hola Mozzaro, utilicé la calculadora de su sitio web para un grupo de ${guests} personas.\n\n`;
  msg += `Quisiera cotizar los siguientes bocaditos recomendados:\n`;
  msg += `• Bocaditos Salados: ${saladosCount} unidades\n`;
  msg += `• Bocaditos Dulces: ${dulcesCount} unidades\n\n`;
  msg += `¿Me podrían confirmar disponibilidad e instrucciones para coordinar el pedido?`;

  const waUrl = `https://wa.me/56912345678?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// 5. Shopping Cart State & Logic
function updateItemQuantity(id, delta) {
  const existingIndex = cart.findIndex(item => item.id === id);
  const menuItem = MENU_ITEMS.find(m => m.id === id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += delta;
    if (cart[existingIndex].quantity <= 0) {
      cart.splice(existingIndex, 1);
    }
  } else if (delta > 0 && menuItem) {
    cart.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image,
      quantity: delta
    });
  }

  renderMenu();
  updateCartUI();
}

function addToCartById(id, qty) {
  const existingIndex = cart.findIndex(item => item.id === id);
  const menuItem = MENU_ITEMS.find(m => m.id === id);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else if (menuItem) {
    cart.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image,
      quantity: qty
    });
  }
  renderMenu();
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderMenu();
  updateCartUI();
}

function updateCartUI() {
  const cartCountBadges = document.querySelectorAll('.cart-count');
  const cartItemsContainer = document.getElementById('cartDrawerItems');
  const cartTotalPriceDisplay = document.getElementById('cartTotalPrice');

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update Badges
  cartCountBadges.forEach(badge => {
    badge.textContent = totalItemCount;
  });

  // Render Drawer Items
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon"><i class="fa-solid fa-wine-glass-empty"></i></div>
        <p>Tu carrito de cotización está vacío.</p>
        <span style="font-size: 0.85rem; color: var(--text-muted);">Agrega bocaditos o dulces de nuestro catálogo para armar tu pedido.</span>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${item.quantity} x $${item.price.toLocaleString('es-CL')}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');
  }

  if (cartTotalPriceDisplay) {
    cartTotalPriceDisplay.textContent = `$${totalPrice.toLocaleString('es-CL')}`;
  }
}

// 6. Cart Drawer Toggle Controls
function initCartDrawer() {
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartDrawerOverlay');

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', openCartDrawer);
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCartDrawer);
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCartDrawer);
  }
}

function openCartDrawer() {
  document.getElementById('cartDrawerOverlay')?.classList.add('active');
  document.getElementById('cartDrawer')?.classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cartDrawerOverlay')?.classList.remove('active');
  document.getElementById('cartDrawer')?.classList.remove('active');
}

// Helper: Sync order with API Backend
function sendOrderToBackendAPI(orderData) {
  let apiUrl = 'http://localhost:3001/api/orders';
  if (window.location.origin && window.location.origin !== 'null') {
    if (window.location.port === '3000') {
      apiUrl = `${window.location.protocol}//${window.location.hostname}:3001/api/orders`;
    } else {
      apiUrl = `${window.location.origin}/api/orders`;
    }
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  }).then(res => res.json())
    .then(data => console.log('[API Sync] Pedido enviado a la API de Administración:', data))
    .catch(err => console.log('[API Sync Warning] API offline:', err));
}

// 7. Send Order / Quote via WhatsApp
function sendWhatsAppQuote() {
  if (cart.length === 0) {
    alert('Por favor agrega al menos un producto al carrito antes de cotizar.');
    return;
  }

  const eventDate = document.getElementById('cartEventDate')?.value || new Date().toISOString().split('T')[0];
  const guestCountInput = document.getElementById('cartGuestCount')?.value || 'Por confirmar';

  let message = `*¡Hola MOZZARO! Quisiera solicitar una cotización para un evento:*\n\n`;
  message += `📅 *Fecha del evento:* ${eventDate}\n`;
  message += `👥 *Invitados estimados:* ${guestCountInput}\n\n`;
  message += `🍷 *Detalle del Pedido:*\n`;

  let total = 0;
  let itemsSummary = [];
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `• ${item.quantity}x ${item.name} ($${subtotal.toLocaleString('es-CL')})\n`;
    itemsSummary.push(`${item.quantity}x ${item.name}`);
  });

  message += `\n💰 *Total Estimado:* $${total.toLocaleString('es-CL')}\n\n`;
  message += `_Quedo atento a la confirmación de disponibilidad e instrucciones de pago. ¡Muchas gracias!_`;

  // Send Order to Backend API automatically
  sendOrderToBackendAPI({
    clientName: `Cotización Web (${guestCountInput} pers)`,
    phone: '+56912345678',
    deliveryDate: eventDate,
    deliveryTime: '18:00',
    details: itemsSummary.join(', '),
    total: total,
    status: 'Pendiente'
  });

  // WhatsApp API URL
  const phone = '56912345678';
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

  window.open(whatsappUrl, '_blank');
}

// 8. FAQ Accordion
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

// 10. Direct Quote Form Handler
function handleDirectQuoteSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('contactName')?.value || '';
  const phone = document.getElementById('contactPhone')?.value || '';
  const email = document.getElementById('contactEmail')?.value || '';
  const eventType = document.getElementById('contactEventType')?.value || '';
  const guests = document.getElementById('contactGuests')?.value || 'A definir';
  const date = document.getElementById('contactDate')?.value || 'Por confirmar';
  const message = document.getElementById('contactMessage')?.value || '';

  // Reset form
  document.getElementById('directQuoteForm')?.reset();

  // Show Toast
  showToast(`¡Gracias ${name}! Tu solicitud de cotización fue enviada con éxito.`);

  // Optional modal popup confirmation
  const modalBody = document.getElementById('modalBody');
  const overlay = document.getElementById('productModalOverlay');
  const modal = document.getElementById('productModal');

  modalBody.innerHTML = `
    <div style="padding: 3rem 2rem; text-align: center;">
      <div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(230, 194, 128, 0.15); color: var(--primary-gold); font-size: 2.5rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <h2 class="modal-title" style="margin-bottom: 0.75rem;">¡Solicitud de Cotización Recibida!</h2>
      <p class="modal-desc" style="max-width: 480px; margin: 0 auto 1.5rem auto;">
        Hemos registrado tus datos correctamente. Nuestro equipo revisará la disponibilidad para el día <strong>${date}</strong> y te responderá al correo <strong>${email}</strong> o WhatsApp en menos de 2 horas.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-gold" onclick="closeProductModal()">
          <i class="fa-solid fa-check"></i> Entendido
        </button>
        <a href="https://wa.me/56912345678?text=Hola%20Mozzaro,%20acabo%20de%20enviar%20una%20solicitud%20de%20cotizaci%C3%B3n%20a%20nombre%20de%20${encodeURIComponent(name)}" target="_blank" class="btn btn-whatsapp" onclick="closeProductModal()">
          <i class="fa-brands fa-whatsapp"></i> Confirmar por WhatsApp
        </a>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  modal.classList.add('active');
}

// ==========================================================================
// 11. Admin Panel & Mobile Order Reminders System (Hidden & Security PIN)
// ==========================================================================
let ordersState = [];
let adminFilter = 'all';
const ADMIN_PIN = '1234';
let logoClickCount = 0;
let logoClickTimer = null;

function initAdminPanel() {
  const adminCloseBtn = document.getElementById('adminCloseBtn');
  const adminOverlay = document.getElementById('adminModalOverlay');

  if (adminCloseBtn) adminCloseBtn.addEventListener('click', closeAdminModal);
  if (adminOverlay) adminOverlay.addEventListener('click', closeAdminModal);

  loadOrdersFromStorage();
  checkNotificationStatus();
  renderAdminOrders();

  // Check URL Hash for #admin or #gestor
  if (window.location.hash === '#admin' || window.location.hash === '#gestor') {
    openAdminWithPIN();
  }

  // Keyboard shortcut: Ctrl + Shift + A (o Cmd + Shift + A)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAdminWithPIN();
    }
  });

  // Triple click on logo trigger
  document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', (e) => {
      logoClickCount++;
      clearTimeout(logoClickTimer);
      if (logoClickCount >= 3) {
        e.preventDefault();
        logoClickCount = 0;
        openAdminWithPIN();
      } else {
        logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
      }
    });
  });

  // Start background order reminder checker (runs every 30 seconds)
  setInterval(checkOrderReminders, 30000);
}

function openAdminWithPIN(e) {
  if (e) e.preventDefault();
  document.getElementById('adminPinOverlay')?.classList.add('active');
  document.getElementById('adminPinModal')?.classList.add('active');
  setTimeout(() => document.getElementById('adminPinInput')?.focus(), 100);
}

function closeAdminPinModal() {
  document.getElementById('adminPinOverlay')?.classList.remove('active');
  document.getElementById('adminPinModal')?.classList.remove('active');
  const pinInput = document.getElementById('adminPinInput');
  if (pinInput) pinInput.value = '';
}

function verifyAdminPIN(e) {
  e.preventDefault();
  const enteredPIN = document.getElementById('adminPinInput')?.value;

  if (enteredPIN === ADMIN_PIN) {
    closeAdminPinModal();
    openAdminModal();
    showToast('¡Acceso concedido al Gestor de Pedidos!');
  } else {
    showToast('❌ PIN Incorrecto. Intenta de nuevo.');
    const pinInput = document.getElementById('adminPinInput');
    if (pinInput) pinInput.value = '';
  }
}

function loadOrdersFromStorage() {
  const stored = localStorage.getItem('mozzaro_orders');
  if (stored) {
    try {
      ordersState = JSON.parse(stored);
    } catch (e) {
      ordersState = [];
    }
  } else {
    // Initial sample orders for instant testing
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];

    ordersState = [
      {
        id: 'ORD-101',
        clientName: 'Constanza Silva',
        phone: '+56987654321',
        deliveryDate: today,
        deliveryTime: '18:30',
        address: 'Av. Las Condes 9800, Depto 402',
        details: '2x Empanadas de Pino (100 u), 1x Mini Hamburguesas (50 u)',
        total: 109000,
        status: 'En Preparación',
        notified: false
      },
      {
        id: 'ORD-102',
        clientName: 'Empresas Horizon',
        phone: '+56911223344',
        deliveryDate: tomorrow,
        deliveryTime: '13:00',
        address: 'Oficina Central, Providencia #1500',
        details: '1x Combo Cóctel Corporativo (20 pers)',
        total: 135000,
        status: 'Pendiente',
        notified: false
      },
      {
        id: 'ORD-103',
        clientName: 'Felipe M. (Boda VIP)',
        phone: '+56955667788',
        deliveryDate: nextWeek,
        deliveryTime: '20:00',
        address: 'Centro de Eventos La Dehesa',
        details: '1x Combo Gran Gala Mozzaro (50 pers)',
        total: 320000,
        status: 'Pendiente',
        notified: false
      }
    ];
    saveOrdersToStorage();
  }
}

function saveOrdersToStorage() {
  localStorage.setItem('mozzaro_orders', JSON.stringify(ordersState));
}

function openAdminModal() {
  document.getElementById('adminModalOverlay')?.classList.add('active');
  document.getElementById('adminModal')?.classList.add('active');
  renderAdminOrders();
}

function closeAdminModal() {
  document.getElementById('adminModalOverlay')?.classList.remove('active');
  document.getElementById('adminModal')?.classList.remove('active');
}

function toggleNewOrderForm() {
  const formCard = document.getElementById('newOrderCard');
  if (formCard) {
    formCard.style.display = formCard.style.display === 'none' ? 'block' : 'none';
  }
}

function handleCreateOrder(e) {
  e.preventDefault();

  const name = document.getElementById('orderClientName').value;
  const phone = document.getElementById('orderClientPhone').value;
  const date = document.getElementById('orderDeliveryDate').value;
  const time = document.getElementById('orderDeliveryTime').value;
  const address = document.getElementById('orderAddress').value;
  const details = document.getElementById('orderDetails').value;
  const total = parseFloat(document.getElementById('orderTotalAmount').value) || 0;
  const status = document.getElementById('orderInitialStatus').value;

  const newOrder = {
    id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
    clientName: name,
    phone: phone,
    deliveryDate: date,
    deliveryTime: time,
    address: address,
    details: details,
    total: total,
    status: status,
    notified: false
  };

  ordersState.unshift(newOrder);
  saveOrdersToStorage();

  document.getElementById('newOrderForm').reset();
  toggleNewOrderForm();
  renderAdminOrders();
  showToast(`¡Pedido de ${name} guardado con éxito!`);
}

function updateOrderStatus(id, newStatus) {
  const order = ordersState.find(o => o.id === id);
  if (order) {
    order.status = newStatus;
    saveOrdersToStorage();
    renderAdminOrders();
    showToast(`Estado del pedido ${id} actualizado a: ${newStatus}`);
  }
}

function deleteOrder(id) {
  if (confirm(`¿Estás seguro de eliminar el pedido ${id}?`)) {
    ordersState = ordersState.filter(o => o.id !== id);
    saveOrdersToStorage();
    renderAdminOrders();
    showToast(`Pedido ${id} eliminado.`);
  }
}

function filterAdminOrders(filterType) {
  adminFilter = filterType;
  document.querySelectorAll('.admin-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-status') === filterType);
  });
  renderAdminOrders();
}

function renderAdminOrders() {
  const listContainer = document.getElementById('adminOrdersList');
  if (!listContainer) return;

  const todayStr = new Date().toISOString().split('T')[0];

  // Update Summary Stats
  const totalCount = ordersState.length;
  const todayCount = ordersState.filter(o => o.deliveryDate === todayStr).length;
  const pendingCount = ordersState.filter(o => o.status === 'En Preparación' || o.status === 'Pendiente').length;

  document.getElementById('adminCountTotal').textContent = totalCount;
  document.getElementById('adminCountToday').textContent = todayCount;
  document.getElementById('adminCountPending').textContent = pendingCount;

  // Filter List
  let filtered = ordersState;
  if (adminFilter === 'today') {
    filtered = ordersState.filter(o => o.deliveryDate === todayStr);
  } else if (adminFilter === 'pending') {
    filtered = ordersState.filter(o => o.status !== 'Entregado');
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-gold);"></i>
        <p>No hay pedidos registrados en este filtro.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(order => {
    const isToday = order.deliveryDate === todayStr;
    const cleanPhone = order.phone.replace(/[^0-9]/g, '');

    let badgeHTML = '';
    if (isToday) {
      badgeHTML = `<span class="order-countdown-badge badge-urgent-today">🚨 ENTREGA HOY (${order.deliveryTime})</span>`;
    } else {
      badgeHTML = `<span class="order-countdown-badge badge-upcoming">📅 ${order.deliveryDate} (${order.deliveryTime})</span>`;
    }

    return `
      <div class="order-card ${isToday ? 'urgent' : ''}">
        <div class="order-card-header">
          <div>
            <div class="order-client-name">${order.clientName} <span style="font-size:0.8rem; color:var(--text-muted);">#${order.id}</span></div>
            <div style="font-size:0.85rem; color:var(--primary-gold);"><i class="fa-solid fa-phone"></i> ${order.phone}</div>
          </div>
          ${badgeHTML}
        </div>

        <div class="order-details-text">
          <strong>Bocaditos & Pedido:</strong><br>
          ${order.details}
          ${order.address ? `<div style="margin-top:0.4rem; color:var(--text-main); font-size:0.85rem;"><i class="fa-solid fa-location-dot text-gold"></i> ${order.address}</div>` : ''}
        </div>

        <div class="order-meta-row">
          <span><strong>Total:</strong> $${(order.total || 0).toLocaleString('es-CL')}</span>
          <span><strong>Estado:</strong> ${order.status}</span>
        </div>

        <div class="order-card-actions">
          <select class="order-status-select" onchange="updateOrderStatus('${order.id}', this.value)">
            <option value="Pendiente" ${order.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="En Preparación" ${order.status === 'En Preparación' ? 'selected' : ''}>En Preparación</option>
            <option value="Listo para Entrega" ${order.status === 'Listo para Entrega' ? 'selected' : ''}>Listo para Entrega</option>
            <option value="Entregado" ${order.status === 'Entregado' ? 'selected' : ''}>Entregado</option>
          </select>

          <div style="display:flex; gap:0.5rem;">
            <a href="https://wa.me/${cleanPhone}?text=Hola%20${encodeURIComponent(order.clientName)},%20te%20contactamos%20de%20Mozzaro%20respecto%20a%20tu%20pedido%20%23${order.id}" target="_blank" class="btn btn-whatsapp btn-sm" title="Contactar Cliente">
              <i class="fa-brands fa-whatsapp"></i> Chatear
            </a>
            <button class="btn btn-outline btn-sm" onclick="deleteOrder('${order.id}')" title="Eliminar Pedido" style="color:var(--accent-terracotta);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 12. Native Web / Mobile Notifications Permission & Reminders
function checkNotificationStatus() {
  const notifBar = document.getElementById('notifPermissionBar');
  if ('Notification' in window && Notification.permission === 'granted') {
    if (notifBar) notifBar.style.display = 'none';
  }
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Tu navegador o teléfono no soporta notificaciones de escritorio/móvil.');
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      showToast('¡Notificaciones móviles activadas correctamente!');
      checkNotificationStatus();
      new Notification('🍷 Mozzaro Recordatorios', {
        body: 'Las notificaciones móviles están activas para avisarte cuando tengas pedidos próximos.',
        icon: 'assets/logo_mozzaro.jpeg'
      });
    } else {
      alert('Permiso de notificaciones denegado. Puedes activarlo en la configuración de tu navegador.');
    }
  });
}

function checkOrderReminders() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const todayStr = new Date().toISOString().split('T')[0];

  ordersState.forEach(order => {
    if (!order.notified && order.deliveryDate === todayStr && order.status !== 'Entregado') {
      order.notified = true;
      saveOrdersToStorage();

      new Notification(`🚨 Entrega Hoy: ${order.clientName}`, {
        body: `Pedido #${order.id} agendado para entrega hoy a las ${order.deliveryTime}. ¡Preparar bocaditos!`,
        icon: 'assets/logo_mozzaro.jpeg'
      });
    }
  });
}

// ==========================================================================
// 13. Gran Portafolio Visual Functions (Filtering & Lightbox Viewer)
// ==========================================================================
function filterPortfolio(category) {
  document.querySelectorAll('.portfolio-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('onclick').includes(`'${category}'`));
  });

  const cards = document.querySelectorAll('#portfolioGrid .portfolio-card');
  let visibleIndex = 0;

  cards.forEach(card => {
    // Clear previous positional classes
    card.className = card.className.replace(/\bgrid-pos-\d+\b/g, '').trim();

    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
      visibleIndex++;
      card.classList.add(`grid-pos-${visibleIndex}`);
    } else {
      card.style.display = 'none';
    }
  });
}

function openPortfolioLightbox(imgSrc, title, desc, tag) {
  const modalBody = document.getElementById('modalBody');
  const overlay = document.getElementById('productModalOverlay');
  const modal = document.getElementById('productModal');

  const waText = encodeURIComponent(`Hola Mozzaro, vi en su portafolio esta opción y me gustaría cotizarla: ${title}`);

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-wrap">
        <img src="${imgSrc}" alt="${title}" class="modal-img" style="border-radius: 12px; object-fit: cover;">
      </div>
      <div class="modal-content">
        <div>
          <span class="badge badge-gold" style="margin-bottom: 0.5rem; display: inline-block;">${tag}</span>
          <h2 class="modal-title" style="margin-bottom: 0.5rem;">${title}</h2>
          <p class="modal-desc" style="margin: 1rem 0; font-size: 0.95rem; color: var(--text-muted);">${desc}</p>
          
          <div class="modal-tags">
            <span class="modal-tag"><i class="fa-solid fa-box text-gold"></i> Presentación en Cajas</span>
            <span class="modal-tag"><i class="fa-solid fa-utensils text-gold"></i> Listo para Servir</span>
          </div>
        </div>

        <div class="modal-footer" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem;">
          <a href="https://wa.me/56912345678?text=${waText}" target="_blank" class="btn btn-whatsapp" onclick="closeProductModal()">
            <i class="fa-brands fa-whatsapp"></i> Cotizar este Producto por WhatsApp
          </a>
          <button class="btn btn-outline" onclick="closeProductModal()">Cerrar</button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  modal.classList.add('active');
}

// ==========================================================================
// 14. Seasonal & Holiday Switcher Function
// ==========================================================================
function switchSeasonalTab(season) {
  const tabSept = document.getElementById('tabSeptiembre');
  const tabHall = document.getElementById('tabHalloween');
  const tabNavi = document.getElementById('tabNavidad');
  const container = document.getElementById('seasonalContent');

  if (tabSept) tabSept.classList.toggle('active', season === 'septiembre');
  if (tabHall) tabHall.classList.toggle('active', season === 'halloween');
  if (tabNavi) tabNavi.classList.toggle('active', season === 'navidad');

  if (!container) return;

  if (season === 'septiembre') {
    container.innerHTML = `
      <div class="seasonal-panel" id="panelSeptiembre">
        <div style="background: rgba(230, 194, 128, 0.08); border: 1px solid var(--border-gold); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem; text-align: center;">
          <span class="badge badge-gold" style="margin-bottom: 0.5rem; display: inline-block;">¡Especial Dieciochero en Caja!</span>
          <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">Cajas & Bocaditos para Celebrar el 18</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 700px; margin: 0 auto;">Disfruta tus Fiestas Patrias sin cocinar. Cajas de empanaditas de pino jugoso, empanadas de queso, mini sopaipillas y chaparritas listas para compartir.</p>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/empanadas_pino.jpeg', 'Empanaditas de Pino Cóctel 18', 'Tradicionales empanaditas de pino jugoso de carne recién horneadas.', '18 de Septiembre')">
            <img src="assets/empanadas_pino.jpeg" alt="Empanaditas Pino 18" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-flag text-gold"></i> 18 de Septiembre</span>
              <h3 class="gallery-title">Empanaditas de Pino Cóctel</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>

          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/mini_sopaipillas.jpeg', 'Mini Sopaipillas Dieciocheras', 'Crujientes mini sopaipillas chilenas doraditas.', '18 de Septiembre')">
            <img src="assets/mini_sopaipillas.jpeg" alt="Mini Sopaipillas 18" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-pepper-hot text-gold"></i> 18 de Septiembre</span>
              <h3 class="gallery-title">Mini Sopaipillas Dieciocheras</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>

          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/empanadas_queso.jpeg', 'Empanaditas de Queso Fundido', 'Mini empanadas crocantes rellenas de queso fundido.', '18 de Septiembre')">
            <img src="assets/empanadas_queso.jpeg" alt="Empanaditas Queso 18" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-cheese text-gold"></i> 18 de Septiembre</span>
              <h3 class="gallery-title">Empanaditas de Queso Cóctel</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (season === 'halloween') {
    container.innerHTML = `
      <div class="seasonal-panel" id="panelHalloween">
        <div style="background: rgba(224, 122, 95, 0.1); border: 1px solid rgba(224, 122, 95, 0.4); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem; text-align: center;">
          <span class="badge badge-gold" style="margin-bottom: 0.5rem; display: inline-block; background: #e07a5f; color: #fff;">🎃 Especial Noche de Brujitas</span>
          <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">Bocaditos & Galletas Temáticas de Halloween</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 700px; margin: 0 auto;">Galletas glaseadas con diseños de calabazas y monstruos, mini donas y cupcakes decorados para tu fiesta de Halloween.</p>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/galletas_halloween.png', 'Galletas Temáticas de Halloween', 'Espeluznantes y divertidas galletas glaseadas artesanales con diseños de calabazas, fantasmas y brujitas.', 'Halloween Especial')">
            <img src="assets/galletas_halloween.png" alt="Galletas Halloween" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-ghost text-gold"></i> Halloween Especial</span>
              <h3 class="gallery-title">Galletas Temáticas de Halloween</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>

          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/mini_donas_tematica.jpeg', 'Mini Donas Temáticas de Halloween', 'Mini donitas artesanales con coberturas y sprinkles temáticos.', 'Halloween Especial')">
            <img src="assets/mini_donas_tematica.jpeg" alt="Mini Donas Halloween" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-spider text-gold"></i> Halloween Especial</span>
              <h3 class="gallery-title">Mini Donas Temáticas</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>

          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/cupcake_frosting.jpeg', 'Mini Cupcakes Rellenos Temáticos', 'Mini cupcakes horneados con toppings festivos.', 'Halloween Especial')">
            <img src="assets/cupcake_frosting.jpeg" alt="Cupcakes Halloween" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-skull text-gold"></i> Halloween Especial</span>
              <h3 class="gallery-title">Mini Cupcakes Rellenos</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (season === 'navidad') {
    container.innerHTML = `
      <div class="seasonal-panel" id="panelNavidad">
        <div style="background: rgba(37, 211, 102, 0.08); border: 1px solid rgba(37, 211, 102, 0.3); border-radius: var(--radius-lg); padding: 2rem; margin-bottom: 2rem; text-align: center;">
          <span class="badge badge-gold" style="margin-bottom: 0.5rem; display: inline-block;">🎄 Edición Especial de Navidad & Fin de Año</span>
          <h3 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 0.5rem;">Cajas de Navidad & Cenas de Fin de Año</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 700px; margin: 0 auto;">Celebraciones de fin de año y reuniones navideñas. Cajas aperitivo saladas y galletas navideñas de regalo.</p>
        </div>

        <div class="gallery-grid">
          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/galletas_navidad.jpeg', 'Galletas Temáticas de Navidad & Fiestas', 'Hermosas galletas glaseadas artesanales con diseños navideños, pinitos, botas y renos.', 'Navidad & Fin de Año')">
            <img src="assets/galletas_navidad.jpeg" alt="Galletas Navideñas" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-snowflake text-gold"></i> Navidad & Fin de Año</span>
              <h3 class="gallery-title">Galletas Navideñas Artesanales</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>

          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/canape_1.jpeg', 'Caja Canapés Salados Finos de Navidad', 'Presentación elegante para reuniones familiares o de empresa en diciembre.', 'Navidad & Fin de Año')">
            <img src="assets/canape_1.jpeg" alt="Caja Canapés Navidad" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-gifts text-gold"></i> Navidad & Fin de Año</span>
              <h3 class="gallery-title">Caja Canapés Finos Navideños</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>

          <div class="gallery-item portfolio-card" onclick="openPortfolioLightbox('assets/tapaditos_pollo.jpeg', 'Bandeja Aperitivo Fin de Año', 'Tapaditos caseros y mini hamburguesas para cenas de empresa y despedidas de año.', 'Navidad & Fin de Año')">
            <img src="assets/tapaditos_pollo.jpeg" alt="Bandeja Fin de Año" class="gallery-img">
            <div class="gallery-overlay">
              <span class="gallery-tag"><i class="fa-solid fa-champagne-glasses text-gold"></i> Navidad & Fin de Año</span>
              <h3 class="gallery-title">Bandeja Aperitivo Fin de Año</h3>
              <p style="font-size:0.8rem; color: var(--primary-gold); margin-top:0.3rem;"><i class="fa-solid fa-magnifying-glass-plus"></i> Ver foto ampliada & cotizar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}


