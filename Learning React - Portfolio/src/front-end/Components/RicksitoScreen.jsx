import '../styles/GeneralStyles.css'

export const RicksitoScreen = () => {
  return (
    <div className="component-card">
      <h3 className='card-title'>Ricksito: bot de pedidos por WhatsApp</h3>
      <p className='card-text'>
        <em>Mayo 2026 – Julio 2026 · Amoroma, heladería en Comas, Lima · Proyecto pausado
        por el cliente por timeline (no por temas técnicos) — sigue en desarrollo como
        pieza de portafolio.</em>
      </p>

      <h4 className='card-title profile-card-title'>Qué es</h4>
      <p className='card-text'>
        Ricksito es un bot de pedidos por WhatsApp que armé de cero en n8n para Amoroma,
        una heladería real en Comas, Lima. Se construyó durante unos dos meses y medio.
      </p>

      <h4 className='card-title profile-card-title'>Arquitectura</h4>
      <p className='card-text'>
        El pipeline tiene varias etapas: un Router (un LLM liviano que clasifica la intención
        del mensaje) manda cada mensaje a un Switch con 9 rutas posibles (pedido, pago, carta,
        queja, postulante, proveedor, entre otras). Para pedidos y pagos, el mensaje pasa por
        un Normalizador, un módulo de Contexto y un Identificador (otro LLM que extrae
        productos y acciones del mensaje), y termina en el Cerebro: un motor determinístico
        en JavaScript de unas 7300 líneas que aplica toda la lógica de negocio real — carrito,
        precios, combos y validaciones.
      </p>

      <h4 className='card-title profile-card-title'>Decisiones técnicas</h4>
      <ul className='card-text'>
        <li>Orquestación multi-agente: varios modelos (GPT-4.1-nano, GPT-4.1-mini, Gemini vía
          OpenRouter), cada uno con un rol acotado, en vez de un solo prompt intentando hacerlo
          todo.</li>
        <li>Separación LLM vs. lógica determinística: precios, validaciones y estado del
          carrito viven en código (el Cerebro), no en la salida de un modelo. Menos
          alucinaciones, más testeable.</li>
        <li>Memoria conversacional entre turnos, para resolver mensajes cortos y ambiguos: un
          nombre de calle, un "sí", elegir de una lista.</li>
        <li>Verificación de pagos: reconoce comprobantes Yape (exacto, de más, de menos) y
          notifica automáticamente al dueño.</li>
        <li>Geocoding con fallback: geocode.maps.co y Nominatim (OpenStreetMap), con limpieza
          de direcciones y reintentos.</li>
        <li>Clasificación de imágenes con visión: Gemini distingue comprobantes de pago de
          promociones o cualquier otra imagen.</li>
        <li>Quejas y reembolsos con un clasificador dedicado: decidí no usar reglas por
          palabras clave y usar un modelo aparte, porque era más confiable.</li>
        <li>Testing disciplinado: batería de pruebas end-to-end en Excel, con casos y seeds de
          prueba, no solo probar a mano.</li>
      </ul>

      <h4 className='card-title profile-card-title'>Mi rol</h4>
      <p className='card-text'>
        Definí los requerimientos, dirigí el desarrollo de punta a punta y tomé las
        decisiones de arquitectura cuando había más de un camino posible (por ejemplo, el
        clasificador de quejas, o separar la extracción de productos de la aplicación de
        promociones). Hice todo el testing end-to-end manual y triagé los bugs que aparecieron
        en producción. El desarrollo se apoyó en un asistente de IA para la implementación y el
        debugging, pero las decisiones de producto y arquitectura fueron mías.
      </p>
    </div>
  )
}
