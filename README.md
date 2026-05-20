# 🤖 Bot de Telegram 24/7 para Empresas

Kit listo para desplegar un bot profesional de Telegram para tu negocio.

## 📁 Estructura del Proyecto

```
telegram-bot-kit/
├── src/
│   ├── bot.js          ← Punto de entrada principal
│   ├── handlers.js     ← Lógica de mensajes (EDITA AQUÍ)
│   └── logger.js       ← Sistema de logs automático
├── config/
│   └── config.js       ← Datos de tu empresa (EDITA AQUÍ)
├── logs/               ← Logs automáticos del bot
├── .env.example        ← Plantilla para tu token
├── .env                ← Tu token real (créalo tú)
├── ecosystem.config.js ← Configuración PM2 (24/7)
├── package.json
└── .gitignore
```

## ⚡ Instalación Rápida

```bash
npm install
cp .env.example .env
# Edita .env con tu token
npm start
```

## 🚀 Despliegue 24/7 con PM2

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```
