import { Decision } from './Decision.js';
import { Option } from './Option.js';

// --- ESCENARIO 1 DE SCRUM (NeoBank - 10 Decisiones) ---
const scrumScenario1 = [
    new Decision("Día 1: Planificación", "El Product Owner no está seguro de las prioridades."),
    new Decision("Día 2: Desarrollo", "Un desarrollador junior introduce un bug crítico."),
    new Decision("Día 3: Revisión", "El equipo descubre que un requisito se entendió mal."),
    new Decision("Día 4: Retrospectiva", "El equipo está desmotivado por la carga de trabajo."),
    new Decision("Día 5: Planificación del Sprint 2", "El cliente quiere añadir más funcionalidades."),
    new Decision("Día 6: Desarrollo", "Un miembro clave del equipo se enferma."),
    new Decision("Día 7: Revisión", "El cliente solicita cambios de último minuto."),
    new Decision("Día 8: Retrospectiva", "El equipo tiene conflictos internos."),
    new Decision("Día 9: Preparación para el Lanzamiento", "Se descubre un problema de rendimiento."),
    new Decision("Día 10: Lanzamiento", "El cliente quiere una demostración anticipada."),
];

// Opciones para Día 1 - CORREGIDO (costos y calidad)
scrumScenario1[0].addOption(new Option("Ignorar y seguir con el plan", "El equipo trabaja en tareas incorrectas.", -5, -3, -15, -5));
scrumScenario1[0].addOption(new Option("Detener todo y re-planificar", "Se pierde medio día, pero las prioridades quedan claras.", -5, -5, +10, +5));

// Opciones para Día 2 - CORREGIDO
scrumScenario1[1].addOption(new Option("Dejar que el junior lo arregle solo", "Tarda 2 días, la motivación cae.", -10, -2, -20, -10));
scrumScenario1[1].addOption(new Option("Asignar un senior para 'pair programming'", "Se resuelve en medio día.", -5, -4, +10, +5));

// Opciones para Día 3 - CORREGIDO
scrumScenario1[2].addOption(new Option("Continuar y arreglar en la siguiente iteración", "El cliente se molesta por el retraso.", -10, -3, -15, -5));
scrumScenario1[2].addOption(new Option("Pausar y corregir inmediatamente", "Se pierde tiempo, pero el cliente está satisfecho.", -10, -6, +15, +5));

// Opciones para Día 4 - CORREGIDO
scrumScenario1[3].addOption(new Option("Ignorar la desmotivación", "La productividad sigue bajando.", -10, -2, -10, -10));
scrumScenario1[3].addOption(new Option("Organizar una actividad de equipo", "El equipo se siente valorado y mejora su rendimiento.", -5, -8, +5, +10));

// Opciones para Día 5 - CORREGIDO
scrumScenario1[4].addOption(new Option("Aceptar todas las nuevas funcionalidades", "El alcance se expande y el equipo se estresa.", -15, -12, -20, -10));
scrumScenario1[4].addOption(new Option("Negociar y priorizar", "Se mantiene el enfoque en lo esencial.", -5, -4, +10, +5));

// Opciones para Día 6 - CORREGIDO
scrumScenario1[5].addOption(new Option("Redistribuir tareas entre el equipo", "El equipo se adapta y cumple con los plazos.", -5, -3, +8, +5));
scrumScenario1[5].addOption(new Option("No hacer cambios", "El progreso se ralentiza significativamente.", -10, -5, -12, -5));

// Opciones para Día 7 - CORREGIDO
scrumScenario1[6].addOption(new Option("Aceptar los cambios sin cuestionar", "El equipo se sobrecarga y la calidad baja.", -15, -10, -18, -10));
scrumScenario1[6].addOption(new Option("Evaluar y planificar cuidadosamente", "El equipo maneja los cambios de manera efectiva.", -5, -6, +12, +5));

// Opciones para Día 8 - CORREGIDO
scrumScenario1[7].addOption(new Option("Ignorar los conflictos", "Los problemas se agravan y afectan al rendimiento.", -10, -3, -15, -10));
scrumScenario1[7].addOption(new Option("Facilitar una sesión de resolución de conflictos", "El equipo mejora su comunicación y colaboración.", -5, -7, +10, +10));

// Opciones para Día 9 - CORREGIDO
scrumScenario1[8].addOption(new Option("Lanzar de todos modos", "El rendimiento deficiente afecta la experiencia del usuario.", -15, -5, -25, -10));
scrumScenario1[8].addOption(new Option("Postergar el lanzamiento para solucionar el problema", "El cliente aprecia la calidad sobre la rapidez.", -10, -12, +15, +5));

// Opciones para Día 10 - CORREGIDO
scrumScenario1[9].addOption(new Option("Hacer la demostración anticipada", "El equipo se estresa y la calidad baja.", -10, -8, -15, -5));
scrumScenario1[9].addOption(new Option("Negociar una fecha adecuada", "El equipo se prepara bien y la demostración es un éxito.", -5, -4, +12, +10));

// --- ESCENARIO 2 DE SCRUM (PixelStore - 10 Decisiones) ---
const scrumScenario2 = [
    new Decision("Día 1: Inicio del Proyecto", "El cliente quiere añadir un 'feature' de último minuto."),
    new Decision("Día 2: Diseño UI/UX", "El diseñador propone un diseño muy complejo."),
    new Decision("Día 3: Desarrollo Frontend", "Problemas de compatibilidad entre navegadores."),
    new Decision("Día 4: Integración Backend", "La API de pagos tiene documentación pobre."),
    new Decision("Día 5: Revisión Sprint 1", "El cliente quiere cambios mayores en el diseño."),
    new Decision("Día 6: Desarrollo de Carrito", "Problemas con el cálculo de impuestos."),
    new Decision("Día 7: Testing", "Se descubren múltiples bugs críticos."),
    new Decision("Día 8: Optimización", "El sitio es lento en dispositivos móviles."),
    new Decision("Día 9: Preparación Lanzamiento", "Problemas con el certificado SSL."),
    new Decision("Día 10: Lanzamiento", "Alta demanda satura los servidores."),
];

// Opciones para PixelStore - CORREGIDO
scrumScenario2[0].addOption(new Option("Rechazarlo (proteger al equipo)", "El equipo está feliz, el cliente molesto.", 0, -2, +5, +10));
scrumScenario2[0].addOption(new Option("Aceptarlo (complacer al cliente)", "El equipo se estresa y la calidad baja.", 0, -8, -20, -10));

scrumScenario2[1].addOption(new Option("Aprobar diseño complejo", "UX excelente pero desarrollo más lento.", -10, -12, +18, -5));
scrumScenario2[1].addOption(new Option("Simplificar el diseño", "Desarrollo rápido pero UX básico.", -5, -5, +8, +5));

scrumScenario2[2].addOption(new Option("Usar polyfills para compatibilidad", "Funciona en todos los navegadores.", -8, -8, +15, 0));
scrumScenario2[2].addOption(new Option("Solo soportar navegadores modernos", "Desarrollo más rápido pero menos usuarios.", -3, -3, -10, +3));

scrumScenario2[3].addOption(new Option("Cambiar a otra API de pagos", "Pérdida de tiempo pero mejor documentación.", -12, -10, +12, -8));
scrumScenario2[3].addOption(new Option("Investigar y experimentar", "Riesgo alto pero se mantiene la API.", -15, -6, -5, -5));

scrumScenario2[4].addOption(new Option("Implementar todos los cambios", "Cliente feliz pero equipo sobrecargado.", -20, -15, -15, -15));
scrumScenario2[4].addOption(new Option("Negociar cambios prioritarios", "Balance entre satisfacción y capacidad.", -8, -8, +10, +5));

scrumScenario2[5].addOption(new Option("Implementar cálculo manual", "Más control pero más código.", -10, -7, +15, 0));
scrumScenario2[5].addOption(new Option("Usar servicio externo", "Menos desarrollo pero dependencia externa.", -5, -12, +10, +3));

scrumScenario2[6].addOption(new Option("Parar desarrollo para arreglar bugs", "Calidad mejorada pero tiempo perdido.", -15, -10, +25, -5));
scrumScenario2[6].addOption(new Option("Arreglar solo bugs críticos", "Riesgo controlado y progreso continuo.", -8, -6, +12, +5));

scrumScenario2[7].addOption(new Option("Reescribir componentes críticos", "Mejor performance pero mucho trabajo.", -12, -15, +18, -8));
scrumScenario2[7].addOption(new Option("Optimizaciones incrementales", "Mejora gradual y sostenible.", -6, -8, +10, +3));

scrumScenario2[8].addOption(new Option("Posponer lanzamiento", "Seguridad garantizada pero cliente impaciente.", -10, -8, +18, -10));
scrumScenario2[8].addOption(new Option("Usar solución temporal", "Lanzamiento a tiempo pero riesgo seguridad.", -3, -4, -15, +5));

scrumScenario2[9].addOption(new Option("Escalar servidores automáticamente", "Costo mayor pero buen performance.", 0, -20, +12, +10));
scrumScenario2[9].addOption(new Option("Optimizar código existente", "Menor costo pero riesgo de lentitud.", -8, -6, +10, +5));

// --- ESCENARIO 3 DE SCRUM (HealthTrack Pro - 10 Decisiones) ---
const scrumScenario3 = [
    new Decision("Día 1: Planificación", "Requisitos médicos complejos y confusos."),
    new Decision("Día 2: Desarrollo", "Problemas con la integración de wearables."),
    new Decision("Día 3: Diseño UX", "Diseño debe ser accesible para adultos mayores."),
    new Decision("Día 4: Seguridad", "Preocupaciones sobre privacidad de datos médicos."),
    new Decision("Día 5: Testing", "Problemas con la precisión de métricas de salud."),
    new Decision("Día 6: Desarrollo", "Compatibilidad con múltiples dispositivos médicos."),
    new Decision("Día 7: Revisión", "Feedback de profesionales médicos."),
    new Decision("Día 8: Performance", "La app consume mucha batería."),
    new Decision("Día 9: Certificación", "Requisitos regulatorios médicos."),
    new Decision("Día 10: Lanzamiento", "Preparación para lanzamiento en app stores."),
];

// Opciones para HealthTrack Pro - CORREGIDO
scrumScenario3[0].addOption(new Option("Contratar consultor médico", "Requisitos claros pero costo alto.", -5, -15, +20, +5));
scrumScenario3[0].addOption(new Option("Investigar documentación médica", "Más tiempo pero menos costo.", -10, -5, +15, 0));

scrumScenario3[1].addOption(new Option("Desarrollar drivers personalizados", "Mejor integración pero más trabajo.", -15, -12, +18, -5));
scrumScenario3[1].addOption(new Option("Usar SDKs existentes", "Integración más rápida pero limitada.", -8, -8, +10, +3));

scrumScenario3[2].addOption(new Option("Testeo con usuarios reales", "UX excelente pero proceso lento.", -12, -10, +22, +5));
scrumScenario3[2].addOption(new Option("Seguir guidelines estándar", "Desarrollo rápido pero UX genérico.", -6, -4, +10, +5));

scrumScenario3[3].addOption(new Option("Implementar encriptación avanzada", "Máxima seguridad pero complejidad.", -10, -12, +20, 0));
scrumScenario3[3].addOption(new Option("Seguir estándares básicos", "Seguridad adecuada y desarrollo ágil.", -5, -6, +12, +5));

scrumScenario3[4].addOption(new Option("Calibrar con equipos médicos", "Precisión excelente pero tiempo extra.", -12, -15, +25, -3));
scrumScenario3[4].addOption(new Option("Usar algoritmos estándar", "Precisión aceptable y desarrollo rápido.", -5, -5, +12, +5));

scrumScenario3[5].addOption(new Option("Desarrollar adaptadores múltiples", "Máxima compatibilidad.", -18, -18, +20, -8));
scrumScenario3[5].addOption(new Option("Soportar dispositivos principales", "Compatibilidad razonable.", -8, -8, +12, +3));

scrumScenario3[6].addOption(new Option("Implementar todas las sugerencias", "Validación médica completa.", -15, -12, +25, -5));
scrumScenario3[6].addOption(new Option("Priorizar sugerencias críticas", "Balance entre feedback y progreso.", -7, -7, +15, +5));

scrumScenario3[7].addOption(new Option("Reescribir componentes de monitoreo", "Eficiencia máxima.", -14, -10, +20, -5));
scrumScenario3[7].addOption(new Option("Optimizaciones de batería", "Mejora significativa.", -8, -6, +12, +3));

scrumScenario3[8].addOption(new Option("Buscar certificación completa", "Máxima credibilidad pero proceso largo.", -20, -25, +30, -10));
scrumScenario3[8].addOption(new Option("Cumplir requisitos mínimos", "Lanzamiento más rápido.", -8, -10, +15, +5));

scrumScenario3[9].addOption(new Option("Proceso de review extensivo", "Lanzamiento perfecto pero lento.", -12, -8, +22, -3));
scrumScenario3[9].addOption(new Option("Lanzamiento rápido con updates", "Time to market rápido.", -5, -4, +12, +8));

// --- ESCENARIO 4 DE SCRUM (EduLearn Platform - 10 Decisiones) ---
const scrumScenario4 = [
    new Decision("Día 1: Arquitectura", "Elección entre plataforma web o app nativa."),
    new Decision("Día 2: Contenido", "Problemas con formatos de video diversos."),
    new Decision("Día 3: Evaluación", "Sistema de quizzes y calificaciones."),
    new Decision("Día 4: Colaboración", "Herramientas de trabajo en grupo."),
    new Decision("Día 5: Mobile", "Experiencia en dispositivos móviles."),
    new Decision("Día 6: Analytics", "Seguimiento del progreso estudiantil."),
    new Decision("Día 7: Accesibilidad", "Compatibilidad con diferentes necesidades."),
    new Decision("Día 8: Escalabilidad", "Preparación para muchos usuarios."),
    new Decision("Día 9: Integración", "Con sistemas educativos existentes."),
    new Decision("Día 10: Lanzamiento", "Rollout a instituciones educativas."),
];

// Opciones para EduLearn Platform - CORREGIDO
scrumScenario4[0].addOption(new Option("Plataforma web responsive", "Mayor alcance, desarrollo más simple.", -8, -8, +15, +5));
scrumScenario4[0].addOption(new Option("App nativa + web", "Mejor experiencia pero más trabajo.", -15, -18, +22, -5));

scrumScenario4[1].addOption(new Option("Convertir todos los videos", "Consistencia pero proceso lento.", -12, -10, +18, -3));
scrumScenario4[1].addOption(new Option("Soportar múltiples formatos", "Flexibilidad y desarrollo rápido.", -6, -5, +12, +5));

scrumScenario4[2].addOption(new Option("Sistema de evaluación avanzado", "Funcionalidades ricas pero complejas.", -14, -12, +20, -5));
scrumScenario4[2].addOption(new Option("Sistema básico de quizzes", "Funcionalidad esencial y ágil.", -7, -6, +12, +5));

scrumScenario4[3].addOption(new Option("Herramientas colaborativas completas", "Valor educativo alto.", -12, -10, +18, +3));
scrumScenario4[3].addOption(new Option("Funcionalidades básicas de grupo", "Balance entre valor y esfuerzo.", -6, -5, +12, +5));

scrumScenario4[4].addOption(new Option("App móvil nativa", "Experencia móvil excelente.", -10, -15, +18, 0));
scrumScenario4[4].addOption(new Option("Web app móvil optimizada", "Desarrollo más eficiente.", -6, -8, +12, +5));

scrumScenario4[5].addOption(new Option("Dashboard analytics completo", "Insights detallados.", -12, -10, +18, +3));
scrumScenario4[5].addOption(new Option("Métricas básicas de progreso", "Funcionalidad esencial.", -5, -4, +12, +5));

scrumScenario4[6].addOption(new Option("Accesibilidad completa WCAG", "Inclusividad máxima.", -15, -12, +25, -3));
scrumScenario4[6].addOption(new Option("Accesibilidad básica", "Cumplimiento razonable.", -7, -6, +15, +5));

scrumScenario4[7].addOption(new Option("Arquitectura microservicios", "Escalabilidad excelente.", -18, -20, +22, -8));
scrumScenario4[7].addOption(new Option("Arquitectura monolítica optimizada", "Balance entre escalabilidad y desarrollo.", -8, -10, +15, +5));

scrumScenario4[8].addOption(new Option("Integraciones profundas", "Ecosistema educativo completo.", -14, -15, +20, -3));
scrumScenario4[8].addOption(new Option("Integraciones básicas", "Funcionalidad esencial.", -6, -7, +12, +5));

scrumScenario4[9].addOption(new Option("Lanzamiento gradual por instituciones", "Rollout controlado.", -8, -6, +18, +5));
scrumScenario4[9].addOption(new Option("Lanzamiento masivo", "Alcance máximo con más riesgo.", -4, -3, +10, +8));

// --- ESCENARIO 5 DE SCRUM (SmartHome Control - 10 Decisiones) ---
const scrumScenario5 = [
    new Decision("Día 1: Protocolos", "Compatibilidad con múltiples estándares IoT."),
    new Decision("Día 2: Seguridad", "Protección contra hackeos domésticos."),
    new Decision("Día 3: Interfaz", "Diseño para control fácil desde móvil."),
    new Decision("Día 4: Automatización", "Sistema de reglas y escenas."),
    new Decision("Día 5: Integración", "Con asistentes de voz (Alexa, Google)."),
    new Decision("Día 6: Performance", "Respuesta en tiempo real de dispositivos."),
    new Decision("Día 7: Confiabilidad", "Manejo de desconexiones de red."),
    new Decision("Día 8: Actualizaciones", "Sistema OTA para dispositivos."),
    new Decision("Día 9: Compatibilidad", "Con marcas populares de smart home."),
    new Decision("Día 10: Lanzamiento", "Estrategia de go-to-market."),
];

// Opciones para SmartHome Control - CORREGIDO
scrumScenario5[0].addOption(new Option("Soportar todos los protocolos", "Máxima compatibilidad.", -20, -18, +22, -10));
scrumScenario5[0].addOption(new Option("Protocolos principales + extensible", "Balance razonable.", -10, -10, +15, +5));

scrumScenario5[1].addOption(new Option("Encriptación end-to-end", "Seguridad máxima.", -12, -10, +20, -3));
scrumScenario5[1].addOption(new Option("Seguridad estándar industria", "Protección adecuada.", -6, -5, +12, +5));

scrumScenario5[2].addOption(new Option("UI personalizable avanzada", "Flexibilidad máxima.", -14, -8, +18, +3));
scrumScenario5[2].addOption(new Option("UI intuitiva estándar", "Usabilidad buena y desarrollo ágil.", -7, -4, +12, +5));

scrumScenario5[3].addOption(new Option("Sistema de automatización complejo", "Funcionalidades avanzadas.", -16, -12, +21, -5));
scrumScenario5[3].addOption(new Option("Automatizaciones básicas", "Funcionalidad esencial.", -8, -6, +13, +5));

scrumScenario5[4].addOption(new Option("Integración nativa con todos", "Experencia seamless.", -15, -15, +20, -5));
scrumScenario5[4].addOption(new Option("Integración con principales", "Cobertura amplia.", -9, -8, +15, +3));

scrumScenario5[5].addOption(new Option("Arquitectura en tiempo real", "Respuesta instantánea.", -12, -10, +18, -3));
scrumScenario5[5].addOption(new Option("Arquitectura near-real-time", "Balance performance/desarrollo.", -7, -6, +12, +5));

scrumScenario5[6].addOption(new Option("Sistema de fallback completo", "Confiabilidad máxima.", -14, -8, +20, +3));
scrumScenario5[6].addOption(new Option("Manejo básico de desconexiones", "Confiabilidad aceptable.", -6, -4, +12, +5));

scrumScenario5[7].addOption(new Option("Sistema OTA robusto", "Actualizaciones seguras.", -11, -8, +17, +2));
scrumScenario5[7].addOption(new Option("Actualizaciones manuales", "Más simple pero menos conveniente.", -4, -3, +10, +5));

scrumScenario5[8].addOption(new Option("Certificación con todas las marcas", "Ecosistema completo.", -18, -20, +25, -8));
scrumScenario5[8].addOption(new Option("Compatibilidad con marcas líderes", "Cobertura del 80% del mercado.", -10, -12, +17, +5));

scrumScenario5[9].addOption(new Option("Lanzamiento con socios estratégicos", "Alcance controlado y calidad.", -8, -10, +18, +5));
scrumScenario5[9].addOption(new Option("Lanzamiento abierto al público", "Crecimiento rápido pero más soporte.", -5, -6, +12, +8));

// --- ESCENARIO 1 DE PMBOK (Infraestructura TI - 10 Decisiones) ---
const pmbokScenario1 = [
    new Decision("Fase 1: Inicio - Stakeholders", "Identificación de stakeholders clave del proyecto."),
    new Decision("Fase 2: Planificación - Alcance", "Definición detallada del alcance del proyecto."),
    new Decision("Fase 3: Planificación - Cronograma", "Desarrollo del cronograma del proyecto."),
    new Decision("Fase 4: Planificación - Presupuesto", "Estimación de costos y presupuesto."),
    new Decision("Fase 5: Ejecución - Recursos", "Gestión del equipo y recursos del proyecto."),
    new Decision("Fase 6: Ejecución - Calidad", "Aseguramiento de la calidad del trabajo."),
    new Decision("Fase 7: Monitoreo - Riesgos", "Identificación y gestión de riesgos."),
    new Decision("Fase 8: Monitoreo - Cambios", "Gestión de solicitudes de cambio."),
    new Decision("Fase 9: Monitoreo - Comunicación", "Comunicación con stakeholders."),
    new Decision("Fase 10: Cierre - Lecciones", "Cierre formal y lecciones aprendidas."),
];

// Opciones para PMBOK Escenario 1 - CORREGIDO
pmbokScenario1[0].addOption(new Option("Análisis formal de stakeholders", "Identificación completa pero consume tiempo.", -8, -3, +8, -5));
pmbokScenario1[0].addOption(new Option("Lista básica de stakeholders", "Rápido pero puede omitir actores clave.", -3, 0, -5, +3));

pmbokScenario1[1].addOption(new Option("EDT detallada con validación", "Alcance claro pero proceso largo.", -10, -4, +10, -3));
pmbokScenario1[1].addOption(new Option("EDT de alto nivel", "Ágil pero puede generar ambigüedades.", -5, -1, -8, +2));

pmbokScenario1[2].addOption(new Option("Plan detallado con ruta crítica", "Cronograma robusto pero inflexible.", -12, -5, +9, -5));
pmbokScenario1[2].addOption(new Option("Cronograma de hitos principales", "Flexible pero menos predictivo.", -6, -2, -6, +1));

pmbokScenario1[3].addOption(new Option("Estimación bottom-up detallada", "Presupuesto preciso pero lento.", -8, -6, +8, -4));
pmbokScenario1[3].addOption(new Option("Estimación por analogía", "Rápido pero menos preciso.", -4, -2, -7, +2));

pmbokScenario1[4].addOption(new Option("Plan de recursos formal", "Gestión óptima pero burocrática.", -7, -4, +7, -5));
pmbokScenario1[4].addOption(new Option("Asignación ágil de recursos", "Flexible pero puede generar conflictos.", -3, -1, -8, +3));

pmbokScenario1[5].addOption(new Option("Proceso de calidad formal", "Alta calidad pero costoso.", -9, -7, +12, -8));
pmbokScenario1[5].addOption(new Option("Revisiones puntuales de calidad", "Balance costo-calidad.", -5, -3, -5, +1));

pmbokScenario1[6].addOption(new Option("Análisis de riesgos cuantitativo", "Gestión robusta de riesgos.", -10, -5, +10, -7));
pmbokScenario1[6].addOption(new Option("Identificación cualitativa de riesgos", "Rápido y suficiente para riesgos clave.", -5, -2, -8, +2));

pmbokScenario1[7].addOption(new Option("Comité de control de cambios formal", "Cambios controlados pero lento.", -8, -4, +9, -6));
pmbokScenario1[7].addOption(new Option("Proceso ágil de cambios", "Respuesta rápida pero menos control.", -4, -1, -10, +4));

pmbokScenario1[8].addOption(new Option("Plan de comunicación estructurado", "Comunicación completa pero rígida.", -7, -3, +8, -5));
pmbokScenario1[8].addOption(new Option("Comunicación ad-hoc según necesidad", "Flexible pero puede haber omisiones.", -3, 0, -7, +4));

pmbokScenario1[9].addOption(new Option("Cierre formal con documentación completa", "Lecciones bien documentadas.", -6, -4, +10, -4));
pmbokScenario1[9].addOption(new Option("Cierre ágil con retrospectiva", "Rápido pero menos documentado.", -3, -1, -8, +5));


// --- ESCENARIO 2 DE PMBOK (Construcción - 10 Decisiones) ---
const pmbokScenario2 = [
    new Decision("Fase 1: Estudio de Factibilidad", "Evaluación de viabilidad del proyecto de construcción."),
    new Decision("Fase 2: Diseño Conceptual", "Desarrollo del diseño arquitectónico."),
    new Decision("Fase 3: Planificación de Construcción", "Secuenciación de actividades de obra."),
    new Decision("Fase 4: Adquisiciones", "Selección de contratistas y proveedores."),
    new Decision("Fase 5: Ejecución - Obra Civil", "Gestión de la fase de construcción."),
    new Decision("Fase 6: Control de Calidad Obra", "Inspecciones y control de calidad en sitio."),
    new Decision("Fase 7: Gestión de Seguridad", "Protocolos de seguridad en obra."),
    new Decision("Fase 8: Control de Avances", "Seguimiento del progreso físico."),
    new Decision("Fase 9: Pruebas y Comisionamiento", "Pruebas de sistemas e instalaciones."),
    new Decision("Fase 10: Entrega al Cliente", "Proceso de entrega y recepción final."),
];

// Opciones para PMBOK Escenario 2 - CORREGIDO CON VALORES NEGATIVOS
pmbokScenario2[0].addOption(new Option("Estudio de factibilidad completo", "Viabilidad bien evaluada.", -10, -8, +12, -6));
pmbokScenario2[0].addOption(new Option("Evaluación rápida de viabilidad", "Ágil pero puede pasar por alto riesgos.", -5, -3, -8, +4));

pmbokScenario2[1].addOption(new Option("Diseño detallado con múltiples revisiones", "Diseño optimizado.", -12, -10, +15, -8));
pmbokScenario2[1].addOption(new Option("Diseño conceptual con ajustes posteriores", "Flexible durante construcción.", -7, -5, -10, +5));

pmbokScenario2[2].addOption(new Option("Plan de obra detallado con método crítico", "Secuencia óptima de trabajo.", -14, -6, +12, -7));
pmbokScenario2[2].addOption(new Option("Plan de hitos principales", "Adaptable a imprevistos.", -8, -3, -9, +4));

pmbokScenario2[3].addOption(new Option("Licitación formal con evaluación exhaustiva", "Mejores contratistas.", -9, -7, +14, -6));
pmbokScenario2[3].addOption(new Option("Selección ágil basada en referencias", "Rápido pero mayor riesgo.", -5, -4, -8, +5));

pmbokScenario2[4].addOption(new Option("Supervisión constante en obra", "Calidad y cumplimiento asegurados.", -11, -9, +16, -9));
pmbokScenario2[4].addOption(new Option("Supervisión por hitos", "Menos costoso pero menos control.", -6, -4, -10, +4));

pmbokScenario2[5].addOption(new Option("Inspecciones diarias de calidad", "Calidad excelente.", -13, -8, +18, -10));
pmbokScenario2[5].addOption(new Option("Inspecciones semanales", "Balance entre calidad y costo.", -7, -4, -12, +3));

pmbokScenario2[6].addOption(new Option("Plan de seguridad exhaustivo", "Máxima seguridad.", -10, -7, +13, -7));
pmbokScenario2[6].addOption(new Option("Protocolos básicos de seguridad", "Cumplimiento mínimo.", -5, -3, -9, +5));

pmbokScenario2[7].addOption(new Option("Seguimiento diario con reportes", "Control preciso del avance.", -9, -5, +11, -6));
pmbokScenario2[7].addOption(new Option("Seguimiento semanal", "Menos carga administrativa.", -4, -2, -8, +5));

pmbokScenario2[8].addOption(new Option("Pruebas exhaustivas de todos los sistemas", "Funcionamiento garantizado.", -11, -8, +15, -8));
pmbokScenario2[8].addOption(new Option("Pruebas de funcionamiento básico", "Rápido pero puede haber issues.", -6, -4, -10, +4));

pmbokScenario2[9].addOption(new Option("Entrega formal con documentación completa", "Cliente satisfecho y protegido.", -8, -6, +14, -7));
pmbokScenario2[9].addOption(new Option("Entrega ágil con garantías", "Rápido pero menos documentado.", -4, -2, -9, +6));

// --- ESCENARIO 3 DE PMBOK (Desarrollo Software - 10 Decisiones) ---
const pmbokScenario3 = [
    new Decision("Fase 1: Requerimientos", "Recolección y análisis de requerimientos."),
    new Decision("Fase 2: Diseño de Arquitectura", "Definición de la arquitectura del sistema."),
    new Decision("Fase 3: Planificación de Desarrollo", "Estimación y asignación de tareas."),
    new Decision("Fase 4: Gestión de Configuración", "Control de versiones y entornos."),
    new Decision("Fase 5: Desarrollo - Código", "Supervisión del desarrollo de código."),
    new Decision("Fase 6: Pruebas - QA", "Gestión del proceso de testing."),
    new Decision("Fase 7: Implementación", "Despliegue en ambientes productivos."),
    new Decision("Fase 8: Capacitación Usuarios", "Entrenamiento a usuarios finales."),
    new Decision("Fase 9: Soporte Post-Implementación", "Soporte después del lanzamiento."),
    new Decision("Fase 10: Cierre Proyecto", "Evaluación final y cierre."),
];

// Opciones para PMBOK Escenario 3 - CORREGIDO CON VALORES NEGATIVOS
pmbokScenario3[0].addOption(new Option("Especificación formal de requerimientos", "Requerimientos claros y completos.", -12, -8, +15, -7));
pmbokScenario3[0].addOption(new Option("Requerimientos ágiles con historias de usuario", "Flexible para cambios.", -6, -4, -10, +5));

pmbokScenario3[1].addOption(new Option("Arquitectura enterprise con patrones", "Sistema escalable y mantenible.", -15, -10, +18, -9));
pmbokScenario3[1].addOption(new Option("Arquitectura práctica y funcional", "Rápida implementación.", -8, -5, -12, +4));

pmbokScenario3[2].addOption(new Option("Plan detallado con estimación三点", "Preciso en estimaciones.", -11, -6, +13, -6));
pmbokScenario3[2].addOption(new Option("Plan ágil con sprints", "Adaptable a cambios.", -5, -3, -9, +6));

pmbokScenario3[3].addOption(new Option("Gestión de configuración enterprise", "Control total de versiones.", -9, -7, +14, -5));
pmbokScenario3[3].addOption(new Option("Control de versiones básico", "Suficiente para proyectos pequeños.", -4, -2, -8, +5));

pmbokScenario3[4].addOption(new Option("Revisiones de código formales", "Alta calidad de código.", -13, -8, +16, -8));
pmbokScenario3[4].addOption(new Option("Revisiones de código por pares", "Balance calidad-velocidad.", -7, -4, -10, +4));

pmbokScenario3[5].addOption(new Option("Suite de pruebas automatizada completa", "Calidad garantizada.", -14, -9, +19, -10));
pmbokScenario3[5].addOption(new Option("Pruebas manuales focalizadas", "Rápido y efectivo.", -8, -5, -12, +3));

pmbokScenario3[6].addOption(new Option("Implementación gradual con rollback", "Mínimo riesgo.", -10, -7, +15, -7));
pmbokScenario3[6].addOption(new Option("Implementación big-bang", "Rápido pero riesgoso.", -5, -3, -11, +5));

pmbokScenario3[7].addOption(new Option("Programa de capacitación formal", "Usuarios bien preparados.", -8, -6, +13, -6));
pmbokScenario3[7].addOption(new Option("Capacitación on-the-job", "Rápido y contextual.", -4, -2, -9, +6));

pmbokScenario3[8].addOption(new Option("Soporte dedicado post-implementación", "Alta satisfacción del cliente.", -9, -8, +16, -8));
pmbokScenario3[8].addOption(new Option("Soporte básico con documentación", "Balance costo-beneficio.", -5, -3, -10, +5));

pmbokScenario3[9].addOption(new Option("Cierre formal con medición de ROI", "Evaluación completa del proyecto.", -7, -5, +14, -7));
pmbokScenario3[9].addOption(new Option("Cierre ágil con lecciones aprendidas", "Rápido pero menos métricas.", -3, -1, -8, +6));

// --- ESCENARIO 4 DE PMBOK (Marketing - 10 Decisiones) ---
const pmbokScenario4 = [
    new Decision("Fase 1: Investigación de Mercado", "Análisis del mercado objetivo."),
    new Decision("Fase 2: Estrategia de Marca", "Desarrollo de posicionamiento."),
    new Decision("Fase 3: Plan de Medios", "Selección de canales de marketing."),
    new Decision("Fase 4: Desarrollo de Contenido", "Creación de material promocional."),
    new Decision("Fase 5: Campaña Digital", "Ejecución de campañas online."),
    new Decision("Fase 6: Métricas y Analytics", "Seguimiento de resultados."),
    new Decision("Fase 7: Ajuste de Estrategia", "Optimización basada en datos."),
    new Decision("Fase 8: Relaciones Públicas", "Gestión de imagen corporativa."),
    new Decision("Fase 9: Fidelización de Clientes", "Programas de retención."),
    new Decision("Fase 10: Evaluación de Campaña", "Medición de efectividad final."),
];

// Opciones para PMBOK Escenario 4 - CORREGIDO CON VALORES NEGATIVOS
pmbokScenario4[0].addOption(new Option("Investigación de mercado exhaustiva", "Datos confiables para decisiones.", -10, -8, +14, -6));
pmbokScenario4[0].addOption(new Option("Análisis rápido de tendencias", "Rápido y suficiente para acciones inmediatas.", -5, -3, -9, +5));

pmbokScenario4[1].addOption(new Option("Estrategia de marca completa", "Posicionamiento sólido.", -12, -9, +16, -8));
pmbokScenario4[1].addOption(new Option("Posicionamiento básico claro", "Suficiente para lanzamiento.", -6, -4, -10, +4));

pmbokScenario4[2].addOption(new Option("Mix de medios integrado", "Alcance máximo.", -14, -12, +15, -9));
pmbokScenario4[2].addOption(new Option("Enfoque en canales digitales", "Costo-efectivo.", -8, -6, -11, +3));

pmbokScenario4[3].addOption(new Option("Contenido profesional con agencia", "Calidad premium.", -11, -10, +18, -7));
pmbokScenario4[3].addOption(new Option("Contenido interno optimizado", "Balance calidad-costo.", -6, -4, -12, +4));

pmbokScenario4[4].addOption(new Option("Campaña multicanal integrada", "Impacto máximo.", -13, -11, +19, -8));
pmbokScenario4[4].addOption(new Option("Campaña focalizada en redes", "Alto engagement.", -7, -5, -13, +5));

pmbokScenario4[5].addOption(new Option("Sistema de analytics enterprise", "Datos detallados para optimización.", -9, -8, +16, -6));
pmbokScenario4[5].addOption(new Option("Métricas básicas de desempeño", "Suficiente para decisiones clave.", -4, -2, -9, +6));

pmbokScenario4[6].addOption(new Option("Optimización continua basada en datos", "Mejora constante de resultados.", -10, -7, +15, -7));
pmbokScenario4[6].addOption(new Option("Ajustes puntuales en campañas", "Respuesta rápida a problemas.", -5, -3, -10, +5));

pmbokScenario4[7].addOption(new Option("Programa de RP proactivo", "Imagen corporativa sólida.", -8, -7, +14, -6));
pmbokScenario4[7].addOption(new Option("RP reactiva según necesidades", "Balance esfuerzo-resultados.", -4, -2, -8, +6));

pmbokScenario4[8].addOption(new Option("Programa de fidelización completo", "Alta retención de clientes.", -9, -8, +18, -8));
pmbokScenario4[8].addOption(new Option("Acciones básicas de fidelización", "Costo-efectivo.", -5, -3, -11, +5));

pmbokScenario4[9].addOption(new Option("Evaluación completa con ROI detallado", "Medición precisa de resultados.", -7, -6, +16, -7));
pmbokScenario4[9].addOption(new Option("Evaluación de resultados clave", "Rápido y suficiente.", -3, -1, -9, +6));

// --- ESCENARIO 5 DE PMBOK (Investigación - 10 Decisiones) ---
const pmbokScenario5 = [
    new Decision("Fase 1: Propuesta de Investigación", "Desarrollo del protocolo de estudio."),
    new Decision("Fase 2: Revisión Ética", "Aprobación del comité de ética."),
    new Decision("Fase 3: Reclutamiento", "Selección de participantes."),
    new Decision("Fase 4: Recolección de Datos", "Ejecución del estudio de campo."),
    new Decision("Fase 5: Análisis Estadístico", "Procesamiento de datos."),
    new Decision("Fase 6: Validación de Resultados", "Verificación de hallazgos."),
    new Decision("Fase 7: Redacción de Informe", "Preparación de publicaciones."),
    new Decision("Fase 8: Revisión por Pares", "Validación científica."),
    new Decision("Fase 9: Divulgación", "Presentación de resultados."),
    new Decision("Fase 10: Cierre de Investigación", "Archivo y documentación final."),
];

// Opciones para PMBOK Escenario 5 - CORREGIDO CON VALORES NEGATIVOS
pmbokScenario5[0].addOption(new Option("Protocolo de investigación detallado", "Estudio bien fundamentado.", -12, -10, +18, -7));
pmbokScenario5[0].addOption(new Option("Protocolo ágil con hipótesis clara", "Rápido para investigación exploratoria.", -6, -4, -12, +5));

pmbokScenario5[1].addOption(new Option("Revisión ética completa", "Cumplimiento normativo total.", -10, -8, +15, -6));
pmbokScenario5[1].addOption(new Option("Revisión ética expedita", "Rápido para estudios de bajo riesgo.", -5, -3, -9, +6));

pmbokScenario5[2].addOption(new Option("Muestreo probabilístico riguroso", "Resultados generalizables.", -14, -9, +16, -8));
pmbokScenario5[2].addOption(new Option("Muestreo por conveniencia", "Rápido y económico.", -7, -4, -11, +4));

pmbokScenario5[3].addOption(new Option("Recolección de datos controlada", "Alta calidad de datos.", -15, -11, +19, -9));
pmbokScenario5[3].addOption(new Option("Recolección de datos ágil", "Balance entre calidad y velocidad.", -8, -5, -13, +3));

pmbokScenario5[4].addOption(new Option("Análisis estadístico avanzado", "Hallazgos robustos.", -13, -10, +20, -8));
pmbokScenario5[4].addOption(new Option("Análisis estadístico básico", "Suficiente para conclusiones clave.", -6, -3, -14, +5));

pmbokScenario5[5].addOption(new Option("Validación cruzada con expertos", "Resultados confiables.", -11, -8, +18, -7));
pmbokScenario5[5].addOption(new Option("Validación interna del equipo", "Rápido y consistente.", -5, -2, -11, +6));

pmbokScenario5[6].addOption(new Option("Redacción formal para publicación", "Alto impacto científico.", -12, -9, +19, -8));
pmbokScenario5[6].addOption(new Option("Informe ejecutivo con hallazgos clave", "Comunicación efectiva.", -6, -4, -12, +5));

pmbokScenario5[7].addOption(new Option("Revisión por pares externa", "Máxima credibilidad.", -10, -7, +16, -7));
pmbokScenario5[7].addOption(new Option("Revisión interna con consultores", "Balance credibilidad-velocidad.", -5, -3, -10, +6));

pmbokScenario5[8].addOption(new Option("Divulgación en conferencias internacionales", "Máximo alcance académico.", -9, -8, +18, -8));
pmbokScenario5[8].addOption(new Option("Divulgación en medios locales y digitales", "Impacto práctico inmediato.", -4, -2, -11, +6));

pmbokScenario5[9].addOption(new Option("Archivo completo con documentación", "Preservación del conocimiento.", -8, -6, +15, -7));
pmbokScenario5[9].addOption(new Option("Archivo selectivo de datos clave", "Eficiente y suficiente.", -3, -1, -9, +7));

/**
 * Función principal que tu juego llamará.
 * Obtiene los datos "pre-hechos" correctos.
 */
export function getScenarioData(metodologia, casoId) {
    if (metodologia === 'scrum') {
        if (casoId === '1') return scrumScenario1;
        if (casoId === '2') return scrumScenario2;
        if (casoId === '3') return scrumScenario3;
        if (casoId === '4') return scrumScenario4;
        if (casoId === '5') return scrumScenario5;
    }
    else{
        if (casoId === '1') return pmbokScenario1;
        if (casoId === '2') return pmbokScenario2;
        if (casoId === '3') return pmbokScenario3;
        if (casoId === '4') return pmbokScenario4;
        if (casoId === '5') return pmbokScenario5;
    }

    // Fallback por si no se encuentra
    return scrumScenario1;
}