import mongoose from 'mongoose';

const bloqueSchema = new mongoose.Schema({
  imagen: String, // URL o base64 (según cómo la manejes)
  descripcion: String,
  etiqueta: String,
});

const seccionSchema = new mongoose.Schema({
  tipoSeccion: { type: String, enum: ['bundle', 'producto'], required: true },
  nombre: { type: String, required: true },
  etiquetaGeneral: { type: String },
  bloques: [bloqueSchema]
}, { timestamps: true });

export default mongoose.model('Seccion', seccionSchema);