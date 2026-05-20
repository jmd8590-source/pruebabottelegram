/**
 * ============================================================
 *  HANDLERS — LÓGICA DE CONVERSACIÓN
 * ============================================================
 *  Aquí defines QUÉ hace el bot ante cada mensaje o comando.
 *  Personaliza los textos, botones y flujos según tu negocio.
 * ============================================================
 */

const config = require("../config/config");
const logger = require("./logger");

// ── Teclado de menú principal ─────────────────────────────────
const mainMenuKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: "📋 Servicios / Productos" }, { text: "💰 Precios" }],
      [{ text: "📍 Ubicación y Horario" }, { text: "📞 Contactar Asesor" }],
      [{ text: "❓ Preguntas Frecuentes" }, { text: "🌐 Ver Sitio Web" }],
    ],
    resize_keyboard: true,
    persistent: true,
  },
};

// ── Teclado inline para cerrar conversación ───────────────────
const closeKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🏠 Volver al Menú Principal", callback_data: "menu_principal" }],
    ],
  },
};

// ── Registrar todos los handlers en el bot ────────────────────
function register(bot) {
  // /start — Bienvenida
  bot.onText(/\/start/, (msg) => onStart(bot, msg));

  // /menu — Menú principal
  bot.onText(/\/menu/, (msg) => showMainMenu(bot, msg));

  // /ayuda — Ayuda rápida
  bot.onText(/\/ayuda/, (msg) => onHelp(bot, msg));

  // Mensajes de texto (teclado de botones)
  bot.on("message", (msg) => onMessage(bot, msg));

  // Callbacks de botones inline
  bot.on("callback_query", (query) => onCallbackQuery(bot, query));
}

// ── /start ────────────────────────────────────────────────────
function onStart(bot, msg) {
  const name = msg.from.first_name || "Cliente";
  const chatId = msg.chat.id;

  logger.info(`Nuevo usuario: ${name} (${chatId})`);

  const welcomeText =
    `👋 ¡Hola, *${name}*! Bienvenid@ a *${config.BUSINESS_NAME}*.\n\n` +
    `${config.WELCOME_MESSAGE}\n\n` +
    `Elige una opción del menú para comenzar 👇`;

  bot.sendMessage(chatId, welcomeText, {
    parse_mode: "Markdown",
    ...mainMenuKeyboard,
  });
}

// ── Menú principal ────────────────────────────────────────────
function showMainMenu(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `🏠 *Menú Principal — ${config.BUSINESS_NAME}*\n\nSelecciona una opción:`,
    { parse_mode: "Markdown", ...mainMenuKeyboard }
  );
}

// ── /ayuda ────────────────────────────────────────────────────
function onHelp(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `ℹ️ *Comandos disponibles:*\n\n` +
      `/start — Reiniciar el bot\n` +
      `/menu — Ver menú principal\n` +
      `/ayuda — Mostrar esta ayuda\n\n` +
      `Si necesitas hablar con una persona real, pulsa *"Contactar Asesor"* en el menú.`,
    { parse_mode: "Markdown", ...mainMenuKeyboard }
  );
}

// ── Mensajes de texto generales ───────────────────────────────
function onMessage(bot, msg) {
  // Ignorar comandos (ya los manejan onText)
  if (!msg.text || msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  switch (text) {
    case "📋 Servicios / Productos":
      sendServices(bot, chatId);
      break;

    case "💰 Precios":
      sendPrices(bot, chatId);
      break;

    case "📍 Ubicación y Horario":
      sendLocation(bot, chatId);
      break;

    case "📞 Contactar Asesor":
      sendContactAdvisor(bot, chatId);
      break;

    case "❓ Preguntas Frecuentes":
      sendFAQ(bot, chatId);
      break;

    case "🌐 Ver Sitio Web":
      sendWebsite(bot, chatId);
      break;

    default:
      // Respuesta automática si no entiende el mensaje
      sendDefaultReply(bot, chatId, msg.from.first_name);
  }
}

// ── Callbacks de botones inline ───────────────────────────────
function onCallbackQuery(bot, query) {
  const chatId = query.message.chat.id;
  bot.answerCallbackQuery(query.id); // Quitar el "reloj" del botón

  if (query.data === "menu_principal") {
    showMainMenu(bot, { chat: { id: chatId } });
  }
}

// ─────────────────────────────────────────────────────────────
//  RESPUESTAS PERSONALIZABLES — Edita estos textos
// ─────────────────────────────────────────────────────────────

function sendServices(bot, chatId) {
  const text =
    `📋 *Nuestros Servicios / Productos*\n\n` +
    // ✏️ PERSONALIZA: reemplaza con tus servicios reales
    `✅ *Servicio 1* — Descripción breve\n` +
    `✅ *Servicio 2* — Descripción breve\n` +
    `✅ *Servicio 3* — Descripción breve\n` +
    `✅ *Servicio 4* — Descripción breve\n\n` +
    `¿Te interesa alguno? Escríbenos o pulsa *"Contactar Asesor"*.`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...closeKeyboard });
}

function sendPrices(bot, chatId) {
  const text =
    `💰 *Tarifas y Precios*\n\n` +
    // ✏️ PERSONALIZA: añade tus precios reales
    `• *Plan Básico* — desde 99 €/mes\n` +
    `• *Plan Profesional* — desde 199 €/mes\n` +
    `• *Plan Empresa* — Consultar\n\n` +
    `_Los precios incluyen IVA. Solicita presupuesto personalizado._`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...closeKeyboard });
}

function sendLocation(bot, chatId) {
  // ✏️ PERSONALIZA: cambia dirección, horario e incluso envía ubicación GPS
  const text =
    `📍 *Dónde Encontrarnos*\n\n` +
    `🏢 *Dirección:* Calle Ejemplo 123, Ciudad\n\n` +
    `🕐 *Horario de Atención:*\n` +
    `Lunes a Viernes: 9:00 — 18:00\n` +
    `Sábados: 10:00 — 14:00\n` +
    `Domingos: Cerrado\n\n` +
    `📦 *Atención online 24/7* a través de este bot.`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...closeKeyboard });

  // OPCIONAL: Enviar ubicación GPS (descomenta y pon tus coordenadas)
  // bot.sendLocation(chatId, 37.3891, -5.9845);
}

function sendContactAdvisor(bot, chatId) {
  // ✏️ PERSONALIZA: añade usuario de Telegram, teléfono, etc.
  const text =
    `📞 *Contactar con un Asesor*\n\n` +
    `Nuestro equipo estará encantado de ayudarte:\n\n` +
    `👤 *Telegram:* @${config.ADVISOR_USERNAME}\n` +
    `📱 *WhatsApp / Tel:* ${config.CONTACT_PHONE}\n` +
    `📧 *Email:* ${config.CONTACT_EMAIL}\n\n` +
    `_Horario: Lunes a Viernes 9:00–18:00_\n` +
    `_Fuera de horario, deja tu mensaje y te responderemos pronto._`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...closeKeyboard });
}

function sendFAQ(bot, chatId) {
  // ✏️ PERSONALIZA: adapta las preguntas a tu negocio
  const text =
    `❓ *Preguntas Frecuentes*\n\n` +
    `*¿Cómo puedo contratar vuestros servicios?*\n` +
    `→ Contáctanos por este bot o escribe a nuestro asesor.\n\n` +
    `*¿Cuánto tardan en responder?*\n` +
    `→ En horario laboral, menos de 2 horas.\n\n` +
    `*¿Ofrecéis período de prueba?*\n` +
    `→ Sí, consulta disponibilidad con nuestro equipo.\n\n` +
    `*¿Hacéis facturas?*\n` +
    `→ Sí, emitimos factura para empresas y autónomos.\n\n` +
    `*¿Cómo se realizan los pagos?*\n` +
    `→ Transferencia bancaria, tarjeta o Bizum.`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...closeKeyboard });
}

function sendWebsite(bot, chatId) {
  // ✏️ PERSONALIZA: pon tu URL real
  const text =
    `🌐 *Visita Nuestra Web*\n\n` +
    `Encuentra toda la información, portfolio y noticias en:\n\n` +
    `👉 [${config.WEBSITE_URL}](${config.WEBSITE_URL})`;

  bot.sendMessage(chatId, text, {
    parse_mode: "Markdown",
    disable_web_page_preview: false,
    ...closeKeyboard,
  });
}

function sendDefaultReply(bot, chatId, name) {
  const text =
    `Hola ${name || ""}! 😊 No he entendido tu mensaje.\n\n` +
    `Usa el menú de abajo para navegar, o pulsa *"Contactar Asesor"* si necesitas ayuda personalizada.`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown", ...mainMenuKeyboard });
}

module.exports = { register };
