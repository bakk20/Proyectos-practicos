import Admin from '../models/Admin.js';
import Seccion from '../models/seccion.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};


export const crearSeccion = async (req, res) => {
  try {
    const { tipoSeccion, nombre, etiquetaGeneral, bloques } = req.body;

    if (!bloques) {
      return res.status(400).json({ mensaje: 'Faltan los bloques en el cuerpo de la solicitud' });
    }

    let bloquesData;
    try {
      bloquesData = JSON.parse(bloques);
    } catch (err) {
      return res.status(400).json({ mensaje: 'Bloques no es un JSON válido' });
    }

    if (!Array.isArray(bloquesData) || bloquesData.length === 0) {
      return res.status(400).json({ mensaje: 'Bloques debe ser un arreglo con al menos un elemento' });
    }

    // 🔧 Aquí el cambio robusto
    const bloquesFinales = bloquesData.map((bloque, i) => {
      const imagenKey = `imagen_${i}`;
      const file = req.files?.[imagenKey]?.[0];
      return {
        descripcion: bloque.descripcion,
        etiqueta: bloque.etiqueta,
        imagen: file ? file.filename : bloque.imagen || ''
      };
    });

    const nueva = new Seccion({
      tipoSeccion,
      nombre,
      etiquetaGeneral: tipoSeccion === 'bundle' ? etiquetaGeneral : undefined,
      bloques: bloquesFinales
    });

    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    console.error('Error al guardar sección:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const editarSeccion = async (req, res) => {
  try {
    const { tipoSeccion, nombre, etiquetaGeneral } = req.body;
    const bloques = JSON.parse(req.body.bloques);

    const bloquesConImagenes = bloques.map((bloque, i) => ({
      descripcion: bloque.descripcion,
      etiqueta: bloque.etiqueta,
      imagen: req.files?.[i]?.filename || bloque.imagen || '' // previene undefined
    }));

    const actualizada = await Seccion.findByIdAndUpdate(
      req.params.id,
      {
        tipoSeccion,
        nombre,
        etiquetaGeneral: tipoSeccion === 'bundle' ? etiquetaGeneral : undefined,
        bloques: bloquesConImagenes
      },
      { new: true }
    );

    res.status(200).json(actualizada);
  } catch (error) {
    console.error('Error al editar sección:', error);
    res.status(400).json({ mensaje: 'Datos inválidos' });
  }
};