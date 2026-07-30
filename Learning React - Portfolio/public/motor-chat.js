/*
 * motor-chat.js — motor de chat único y reutilizable para las landings del portafolio.
 *
 * Uso:
 *   <script src="/motor-chat.js"
 *           data-bot-id="clinica_vitalis"
 *           data-accent-color="#1f8a5f"
 *           data-accent-dark="#145c3f"></script>
 *
 * El motor no sabe nada de "restaurantes" o "clínicas": solo recorre el árbol de
 * nodos que le devuelve el webhook de n8n (config guardada en Supabase) y renderiza
 * los tipos: mensaje, opciones, formulario, redirigir.
 */
(function () {
  'use strict';

  var currentScript = document.currentScript;
  var BOT_ID = currentScript.getAttribute('data-bot-id');
  var ACCENT = currentScript.getAttribute('data-accent-color') || '#8c32c3';
  var ACCENT_DARK = currentScript.getAttribute('data-accent-dark') || ACCENT;
  var WEBHOOK_URL =
    currentScript.getAttribute('data-webhook-base') ||
    'https://amoroma-n8n.w4b9dp.easypanel.host/webhook/chat-engine';

  if (!BOT_ID) {
    console.error('[motor-chat] Falta data-bot-id en el <script>.');
    return;
  }

  // ---------------------------------------------------------------------
  // Estado
  // ---------------------------------------------------------------------
  var state = {
    open: false,
    loading: false,
    currentNodeId: 'inicio',
    started: false
  };

  // ---------------------------------------------------------------------
  // Estilos (con prefijo propio para no chocar con el CSS de la landing)
  // ---------------------------------------------------------------------
  var style = document.createElement('style');
  style.textContent = [
    '.mchat-bubble{position:fixed;bottom:22px;right:22px;width:60px;height:60px;',
    'border-radius:50%;background:' + ACCENT + ';box-shadow:0 10px 30px -8px rgba(0,0,0,.4);',
    'display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999998;',
    'border:none;transition:transform .2s ease;}',
    '.mchat-bubble:hover{transform:scale(1.06);}',
    '.mchat-bubble svg{width:26px;height:26px;fill:#fff;}',
    '.mchat-panel{position:fixed;bottom:94px;right:22px;width:340px;max-width:calc(100vw - 32px);',
    'height:460px;max-height:calc(100vh - 140px);background:#fff;border-radius:16px;',
    'box-shadow:0 20px 60px -15px rgba(0,0,0,.35);display:flex;flex-direction:column;',
    'overflow:hidden;z-index:999999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
    'opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;transition:opacity .18s ease,transform .18s ease;}',
    '.mchat-panel.mchat-visible{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}',
    '.mchat-header{background:' + ACCENT_DARK + ';color:#fff;padding:14px 16px;display:flex;',
    'align-items:center;justify-content:space-between;flex-shrink:0;}',
    '.mchat-header-title{font-size:14.5px;font-weight:600;}',
    '.mchat-header-actions{display:flex;gap:10px;align-items:center;}',
    '.mchat-icon-btn{background:rgba(255,255,255,.18);border:none;color:#fff;width:26px;height:26px;',
    'border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;',
    'font-size:14px;line-height:1;padding:0;}',
    '.mchat-icon-btn:hover{background:rgba(255,255,255,.32);}',
    '.mchat-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#f7f7f9;}',
    '.mchat-msg{max-width:80%;padding:9px 12px;border-radius:14px;font-size:13.5px;line-height:1.45;',
    'white-space:pre-line;word-wrap:break-word;}',
    '.mchat-msg-bot{align-self:flex-start;background:#fff;color:#222;border:1px solid #ececec;',
    'border-bottom-left-radius:4px;}',
    '.mchat-msg-user{align-self:flex-end;background:' + ACCENT + ';color:#fff;border-bottom-right-radius:4px;}',
    '.mchat-options{display:flex;flex-direction:column;gap:6px;align-self:flex-start;max-width:88%;}',
    '.mchat-option-btn{background:#fff;border:1.5px solid ' + ACCENT + ';color:' + ACCENT_DARK + ';',
    'padding:7px 12px;border-radius:16px;font-size:13px;cursor:pointer;text-align:left;',
    'transition:background .15s ease;}',
    '.mchat-option-btn:hover{background:' + ACCENT + ';color:#fff;}',
    '.mchat-form{display:flex;flex-direction:column;gap:7px;background:#fff;border:1px solid #ececec;',
    'border-radius:12px;padding:10px;align-self:stretch;}',
    '.mchat-form label{font-size:11.5px;font-weight:600;color:#666;margin-bottom:-3px;}',
    '.mchat-form input{border:1px solid #ddd;border-radius:8px;padding:7px 9px;font-size:13px;',
    'font-family:inherit;}',
    '.mchat-form input:focus{outline:none;border-color:' + ACCENT + ';}',
    '.mchat-form-submit{margin-top:4px;background:' + ACCENT + ';color:#fff;border:none;',
    'border-radius:8px;padding:8px;font-size:13px;font-weight:600;cursor:pointer;}',
    '.mchat-form-submit:hover{background:' + ACCENT_DARK + ';}',
    '.mchat-typing{align-self:flex-start;color:#999;font-size:12.5px;padding:2px 4px;}',
    '.mchat-footer{padding:8px 12px;border-top:1px solid #eee;flex-shrink:0;}',
    '.mchat-home-btn{width:100%;background:none;border:none;color:#888;font-size:12px;',
    'cursor:pointer;padding:4px;}',
    '.mchat-home-btn:hover{color:' + ACCENT_DARK + ';}',
    '@media (max-width:420px){.mchat-panel{right:16px;left:16px;width:auto;bottom:88px;}',
    '.mchat-bubble{right:16px;bottom:16px;}}'
  ].join('');
  document.head.appendChild(style);

  // ---------------------------------------------------------------------
  // Construcción del DOM
  // ---------------------------------------------------------------------
  var bubble = document.createElement('button');
  bubble.className = 'mchat-bubble';
  bubble.setAttribute('aria-label', 'Abrir chat');
  bubble.innerHTML =
    '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.77 1.47 5.24 3.77 6.87-.16 1.13-.6 2.6-1.6 4.02 0 0 2.55-.24 4.9-1.99 1 .27 2.06.42 3.16.42h.29c5.52 0 10-3.94 10-8.8C22 5.94 17.5 2 12 2z"/></svg>';

  var panel = document.createElement('div');
  panel.className = 'mchat-panel';
  panel.innerHTML =
    '<div class="mchat-header">' +
    '  <span class="mchat-header-title">Chatea con nosotros</span>' +
    '  <div class="mchat-header-actions">' +
    '    <button type="button" class="mchat-icon-btn" data-action="home" title="Volver al inicio">&#8635;</button>' +
    '    <button type="button" class="mchat-icon-btn" data-action="close" title="Cerrar">&#10005;</button>' +
    '  </div>' +
    '</div>' +
    '<div class="mchat-messages"></div>' +
    '<div class="mchat-footer">' +
    '  <button type="button" class="mchat-home-btn" data-action="home">&#8962; Menú principal</button>' +
    '</div>';

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  var messagesEl = panel.querySelector('.mchat-messages');
  var homeBtns = panel.querySelectorAll('[data-action="home"]');
  var closeBtn = panel.querySelector('[data-action="close"]');

  // ---------------------------------------------------------------------
  // Helpers de render
  // ---------------------------------------------------------------------
  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBotMessage(text) {
    if (!text) return;
    var div = document.createElement('div');
    div.className = 'mchat-msg mchat-msg-bot';
    div.textContent = text;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addUserMessage(text) {
    var div = document.createElement('div');
    div.className = 'mchat-msg mchat-msg-user';
    div.textContent = text;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addTyping() {
    var div = document.createElement('div');
    div.className = 'mchat-typing';
    div.textContent = 'Escribiendo…';
    div.setAttribute('data-typing', '1');
    messagesEl.appendChild(div);
    scrollToBottom();
    return div;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function clearInteractive() {
    var old = messagesEl.querySelectorAll('.mchat-options, .mchat-form');
    old.forEach(function (n) {
      n.parentNode.removeChild(n);
    });
  }

  function renderOptions(opciones) {
    if (!opciones || !opciones.length) return;
    clearInteractive();
    var wrap = document.createElement('div');
    wrap.className = 'mchat-options';
    opciones.forEach(function (op) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mchat-option-btn';
      btn.textContent = op.texto;
      btn.addEventListener('click', function () {
        clearInteractive();
        addUserMessage(op.texto);
        sendToEngine({ opcion_elegida: op.texto });
      });
      wrap.appendChild(btn);
    });
    messagesEl.appendChild(wrap);
    scrollToBottom();
  }

  function renderForm(campos) {
    if (!campos || !campos.length) return;
    clearInteractive();
    var form = document.createElement('form');
    form.className = 'mchat-form';

    campos.forEach(function (campo) {
      var label = document.createElement('label');
      label.textContent = campo.label + (campo.requerido ? ' *' : '');
      var input = document.createElement('input');
      input.type = campo.tipo || 'text';
      input.name = campo.nombre;
      input.required = !!campo.requerido;
      form.appendChild(label);
      form.appendChild(input);
    });

    var submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'mchat-form-submit';
    submit.textContent = 'Enviar';
    form.appendChild(submit);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var datos = {};
      campos.forEach(function (campo) {
        datos[campo.nombre] = form.elements[campo.nombre].value;
      });
      clearInteractive();
      addUserMessage('He enviado el formulario ✅');
      sendToEngine({ datos_formulario: datos });
    });

    messagesEl.appendChild(form);
    scrollToBottom();
  }

  function renderRedirect(url, texto) {
    clearInteractive();
    var wrap = document.createElement('div');
    wrap.className = 'mchat-options';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mchat-option-btn';
    btn.textContent = 'Abrir ↗';
    btn.addEventListener('click', function () {
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    wrap.appendChild(btn);
    messagesEl.appendChild(wrap);
    scrollToBottom();
  }

  function renderResponse(data) {
    if (data.saludo) addBotMessage(data.saludo);
    if (data.texto) addBotMessage(data.texto);

    if (data.tipo === 'formulario' && data.campos && !data.es_formulario_submit) {
      renderForm(data.campos);
    } else if (data.tipo === 'redirigir' && data.url) {
      renderRedirect(data.url, data.texto);
    } else if (data.opciones && data.opciones.length) {
      renderOptions(data.opciones);
    }

    state.currentNodeId = data.nodo_id || state.currentNodeId;
  }

  // ---------------------------------------------------------------------
  // Comunicación con el motor (n8n)
  // ---------------------------------------------------------------------
  function sendToEngine(payload) {
    state.loading = true;
    var typingEl = addTyping();

    var body = {
      bot_id: BOT_ID,
      nodo_actual: state.currentNodeId,
      opcion_elegida: (payload && payload.opcion_elegida) || null,
      datos_formulario: (payload && payload.datos_formulario) || null
    };

    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        removeTyping(typingEl);
        state.loading = false;
        renderResponse(data);
      })
      .catch(function (err) {
        removeTyping(typingEl);
        state.loading = false;
        addBotMessage('Uy, algo falló al conectar. Intenta de nuevo en un momento.');
        console.error('[motor-chat] error:', err);
      });
  }

  function goHome() {
    clearInteractive();
    messagesEl.innerHTML = '';
    state.currentNodeId = 'inicio';
    sendToEngine({});
  }

  // ---------------------------------------------------------------------
  // Apertura / cierre del panel
  // ---------------------------------------------------------------------
  function openPanel() {
    state.open = true;
    panel.classList.add('mchat-visible');
    if (!state.started) {
      state.started = true;
      sendToEngine({});
    }
  }

  function closePanel() {
    state.open = false;
    panel.classList.remove('mchat-visible');
  }

  bubble.addEventListener('click', function () {
    if (state.open) {
      closePanel();
    } else {
      openPanel();
    }
  });

  closeBtn.addEventListener('click', closePanel);
  homeBtns.forEach(function (btn) {
    btn.addEventListener('click', goHome);
  });
})();
