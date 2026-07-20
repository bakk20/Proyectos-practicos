import '../styles/GeneralStyles.css'

export const FarmaciaScreen = () => {
  return (
    <div className="component-card">
      <h3 className='card-title'>Catálogo de Farmacia: CMS + carrito y checkout</h3>
      <p className='card-text'>
        <em>Proyecto de práctica full-stack, retomado y completado como pieza de portafolio.</em>
      </p>

      <h4 className='card-title profile-card-title'>Qué es</h4>
      <p className='card-text'>
        Un catálogo de productos tipo farmacia con panel de administración (CMS) para armar
        secciones y productos sin tocar código, más un flujo de compra completo: carrito,
        checkout y pago simulado.
      </p>

      <h4 className='card-title profile-card-title'>Arquitectura</h4>
      <p className='card-text'>
        React + Vite en el frontend, Express + MongoDB (Mongoose) en el backend, ambos
        corriendo en el mismo repo con concurrently. El admin se autentica con JWT. Las
        secciones del catálogo se arman con un sistema de plantillas (bundle o producto
        individual): cada bloque tiene imagen (subida con Multer), descripción, etiqueta y
        precio. El estado global se maneja con Redux Toolkit. El carrito vive en un Context de
        React persistido en localStorage, y el checkout guarda el pedido real en MongoDB con un
        modelo Order — el pago está simulado (se aprueba al instante), sin ninguna pasarela real
        conectada.
      </p>

      <h4 className='card-title profile-card-title'>Decisiones técnicas</h4>
      <ul className='card-text'>
        <li>CMS con plantillas en vez de catálogo hardcodeado: el admin arma secciones (bundle o
          producto) desde la interfaz, sin tocar código.</li>
        <li>Pago simulado en vez de integrar una pasarela real: para un proyecto de práctica,
          prioricé demostrar el flujo completo (carrito → checkout → pedido guardado en base de
          datos) sin la complejidad y el riesgo de manejar pagos reales.</li>
        <li>Carrito persistido en localStorage, para que sobreviva un refresh sin necesitar
          login del cliente.</li>
        <li>Subida de imágenes con Multer y servidas como archivos estáticos, en vez de guardar
          binarios en la base de datos.</li>
      </ul>

      <h4 className='card-title profile-card-title'>Mi rol / qué aprendí</h4>
      <p className='card-text'>
        Es un proyecto de aprendizaje que arranqué solo, apoyándome en el agente de desarrollo
        de VS Code para la implementación. La parte de catálogo y CMS la resolví bien en su
        momento, pero la idea original incluía una pasarela de venta real que no llegué a
        construir — me faltaba madurar la lógica de negocio del checkout. Volví después a cerrar
        esa parte con un carrito y checkout completo (con pago simulado), aplicando lo que fui
        aprendiendo sobre JavaScript y arquitectura full-stack en el camino.
      </p>
    </div>
  )
}
