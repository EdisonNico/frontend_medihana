# 🏥💻 MediHana-Frontend

> Sistema web de gestión clínica desarrollado con **React JSX + Vite**, orientado a la administración de pacientes, médicos, citas, consultorios, pagos, facturas e informes.

![React](https://img.shields.io/badge/React-JSX-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3)
![React Router](https://img.shields.io/badge/React_Router-DOM-CA4245?logo=react-router)
![Git](https://img.shields.io/badge/Git-F05032?logo=git)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github)

---

## 📌 Sobre el proyecto

**MediHana-Frontend** es una aplicación web para la gestión visual de una clínica médica.
Permite organizar información relacionada con pacientes, médicos, especialidades, consultorios, citas, historial médico, facturas, pagos e informes.

El sistema cuenta con una interfaz moderna, limpia y responsive, desarrollada con componentes reutilizables en React.

---

## ✨ Funcionalidades principales

* Panel principal administrativo.
* Gestión de pacientes.
* Gestión de médicos.
* Gestión de especialidades.
* Gestión de consultorios.
* Gestión de citas médicas.
* Historial médico.
* Facturas y pagos.
* Informes.
* Buscador dinámico para pacientes y médicos.
* Navegación mediante sidebar.
* Tablas con acciones de editar y eliminar.
* Diseño moderno con CSS personalizado.

---

## 🏗️ Estructura del proyecto

```txt
frontend_medihana/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── Table.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Citas.jsx
│   │   ├── Consultorios.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Especialidades.jsx
│   │   ├── Facturas.jsx
│   │   ├── Historial.jsx
│   │   ├── Login.jsx
│   │   ├── Medicos.jsx
│   │   ├── Pacientes.jsx
│   │   ├── Pagos.jsx
│   │   └── Reportes.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/
│   │   ├── dashboard.css
│   │   ├── global.css
│   │   ├── layout.css
│   │   └── tables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

---

## 🛠️ Tecnologías utilizadas

| Tecnología           | Uso                                      |
| -------------------- | ---------------------------------------- |
| **React JSX**        | Construcción de interfaces               |
| **Vite**             | Creación y ejecución rápida del proyecto |
| **JavaScript**       | Lógica del frontend                      |
| **CSS**              | Estilos personalizados                   |
| **React Router DOM** | Navegación entre páginas                 |
| **React Icons**      | Íconos del sistema                       |
| **Git**              | Control de versiones                     |
| **GitHub**           | Repositorio remoto                       |

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/EdisonNico/frontend_medihana.git
cd frontend_medihana
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Ejecutar el proyecto

```bash
npm run dev
```

### 4️⃣ Abrir en el navegador

```txt
http://localhost:5173/
```

---

## 🔄 Flujo de trabajo con Git

```bash
git checkout -b feature/nombre-funcionalidad
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nombre-funcionalidad
```

---

## 🚀 Futuras mejoras

* Conexión con backend.
* Base de datos real.
* Login con autenticación.
* Roles de usuario.
* Formularios funcionales para crear, editar y eliminar registros.
* Calendario de citas.
* Reportes con gráficos.
* Exportación de reportes en PDF o Excel.
* Validaciones avanzadas en formularios.
* Modo oscuro.
* Diseño responsive mejorado para celulares.

---

## 👥 Equipo

Proyecto académico desarrollado para el curso **Lenguajes de Programación**.

---

## 📌 Estado del proyecto

🚧 En desarrollo activo.

