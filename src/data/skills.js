// src/data/skills.js
import { markRaw } from 'vue';
import { Code as CodeIcon, Settings as SettingsIcon } from '@vicons/carbon';
import { Server as ServerIcon } from '@vicons/tabler';

export default [
    {
        title: 'Frontend',
        color: '#41b883',
        icon: markRaw(CodeIcon),
        skills: [
            { name: 'HTML', description: 'Estructura sólida de páginas web con HTML5 y elementos semánticos.' },
            { name: 'CSS', description: 'Diseño responsivo y animaciones con CSS3 y Flexbox/Grid.' },
            { name: 'VueJS', description: 'Desarrollo de SPAs y componentes reactivos con Vue 3 y Composition API.' },
            { name: 'JavaScript', description: 'Programación frontend con ES6+, manipulación del DOM y AJAX.' },
            { name: 'Bootstrap', description: 'Diseño responsive utilizando componentes predefinidos y grid system.' },
            { name: 'Naive-UI', description: 'Implementación de interfaces elegantes con componentes Vue de alta calidad.' }
        ]
    },
    {
        title: 'Backend',
        color: '#ff2d20',
        icon: markRaw(ServerIcon),
        skills: [
            { name: 'PHP', description: 'Desarrollo backend con PHP 8, POO y patrones de diseño.' },
            { name: 'Laravel', description: 'Creación de APIs RESTful, autenticación y modelos con Eloquent ORM.' },
            { name: 'MySQL', description: 'Diseño de bases de datos relacionales, consultas complejas y optimización.' }
        ]
    },
    {
        title: 'Herramientas',
        color: '#f37c23',
        icon: markRaw(SettingsIcon),
        skills: [
            { name: 'Git', description: 'Control de versiones, trabajo colaborativo y gestión de ramas.' },
            { name: 'GitLab', description: 'CI/CD, gestión de proyectos e integración continua.' },
            { name: 'Docker', description: 'Contenerización de aplicaciones y entornos de desarrollo.' },
            { name: 'WordPress', description: 'Desarrollo de temas personalizados y plugins.' },
            { name: 'Kanban', description: 'Metodología ágil para gestión de proyectos y flujo de trabajo.' }
        ]
    }
];
