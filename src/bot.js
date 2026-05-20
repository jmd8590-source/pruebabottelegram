/**
 * ============================================================
 *  BOT DE TELEGRAM — ARCHIVO PRINCIPAL
 * ============================================================
 *  Punto de entrada del bot. Gestiona arranque, reinicio
 *  automático y manejo global de errores.
 * ============================================================
 */

const TelegramBot = require("node-telegram-bot-api");
const config = require("../config/config");
const handlers = require("./handlers");
const logger = require("./logger");

// ── Crear instancia del bot ──────────────────────────────────
const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

logger.info("🤖 Bot iniciado correctamente");
logger.info(`📛 Nombre del negocio: ${config.BUSINESS_NAME}`);

// ── Registrar todos los handlers ─────────────────────────────
handlers.register(bot);

// ── Manejo de errores de polling ─────────────────────────────
bot.on("polling_error", (error) => {
  logger.error(`Error de polling: ${error.message}`);
  // El bot sigue funcionando; solo registra el error
});

// ── Manejo de errores no capturados ──────────────────────────
process.on("uncaughtException", (err) => {
  logger.error(`Error no capturado: ${err.message}`);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Promesa rechazada: ${reason}`);
});

// ── Apagado limpio ───────────────────────────────────────────
process.on("SIGINT", () => {
  logger.info("Bot detenido manualmente (SIGINT)");
  bot.stopPolling();
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("Bot detenido por el sistema (SIGTERM)");
  bot.stopPolling();
  process.exit(0);
});

module.exports = bot;
