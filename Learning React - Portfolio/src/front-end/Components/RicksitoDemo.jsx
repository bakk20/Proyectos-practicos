import { useEffect, useState, useRef } from 'react'
import '../styles/RicksitoDemo.css'

// Guion fijo de ejemplo — no está conectado al sistema real en producción.
// Basado en el flujo real documentado de Ricksito: identificación de pedido,
// verificación de pago por Yape, y notificación automática al dueño.
const SCRIPT = [
  { type: 'chat', from: 'cliente', text: 'Hola buenas, quiero un helado de fresa grande' },
  { type: 'chat', from: 'bot', text: '¡Hola! 🍦 Un helado de fresa grande. ¿Algo más para tu pedido?' },
  { type: 'cart', items: [{ name: 'Helado de Fresa (Grande)', price: 12.0 }] },
  { type: 'chat', from: 'cliente', text: 'no nada más, ¿cuánto es y cómo pago?' },
  { type: 'chat', from: 'bot', text: 'Tu total es S/ 12.00. Puedes pagar por Yape a este número: 999-999-999. Envíame la captura cuando la tengas 🙌' },
  { type: 'chat', from: 'cliente', text: '📎 Captura de pago enviada' },
  {
    type: 'group',
    order: '#1042',
    product: 'Helado de Fresa (Grande)',
    phone: '+51 987 654 321',
    address: 'Jr. Los Cerezos 123, Comas (referencial)',
    total: 12.0,
  },
  { type: 'chat', from: 'bot', text: '¡Comprobante verificado! ✅ Tu pedido está confirmado, en camino 🚴' },
]

export const RicksitoDemo = () => {
  const [step, setStep] = useState(0)
  const [cart, setCart] = useState([])
  const [groupMsgs, setGroupMsgs] = useState([])
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (step >= SCRIPT.length) return
    const timer = setTimeout(() => {
      const item = SCRIPT[step]
      if (item.type === 'cart') setCart(item.items)
      if (item.type === 'group') setGroupMsgs((prev) => [...prev, item])
      setStep((s) => s + 1)
    }, step === 0 ? 400 : 1300)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [step])

  const restart = () => {
    setStep(0)
    setCart([])
    setGroupMsgs([])
  }

  const visibleChat = SCRIPT.slice(0, step).filter((s) => s.type === 'chat')
  const total = cart.reduce((acc, i) => acc + i.price, 0)
  const finished = step >= SCRIPT.length

  return (
    <div className="ricksito-demo">
      <p className="ricksito-demo-note">
        Demo con conversación de ejemplo (guion fijo, no conectado al sistema en producción).
        Así funciona el flujo real: identificación del pedido, carrito, verificación de pago por
        Yape, y aviso automático al grupo del negocio.
      </p>

      <div className="ricksito-demo-grid">
        <div className="demo-panel demo-chat">
          <div className="demo-panel-title">💬 WhatsApp — Amoroma</div>
          <div className="demo-chat-body">
            {visibleChat.map((m, i) => (
              <div key={i} className={`bubble bubble-${m.from}`}>{m.text}</div>
            ))}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="demo-side">
          <div className="demo-panel demo-cart">
            <div className="demo-panel-title">🛒 Carrito</div>
            <div className="demo-panel-body">
              {cart.length === 0 ? (
                <p className="demo-empty">Vacío por ahora…</p>
              ) : (
                <>
                  {cart.map((i, idx) => (
                    <div key={idx} className="cart-line">
                      <span>{i.name}</span>
                      <span>S/ {i.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="cart-total">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="demo-panel demo-group">
            <div className="demo-panel-title">👥 Grupo Amoroma</div>
            <div className="demo-panel-body">
              {groupMsgs.length === 0 ? (
                <p className="demo-empty">Sin notificaciones aún…</p>
              ) : (
                groupMsgs.map((m, i) => (
                  <div key={i} className="group-msg">
                    <div className="group-msg-order">Orden {m.order}:</div>
                    <div className="group-msg-line">{m.product}</div>
                    <div className="group-msg-line">{m.phone}</div>
                    <div className="group-msg-line">{m.address}</div>
                    <div className="group-msg-total">S/ {m.total.toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {finished && (
        <button className="demo-restart" onClick={restart}>↺ Repetir demo</button>
      )}
    </div>
  )
}
