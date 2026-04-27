const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

let orders = [];
let doneMap = {};

app.get('/orders', (req, res) => {
  res.json({ orders, doneMap });
});

app.post('/order', (req, res) => {
  const order = req.body;
  if (!order || !order.id) return res.status(400).json({ error: 'Invalid order' });
  if (!orders.find(o => o.id === order.id)) {
    orders.push(order);
  }
  res.json({ ok: true });
});

app.post('/done', (req, res) => {
  Object.assign(doneMap, req.body);
  res.json({ ok: true });
});

app.post('/clear', (req, res) => {
  orders = [];
  doneMap = {};
  res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.json({ status: 'Eileen\'s Cafe server is running!', orders: orders.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Eileen's Cafe server running on port ${PORT}`);
});
