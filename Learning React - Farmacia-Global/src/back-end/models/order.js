import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  total: { type: Number, required: true },
  cliente: {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: String },
  },
  metodoPago: { type: String, default: 'simulado' },
  // Pago simulado: no hay pasarela real conectada, se aprueba al instante.
  estadoPago: { type: String, enum: ['aprobado', 'rechazado'], default: 'aprobado' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
