# 🏛️ Sistema Ministerio Público

Sistema web para la gestión de casos del Ministerio Público, desarrollado con React, Node.js y SQL Server.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 📋 Tabla de Contenidos

- [🔍 Descripción](#-descripción)
- [✨ Características](#-características)
- [🏗️ Arquitectura](#️-arquitectura)
- [🛠️ Tecnologías](#️-tecnologías)
- [📦 Instalación](#-instalación)
- [🚀 Uso](#-uso)
- [🔌 API](#-api)
- [🗄️ Base de Datos](#️-base-de-datos)
- [🧪 Testing](#-testing)
- [🔒 Seguridad](#-seguridad)
- [📖 Documentación](#-documentación)
- [🤝 Contribuir](#-contribuir)

## 🔍 Descripción

Sistema integral para la gestión de casos del Ministerio Público que permite:
- Registro y seguimiento de casos judiciales
- Asignación de fiscales a casos específicos
- Gestión de fiscalías y recursos
- Generación de reportes y estadísticas
- Auditoría completa de cambios

## ✨ Características

### 🎯 **Funcionalidades Principales**
- ✅ **Gestión de Casos**: CRUD completo con validaciones
- ✅ **Asignación de Fiscales**: Sistema de asignación automática y manual
- ✅ **Dashboard Estadístico**: Métricas en tiempo real
- ✅ **Auditoría Completa**: Logs de todas las operaciones
- ✅ **Autenticación JWT**: Sistema seguro de autenticación
- ✅ **Responsive Design**: Compatible con todos los dispositivos

### 🔧 **Características Técnicas**
- ⚡ **API RESTful** con Node.js y Express
- 🎨 **Frontend moderno** con React 18
- 🗄️ **Base de datos robusta** con SQL Server
- 🐳 **Contenedorización** con Docker
- 🔐 **Seguridad implementada** con JWT y CORS
- 📱 **Diseño responsive** y accesible

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │     Backend     │    │   Base de Datos │
│   (React 18)    │◄──►│  (Node.js +     │◄──►│  (SQL Server)   │
│                 │    │   Express)      │    │                 │
│  Port: 3000     │    │  Port: 3001     │    │  Port: 1433     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Componentes del Sistema**
- **Frontend**: React con Context API, React Router
- **Backend**: Node.js con Express, middleware JWT
- **Base de Datos**: SQL Server con stored procedures
- **Contenedores**: Docker y Docker Compose

## 🛠️ Tecnologías

### **Backend**
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) Node.js 18+
- ![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express) Express 4.18
- ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens) JSON Web Tokens
- ![SQL Server](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=flat&logo=microsoft%20sql%20server&logoColor=white) SQL Server

### **Frontend**
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) React 18
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ES6+
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) CSS3
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) HTML5

### **DevOps**
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) Docker
- ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) Git

## 📦 Instalación

### **Prerrequisitos**
- Node.js 16+ 
- Docker (opcional)
- SQL Server 2019+ o Docker

### **Opción 1: Instalación Local**

```bash
# 1. Clonar el repositorio
git clone https://github.com/maicolindres/MP-082025.git
cd MP-082025

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Instalar dependencias del frontend
cd ../frontend
npm install

# 4. Configurar variables de entorno
cd ../backend
cp .env.example .env
# Editar .env con tus configuraciones
```

### **Opción 2: Docker Compose (Recomendado)**

```bash
# 1. Clonar repositorio
git clone https://github.com/maicolindres/MP-082025.git
cd MP-082025

# 2. Ejecutar con Docker
docker-compose up -d
```

### **Configuración de Variables de Entorno**

Crear archivo `.env` en la carpeta `backend`:

```env
# Base de Datos
DB_SERVER=localhost
DB_NAME=MinisterioPublico
DB_USER=sa
DB_PASSWORD=Admin123

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura

# Servidor
PORT=3001
NODE_ENV=development
```

## 🚀 Uso

### **Iniciar el Sistema**

```bash
# Opción 1: Desarrollo local
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

```bash
# Opción 2: Docker
docker-compose up -d
```

### **Acceder al Sistema**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Credenciales**: admin / secret

## 🔌 API

### **Autenticación**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "secret"
}
```

### **Gestión de Casos**
```http
# Obtener todos los casos
GET /api/casos
Authorization: Bearer {token}

# Crear nuevo caso
POST /api/casos
Authorization: Bearer {token}
Content-Type: application/json

{
  "numero_caso": "2024-001",
  "descripcion": "Descripción del caso",
  "id_fiscal_asignado": 1,
  "id_fiscalia": 1
}

# Actualizar caso
PUT /api/casos/:id

# Eliminar caso
DELETE /api/casos/:id
```

### **Estadísticas**
```http
GET /api/estadisticas
Authorization: Bearer {token}
```

## 🗄️ Base de Datos

### **Modelo de Datos**
```sql
-- Tabla principal: Casos
CREATE TABLE Casos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    numero_caso VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_creacion DATETIME DEFAULT GETDATE(),
    id_fiscal_asignado INT FOREIGN KEY,
    id_fiscalia INT FOREIGN KEY
);
```

### **Stored Procedures**
- `sp_GetAllCasos`: Obtener todos los casos
- `sp_CreateCaso`: Crear nuevo caso
- `sp_UpdateCaso`: Actualizar caso existente
- `sp_DeleteCaso`: Eliminar caso
- `sp_GetEstadisticas`: Obtener estadísticas

## 🧪 Testing

### **Pruebas de API**
```bash
# Instalar herramientas de testing
npm install -g newman

# Ejecutar pruebas
cd tests
newman run api-tests.json
```

### **Pruebas Manuales**
```bash
# Test de login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}'

# Test de casos
curl -X GET http://localhost:3001/api/casos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔒 Seguridad

### **Implementado** ✅
- JWT Authentication con expiración
- CORS configurado
- Validación de entrada básica
- SQL Injection prevention con stored procedures
- Variables de entorno para credenciales

### **Pendiente** ⚠️
- Hash de contraseñas con bcrypt
- Validación avanzada con Joi
- Rate limiting
- Logging de seguridad
- HTTPS en producción

## 📖 Documentación

- 📄 **[Manual Técnico](./diagramas/manualtecnico.html)**: Documentación técnica completa
- 🎨 **[Diagrama ER](./diagramas/ER.xml)**: Modelo de base de datos
- 🏗️ **[Arquitectura](./diagramas/arquitectura.xml)**: Diagrama de arquitectura

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

### **Estándares de Código**
- ESLint para JavaScript
- Prettier para formateo
- Conventional Commits
- Pruebas unitarias requeridas

## 📊 Estado del Proyecto

- ✅ **Backend API**: Completamente funcional
- ✅ **Frontend React**: Interfaz completa
- ✅ **Base de Datos**: Modelo implementado
- ✅ **Docker**: Contenedorización lista
- ⚠️ **Testing**: Pruebas básicas
- ⚠️ **Seguridad**: Implementación parcial

## 📝 Changelog

### v1.0.0 (2025-08-03)
- ✨ Implementación inicial del sistema
- ✅ CRUD completo de casos
- ✅ Sistema de autenticación JWT
- ✅ Dashboard con estadísticas
- ✅ Diseño responsive
- ✅ Contenedorización Docker

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Maicol Indres** - *Desarrollo Inicial* - [@maicolindres](https://github.com/maicolindres)

## 🙏 Agradecimientos

- Ministerio Público por los requerimientos
- Comunidad de Node.js y React
- Contribuidores de código abierto

---

<div align="center">

**⭐ ¡Dale una estrella si te gusta el proyecto! ⭐**

[🐛 Reportar Bug](https://github.com/maicolindres/MP-082025/issues) • [✨ Solicitar Feature](https://github.com/maicolindres/MP-082025/issues) • [📖 Documentación](./diagramas/manualtecnico.html)

</div>