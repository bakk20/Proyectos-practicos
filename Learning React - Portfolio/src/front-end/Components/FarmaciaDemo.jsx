import { useEffect, useState } from 'react'
import '../styles/FarmaciaDemo.css'

// Guion fijo de ejemplo — no está conectado a la base de datos real.
// Productos y datos de cliente son ilustrativos.
const PRODUCTOS_DEMO = [
  { id: 1, nombre: 'Paracetamol 500mg (x20)', precio: 8.5 },
  { id: 2, nombre: 'Alcohol en gel 250ml', precio: 12.0 },
]

const SCRIPT = [
  { type: 'add', productId: 1 },
  { type: 'add', productId: 2 },
  { type: 'checkout' },
  { type: 'confirm' },
]

export const FarmaciaDemo = () => {
  const [step, setStep] = useState(0)
  const [cart, setCart] = useState([])
  const [phase, setPhase] = useState('catalogo') // catalogo | checkout | confirmado
  const [pulseId, setPulseId] = useState(null)

  useEffect(() => {
    if (step >= SCRIPT.length) return
    const timer = setTimeout(() => {
      const action = SCRIPT[step]
      if (action.type === 'add') {
        const producto = PRODUCTOS_DEMO.find((p) => p.id === action.productId)
        setPulseId(action.productId)
        setCart((prev) => [...prev, producto])
        setTimeout(() => setPulseId(null), 500)
      }
      if (action.type === 'checkout') setPhase('checkout')
      if (action.type === 'confirm') setPhase('confirmado')
      setStep((s) => s + 1)
    }, step === 0 ? 500 : 1400)
    return () => clearTimeout(timer)
  }, [step])

  const total = cart.reduce((acc, p) => acc + p.precio, 0)
  const finished = step >= SCRIPT.length

  const restart = () => {
    setStep(0)
    setCart([])
    setPhase('catalogo')
    setPulseId(null)
  }

  return (
    <div className="farmacia-demo">
      <p className="farmacia-demo-note">
        Demo con datos de ejemplo (guion fijo, no conectado a la base de datos real). Catálogo,
        carrito y checkout con pago simulado — no hay ninguna pasarela de pago real conectada.
      </p>

      <div className="farmacia-demo-grid">
        <div className="fdemo-panel fdemo-catalogo">
          <div className="fdemo-panel-title">💊 Catálogo</div>
          <div className="fdemo-panel-body">
            {PRODUCTOS_DEMO.map((p) => (
              <div key={p.id} className="fdemo-producto">
                <div className="fdemo-producto-info">
                  <span className="fdemo-producto-nombre">{p.nombre}</span>
                  <span className="fdemo-producto-precio">S/ {p.precio.toFixed(2)}</span>
                </div>
                <button className={`fdemo-add-btn ${pulseId === p.id ? 'pulse' : ''}`} disabled>
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="fdemo-panel fdemo-carrito">
          <div className="fdemo-panel-title">
            {phase === 'confirmado'
              ? '✅ Pedido confirmado'
              : phase === 'checkout'
              ? '📝 Checkout'
              : '🛒 Carrito'}
          </div>
          <div className="fdemo-panel-body">
            {phase === 'catalogo' &&
              (cart.length === 0 ? (
                <p className="fdemo-empty">Vacío por ahora…</p>
              ) : (
                <>
                  {cart.map((p, i) => (
                    <div key={i} className="fdemo-cart-line">
                      <span>{p.nombre}</span>
                      <span>S/ {p.precio.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="fdemo-cart-total">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                </>
              ))}

            {phase === 'checkout' && (
              <div className="fdemo-checkout-form">
                <div className="fdemo-field"><span>Nombre:</span> Cliente de ejemplo</div>
                <div className="fdemo-field"><span>Dirección:</span> Av. Ejemplo 123, Lima (referencial)</div>
                <div className="fdemo-field"><span>Pago:</span> Yape (simulado)</div>
                <div className="fdemo-cart-total">
                  <span>Total a pagar</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>
            )}

            {phase === 'confirmado' && (
              <div className="fdemo-confirmacion">
                <p className="fdemo-confirmacion-orden">Pedido #4821</p>
                <p>Pago simulado aprobado. Gracias por tu compra de ejemplo.</p>
                <div className="fdemo-cart-total">
                  <span>Total pagado</span>
                  <span>S/ {total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {finished && (
        <button className="fdemo-restart" onClick={restart}>↺ Repetir demo</button>
      )}
    </div>
  )
}
