import Order from '../models/order.js';

// Checkout simulado: no hay pasarela de pago real conectada.
// El "pago" se aprueba al instante y el pedido queda guardado en la base de datos.
export const crearOrden = async (req, res) => {
  try {
    const { items, total, cliente, metodoPago } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ mensaje: 'El carrito está vacío' });
    }
    if (!cliente?.nombre || !cliente?.direccion) {
      return res.status(400).json({ mensaje: 'Faltan datos del cliente' });
    }

    const nuevaOrden = new Order({
      items,
      total,
      cliente,
      metodoPago: metodoPago || 'simulado',
      estadoPago: 'aprobado',
    });

    const guardada = await nuevaOrden.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const obtenerOrden = async (req, res) => {
  try {
    const orden = await Order.findById(req.params.id);
    if (!orden) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    res.json(orden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el pedido' });
  }
};
