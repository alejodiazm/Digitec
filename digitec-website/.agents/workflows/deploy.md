---
description: Pipeline completo de deployment — QA, build, commit y push + instrucciones de Hostinger
---

# Workflow: /deploy — Pipeline de Despliegue

## Contexto obligatorio
Leer `.agents/skills/deployment.md` antes de ejecutar este workflow.

## Fase 1: Quality Gate (obligatoria)
Ejecutar el workflow `/qa` completo. Si falla cualquier paso, **DETENER** y corregir antes de continuar.

## Fase 2: Build Final
// turbo
1. En `/Users/macuser/Desktop/DIGITEC/Digitec/digitec-website`:
```bash
npm run build
```
Confirmar `Exit code: 0` y que la tabla de rutas muestre todos los endpoints.

## Fase 3: Commit y Push a GitHub
2. Ejecutar workflow `/git` con el mensaje descriptivo del deploy:
```bash
git add .
git commit -m "chore(deploy): [descripción de qué se desplegó]"
git push origin main
```

## Fase 4: Instrucciones de Hostinger (Manual)
⚠️ **Hostinger NO tiene CI/CD automático.** Informar al usuario:

```
📦 PASOS MANUALES REQUERIDOS EN HOSTINGER:

1. Abrir FileZilla u otro cliente FTP/SFTP
   Host: [el servidor FTP de Hostinger]
   Usuario/Contraseña: credenciales del CPanel

2. Subir los siguientes archivos al public_html/:
   ✓ .next/         (BUILD — carpeta completa)
   ✓ public/        (assets, imágenes, favicon)
   ✓ server.js
   ✓ package.json
   ✓ package-lock.json

3. En CPanel SSH Terminal:
   cd /home/[usuario]/public_html
   npm install --production

4. En CPanel → Node.js Application:
   → Hacer clic en "Restart"

5. Verificar en el navegador que el sitio carga correctamente
6. Testear formulario de contacto
```

## Checklist final
- [ ] `/qa` pasó sin errores
- [ ] Build completado con Exit code: 0
- [ ] Commit realizado con mensaje semántico
- [ ] Push a `origin/main` confirmado
- [ ] Archivos subidos a Hostinger via FTP
- [ ] `npm install --production` ejecutado en servidor
- [ ] App reiniciada en CPanel
- [ ] Formulario de contacto verificado en producción
