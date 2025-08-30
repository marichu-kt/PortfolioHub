# PortfolioHub - Tu Dashboard de GitHub

![PortfolioHub](https://img.shields.io/badge/PortfolioHub-GitHub%2520Portfolio%2520Dashboard-blue)
![Next.js](https://img.shields.io/badge/Next.js-13.0+-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.0+-61dafb?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38b2ac?logo=tailwind-css)

---

## 🎥 Demo
![Demo](./demo.gif)

---

## 📋 Tabla de Contenidos
- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características y Funcionalidades](#-características-y-funcionalidades)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso y Personalización](#-uso-y-personalización)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Alternativas de Uso](#-alternativas-de-uso)
- [Soporte](#-soporte)
- [Próximas Funcionalidades](#-próximas-funcionalidades)

---

## 🚀 Descripción del Proyecto
PortfolioHub es una aplicación web moderna construida con Next.js que permite a los desarrolladores crear un portfolio personalizado utilizando datos de su cuenta de GitHub. La aplicación solicita un token de acceso personal de GitHub para obtener información detallada del usuario y presentarla en un dashboard visualmente atractivo con estadísticas, gráficos y elementos interactivos.

---

## ✨ Características y Funcionalidades

### 🔐 Autenticación y Seguridad
- **Login con GitHub:** Autenticación mediante tokens de acceso personal de GitHub  
- **Gestión segura de tokens:** Almacenamiento seguro en variables de entorno  

### 📊 Dashboard de Estadísticas
- **Estadísticas de perfil:** Información básica del usuario de GitHub  
- **Gráficos de lenguajes:** Visualización de los lenguajes de programación más utilizados  
- **Calendario de contribuciones:** Mapa de calor de commits y actividad  
- **Estadísticas avanzadas:** Métricas detalladas de repositorios y actividad  

### 🎨 Componentes Interactivos
- **Planetas rotatorios:** Elementos visuales animados con texturas planetarias  
- **Temas personalizables:** Interfaz con modo claro y oscuro (ThemeSwitch)  
- **Exportación a PDF:** Generación de documentos descargables del portfolio  
- **Compartición via QR:** Generación de código QR para compartir el portfolio fácilmente  

### 🔧 Herramientas de Personalización
- **Filtros de repositorios:** Búsqueda y filtrado de repositorios  
- **Editor de código en vivo:** Posibilidad de personalizar secciones de código  
- **Panel de personalización:** Interfaz para ajustar la apariencia del portfolio  

---

## 🛠 Tecnologías Utilizadas

### Frontend
- **Next.js 13+:** Framework React con renderizado híbrido (SSG/SSR)  
- **React 18+:** Biblioteca principal de interfaz de usuario  
- **Tailwind CSS:** Framework de CSS utility-first para estilos  
- **Context API:** Gestión del estado global de la aplicación  

### APIs y Servicios
- **GitHub REST API:** Obtención de datos de usuario y repositorios  
- **GitHub GraphQL API:** Consultas específicas para datos detallados  

### Utilidades y Librerías
- **React Loadable:** Carga *lazy* de componentes  
- **QR Code Generation:** Generación de códigos QR para compartir  
- **PDF Generation:** Creación de documentos PDF para exportación  
- **Chart Libraries:** Visualización de datos en gráficos  

---

## 📋 Requisitos del Sistema

### Requisitos Mínimos
- Node.js 16.8.0 o superior  
- npm 7.0 o superior  
- Token de acceso personal de GitHub con los *scopes* adecuados  

### Scopes Requeridos del Token de GitHub
El token debe tener los siguientes permisos:

- `repo` (incluyendo todos los sub-permisos: status, deployment, public_repo, invite, security_events)  
- `read:user`  
- `user:email`  
- `project`  
- `read:project`  
- `workflow`  

---

## 💻 Instalación y Configuración

1. **Clonar el Repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd portfoliohub
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar Variables de Entorno**  
   Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```env
   GITHUB_TOKEN=tu_token_de_acceso_personal_aqui
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Otras variables necesarias
   ```

4. **Obtener Token de GitHub**  
   - Ve a **GitHub Settings > Developer settings > Personal access tokens**  
   - Haz clic en *"Generate new token"*  
   - Selecciona los *scopes* necesarios: repo, read:user, user:email, project, read:project, workflow  
   - Copia el token generado y añádelo al archivo `.env.local`  

5. **Ejecutar la Aplicación**
   ```bash
   npm run dev
   # o
   yarn dev
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

6. **Construir para Producción**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Estructura del Proyecto
```text
portfoliohub/
├── public/                 # Archivos estáticos
│   ├── images/            # Imágenes generales
│   │   └── logo.png       # Logo de la aplicación
│   └── textures/          # Texturas para componentes
│       ├── earth.jpg
│       ├── jupiter.jpg
│       ├── mars.jpg
│       ├── moon.jpg
│       └── venus.jpg
├── src/
│   ├── components/        # Componentes de React
│   │   ├── Achievements.js
│   │   ├── AdvancedStats.js
│   │   ├── AnimatedSection.js
│   │   ├── GitHubCalendarS.js
│   │   ├── LanguageChart.js
│   │   ├── LiveCodeEditor.js
│   │   ├── LoginButton.js
│   │   ├── PdfExportButton.js
│   │   ├── QRShare.js
│   │   ├── RepoFilters.js
│   │   ├── RotatingPlanet.js
│   │   ├── Skills.js
│   │   └── ThemeSwitch.js
│   ├── context/           # Contextos de React
│   │   └── ThemeContext.js
│   ├── hooks/             # Custom Hooks
│   │   └── useAuth.js
│   ├── pages/             # Páginas de Next.js
│   │   ├── _app.js        # Componente principal de la app
│   │   ├── customize.js   # Página de personalización
│   │   ├── dashboard.js   # Dashboard principal
│   │   └── index.js       # Página de inicio
│   ├── services/          # Servicios y APIs
│   ├── styles/            # Estilos globales
│   │   └── globals.css
│   └── utils/             # Utilidades
│       └── languageicons.js
├── next.config.js         # Configuración de Next.js
├── tailwind.config.js     # Configuración de Tailwind CSS
├── postcss.config.js      # Configuración de PostCSS
├── package.json           # Dependencias y scripts
└── README.md              # Este archivo
```

---

## 🎯 Uso y Personalización

### Primer Uso
1. Abre la aplicación en tu navegador  
2. Haz clic en el botón **"Login with GitHub"**  
3. Introduce tu token de acceso personal cuando se solicite  
4. Una vez autenticado, serás redirigido al dashboard principal  

### Personalización del Portfolio
- Navega a la página de personalización **(/customize)**  
- Ajusta los colores, temas y elementos visibles  
- Utiliza el editor de código en vivo para personalizar secciones específicas  
- Guarda los cambios para aplicar las personalizaciones  

### Exportación del Portfolio
- En el dashboard, haz clic en el botón **"Export to PDF"**  
- Espera a que se genere el documento  
- Descarga el PDF resultante para compartirlo fuera de línea  

### Compartir el Portfolio
- Haz clic en el botón **"Share via QR"**  
- Escanea el código QR con cualquier dispositivo móvil  
- Comparte el enlace generado para que otros vean tu portfolio  

---

## 🌐 Despliegue

### Despliegue en Vercel (Recomendado)
- Conecta tu repositorio a **[Vercel](https://vercel.com/)**  
- Añade las variables de entorno en el dashboard de Vercel  
- Realiza el despliegue automático con cada *push* a la rama principal  

### Despliegue en Otras Plataformas
El proyecto puede desplegarse en cualquier plataforma que soporte Node.js:  
- [Netlify](https://www.netlify.com/)  
- [Heroku](https://www.heroku.com/)  
- [Railway](https://railway.app/)  
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/)  

### Variables de Entorno en Producción
Asegúrate de configurar las siguientes variables en tu plataforma de despliegue:
- `GITHUB_TOKEN`: Token de acceso personal de GitHub  
- `NEXT_PUBLIC_APP_URL`: URL pública de tu aplicación  

---

## 🤝 Contribución
Las contribuciones son bienvenidas. Para contribuir al proyecto:

1. Haz un **fork** del proyecto  
2. Crea una rama para tu *feature*:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit de tus cambios:  
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push a la rama:  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Abre un **Pull Request**  

### Guía de Estilo de Código
- Utiliza **Prettier** para formatear el código  
- Sigue las convenciones de nomenclatura de React/Next.js  
- Añade comentarios para código complejo  
- Mantén los componentes modulares y reutilizables  

---

## 📄 Licencia
Este proyecto está bajo la **Licencia MIT**.  
Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## 🆓 Alternativas de Uso
PortfolioHub es completamente gratuito y de código abierto. Puedes:  
- Usarlo para crear tu portfolio personal  
- Modificarlo según tus necesidades  
- Contribuir con nuevas funcionalidades  
- Compartirlo con otros desarrolladores  

---

## 📞 Soporte
Si encuentras algún problema o tienes preguntas:  
- Revisa la documentación en este README  
- Comprueba los *issues* existentes en el repositorio  
- Abre un nuevo *issue* detallando el problema encontrado  

---

## 🔮 Próximas Funcionalidades
- Integración con más plataformas (GitLab, Bitbucket)  
- Plantillas predefinidas para diferentes estilos de portfolio  
- Análisis más detallado de commits y contribuciones  
- Sistema de plugins para funcionalidades extendidas  
- Modo fuera de línea para visualización del portfolio  

---

> ⚠️ **Nota:** Recuerda que para usar **PortfolioHub** necesitas un token de acceso personal de GitHub con los permisos adecuados. **Nunca compartas tu token públicamente ni lo incluyas en repositorios de código.**
