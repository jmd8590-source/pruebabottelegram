/**
 * ============================================================
 *  CONFIGURACIÓN DEL BOT — Lee variables de entorno
 * ============================================================
 */

require("dotenv").config();

module.exports = {
  // Token del Bot de Telegram (obligatorio)
  BOT_TOKEN: process.env.BOT_TOKEN,

  // Nombre de tu negocio
  BUSINESS_NAME: process.env.BUSINESS_NAME || "Mi Negocio",

  // Mensaje de bienvenida
  WELCOME_MESSAGE:
    process.env.WELCOME_MESSAGE ||
    "Estamos aquí para ayudarte. ¿En qué podemos asistirte hoy?",

  // Usuario de Telegram del asesor (sin @)
  ADVISOR_USERNAME: process.env.ADVISOR_USERNAME || "asesor",

  // Teléfono de contacto
  CONTACT_PHONE: process.env.CONTACT_PHONE || "+34 600 000 000",

  // Email de contacto
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || "info@minegocio.com",

  // URL del sitio web
  WEBSITE_URL: process.env.WEBSITE_URL || "https://www.minegocio.com",
};
