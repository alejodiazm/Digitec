---
name: digitec-deployment
description: Guía completa de despliegue de DIGITEC Website en Hostinger (CPanel). Leer antes de cualquier tarea de deploy.
---

# 🚀 Guía de Deployment — DIGITEC en Hostinger

## Contexto del Servidor
- **Proveedor**: Hostinger
- **Tipo**: CPanel con soporte Node.js
- **Dominio temporal**: `digimall.business` (en proceso de migración a `digitec.global`)
- **Runtime**: Node.js 20.x en Hostinger

## Archivos del Proyecto
```
server.js          ← Servidor Express personalizado para Hostinger
public/.htaccess   ← Reglas de rewrite para HTTPS y SPA routing
```

## Flujo Completo de Deployment

### Paso 1: Build local
```bash
# En la terminal, dentro del proyecto
npm run build
```
Esto genera la carpeta `.next/` con el código optimizado.

### Paso 2: Archivos a subir via FTP/SFTP
```
Directorio raíz del proyecto → subir a public_html/ en Hostinger

Archivos OBLIGATORIOS:
├── .next/              ← Build de Next.js (con todo su contenido)
├── public/             ← Assets públicos (imágenes, favicon, etc.)
├── server.js           ← Servidor personalizado
├── package.json        ← Lista de dependencias
└── package-lock.json   ← Lock de dependencias

NO subir:
├── node_modules/       ← Instalar en el servidor
├── .env.local          ← Configurar via CPanel
└── src/                ← Código fuente (no necesario en producción)
```

### Paso 3: Instalar dependencias en el servidor
En Hostinger CPanel → Terminal SSH:
```bash
cd /home/user/public_html
npm install --production
```

### Paso 4: Variables de entorno en CPanel
Ir a **CPanel → Node.js Application → Environment Variables** y agregar:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4xxxxxxxxxxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4xxxxxxxxxxxxx
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
SENTRY_DSN=https://xxx@sentry.io/xxx
NODE_ENV=production
```

### Paso 5: Configurar la aplicación Node.js
En CPanel → **Setup Node.js App**:
- **Node.js version**: 20.x
- **Application mode**: Production
- **Application root**: `/home/user/public_html`
- **Application startup file**: `server.js`
- **Application URL**: `digimall.business` o el dominio activo

### Paso 6: Reiniciar y verificar
1. Click en "Restart" en el panel de Node.js
2. Visitar el dominio y verificar que carga correctamente
3. Testear el formulario de contacto (envío a `digitecglobalsas@gmail.com`)

## ⚠️ Por qué los cambios en GitHub NO se reflejan automáticamente
Hostinger NO tiene integración automática con GitHub. El flujo es:
```
Código local → git push → GitHub (backup)
                       ↘
          FTP Manual → Hostinger (producción)
```
Cada deploy requiere subir los archivos manualmente via FTP o SSH.

## Solución de problemas comunes

### Error: "Cannot find module 'xxx'"
```bash
# Solución: reinstalar dependencias en el servidor
npm install --production
```

### Error: Página en blanco o 500
- Verificar que `.next/` fue subido completo
- Revisar logs en CPanel → Logs de error de Node.js

### El formulario de contacto no envía
- Verificar `RESEND_API_KEY` en variables de entorno del CPanel
- Verificar `TURNSTILE_SECRET_KEY` y `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

### HTTPS no funciona
- Verificar que `.htaccess` está en `public/` con las reglas de redirect

## `.htaccess` actual (en `/public/`)
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{SERVER_PORT} !^443$
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
```

## Checklist pre-deploy
- [ ] `npm run build` completado sin errores
- [ ] `npm run lint` sin errores
- [ ] Variables de entorno actualizadas si hubo cambios
- [ ] Probado en `localhost:3000` el flujo completo
- [ ] Formulario de contacto testeado
- [ ] `git push origin main` realizado (para backup)
