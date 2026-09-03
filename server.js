const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, 'orders_db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve admin.html and assets

// Initial DB Check & Seed
function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];

    const initialData = [
      {
        id: 'ORD-101',
        clientName: 'Constanza Silva',
        phone: '+56987654321',
        email: 'constanza@gmail.com',
        deliveryDate: today,
        deliveryTime: '18:30',
        address: 'Av. Las Condes 9800, Depto 402',
        details: '2x Empanadas de Pino (100 u), 1x Mini Hamburguesas (50 u)',
        total: 109000,
        status: 'En Preparación',
        createdAt: new Date().toISOString()
      },
      {
        id: 'ORD-102',
        clientName: 'Empresas Horizon',
        phone: '+56911223344',
        email: 'contacto@horizon.cl',
        deliveryDate: tomorrow,
        deliveryTime: '13:00',
        address: 'Oficina Central, Providencia #1500',
        details: '1x Combo Cóctel Corporativo (20 pers)',
        total: 135000,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      },
      {
        id: 'ORD-103',
        clientName: 'Felipe M. (Boda VIP)',
        phone: '+56955667788',
        email: 'felipe.boda@outlook.com',
        deliveryDate: nextWeek,
        deliveryTime: '20:00',
        address: 'Centro de Eventos La Dehesa',
        details: '1x Combo Gran Gala Mozzaro (50 pers)',
        total: 320000,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// REST API Endpoints

// 1. GET /api/orders - List all orders
app.get('/api/orders', (req, res) => {
  const orders = loadDB();
  res.json({ success: true, count: orders.length, data: orders });
});

// 2. POST /api/orders - Create new order (from public store or admin)
app.post('/api/orders', (req, res) => {
  const { clientName, phone, email, deliveryDate, deliveryTime, address, details, total, status } = req.body;

  if (!clientName || !phone) {
    return res.status(400).json({ success: false, message: 'Nombre y teléfono son requeridos.' });
  }

  const orders = loadDB();
  const newOrder = {
    id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
    clientName,
    phone,
    email: email || '',
    deliveryDate: deliveryDate || new Date().toISOString().split('T')[0],
    deliveryTime: deliveryTime || '12:00',
    address: address || '',
    details: details || 'Cotización general',
    total: parseFloat(total) || 0,
    status: status || 'Pendiente',
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  saveDB(orders);

  console.log(`[API] Nuevo pedido recibido: ${newOrder.id} - ${newOrder.clientName}`);

  res.status(201).json({ success: true, message: 'Pedido creado exitosamente', data: newOrder });
});

// 3. PUT /api/orders/:id - Update order status or fields
app.put('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  let orders = loadDB();
  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
  }

  orders[index] = { ...orders[index], ...updates };
  saveDB(orders);

  res.json({ success: true, message: 'Pedido actualizado', data: orders[index] });
});

// 4. DELETE /api/orders/:id - Delete an order
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  let orders = loadDB();
  
  const initialLen = orders.length;
  orders = orders.filter(o => o.id !== id);

  if (orders.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
  }

  saveDB(orders);
  res.json({ success: true, message: 'Pedido eliminado correctamente' });
});

// 5. GET /api/stats - Dashboard summary metrics
app.get('/api/stats', (req, res) => {
  const orders = loadDB();
  const todayStr = new Date().toISOString().split('T')[0];

  const total = orders.length;
  const today = orders.filter(o => o.deliveryDate === todayStr).length;
  const pending = orders.filter(o => o.status === 'Pendiente' || o.status === 'En Preparación').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  res.json({
    success: true,
    data: { total, today, pending, totalRevenue }
  });
});

// Root route for main website (fixes Vercel Cannot GET /)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for html pages & static files
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const filePath = path.join(__dirname, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.sendFile(filePath);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🍷 MOZZARO API BACKEND RUNNING ON PORT ${PORT}`);
    console.log(`👉 App Admin: http://localhost:${PORT}/admin.html`);
    console.log(`👉 API Endpoint: http://localhost:${PORT}/api/orders`);
    console.log(`=================================================`);
  });
}

// Export for Vercel Serverless Functions
module.exports = app;
