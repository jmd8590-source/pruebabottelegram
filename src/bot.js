/**
 * ============================================================
 *  BOT DE TELEGRAM — ARCHIVO PRINCIPAL
 * ============================================================
 *  Punto de entrada del bot. Gestiona arranque, reinicio
 *  automático y manejo global de errores.
 * ============================================================
 */

const TelegramBot = require("node-telegram-bot-api");
const http = require("http");
const config = require("../config/config");
const handlers = require("./handlers");
const logger = require("./logger");

// ── Health-check HTTP server (platform liveness probe) ───────
const PORT = process.env.PORT || 3000;
const healthServer = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", bot: config.BUSINESS_NAME }));
});
healthServer.listen(PORT, "0.0.0.0", () => {
  logger.info(`🌐 Health-check server listening on port ${PORT}`);
});

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
  healthServer.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.info("Bot detenido por el sistema (SIGTERM)");
  bot.stopPolling();
  healthServer.close();
  process.exit(0);
});

module.exports = bot;
