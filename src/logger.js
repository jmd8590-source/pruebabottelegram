/**
 * ============================================================
 *  LOGGER — SISTEMA DE REGISTROS
 * ============================================================
 *  Guarda logs en consola y en archivo con marca de tiempo.
 *  Los logs se rotan diariamente para no ocupar espacio.
 * ============================================================
 */

const fs = require("fs");
const path = require("path");

const LOG_DIR = path.join(__dirname, "../logs");

// Crear carpeta de logs si no existe
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function getTimestamp() {
  return new Date().toISOString().replace("T", " ").split(".")[0];
}

function getLogFile() {
  const date = new Date().toISOString().split("T")[0];
  return path.join(LOG_DIR, `bot-${date}.log`);
}

function write(level, message) {
  const line = `[${getTimestamp()}] [${level}] ${message}`;
  console.log(line);
  try {
    fs.appendFileSync(getLogFile(), line + "\n");
  } catch {
    // Si falla escribir el log, no detener el bot
  }
}

module.exports = {
  info: (msg) => write("INFO ", msg),
  warn: (msg) => write("WARN ", msg),
  error: (msg) => write("ERROR", msg),
};
