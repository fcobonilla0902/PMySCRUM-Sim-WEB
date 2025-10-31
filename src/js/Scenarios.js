import { Decision } from './Decision.js';
import { Option } from './Option.js';

// --- ESCENARIO 1 DE SCRUM (10 Decisiones) ---
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

// Ahora "pre-hacemos" las opciones para cada decisión
// (Esto es más largo, pero es lo que pediste: todo pre-hecho)

// Opciones para Día 1
scrumScenario1[0].addOption(new Option("Ignorar y seguir con el plan", "El equipo trabaja en tareas incorrectas.", -5, 0, -10, -5, 1));
scrumScenario1[0].addOption(new Option("Detener todo y re-planificar", "Se pierde medio día, pero las prioridades quedan claras.", -5, 0, +10, +5, 0));

// Opciones para Día 2
scrumScenario1[1].addOption(new Option("Dejar que el junior lo arregle solo", "Tarda 2 días, la motivación cae.", -10, 0, -5, -10, 0));
scrumScenario1[1].addOption(new Option("Asignar un senior para 'pair programming'", "Se resuelve en medio día.", -5, 0, +5, +5, 2));

scrumScenario1[2].addOption(new Option("Continuar y arreglar en la siguiente iteración", "El cliente se molesta por el retraso.", -10, 0, -10, -5, 0));
scrumScenario1[2].addOption(new Option("Pausar y corregir inmediatamente", "Se pierde tiempo, pero el cliente está satisfecho.", -10, 0, +10, +5, 1));

scrumScenario1[3].addOption(new Option("Ignorar la desmotivación", "La productividad sigue bajando.", -10, 0, -10, -10, 0));
scrumScenario1[3].addOption(new Option("Organizar una actividad de equipo", "El equipo se siente valorado y mejora su rendimiento.", -5, 0, +10, +10, 2));

scrumScenario1[4].addOption(new Option("Aceptar todas las nuevas funcionalidades", "El alcance se expande y el equipo se estresa.", -15, 0, -10, -10, 0));
scrumScenario1[4].addOption(new Option("Negociar y priorizar", "Se mantiene el enfoque en lo esencial.", -5, 0, +10, +5, 1));

scrumScenario1[5].addOption(new Option("Redistribuir tareas entre el equipo", "El equipo se adapta y cumple con los plazos.", -5, 0, +5, +5, 2));
scrumScenario1[5].addOption(new Option("No hacer cambios", "El progreso se ralentiza significativamente.", -10, 0, -10, -5, 0));

scrumScenario1[6].addOption(new Option("Aceptar los cambios sin cuestionar", "El equipo se sobrecarga y la calidad baja.", -15, 0, -10, -10, 0));
scrumScenario1[6].addOption(new Option("Evaluar y planificar cuidadosamente", "El equipo maneja los cambios de manera efectiva.", -5, 0, +10, +5, 1));

scrumScenario1[7].addOption(new Option("Ignorar los conflictos", "Los problemas se agravan y afectan al rendimiento.", -10, 0, -10, -10, 0));
scrumScenario1[7].addOption(new Option("Facilitar una sesión de resolución de conflictos", "El equipo mejora su comunicación y colaboración.", -5, 0, +10, +10, 2));

scrumScenario1[8].addOption(new Option("Lanzar de todos modos", "El rendimiento deficiente afecta la experiencia del usuario.", -15, 0, -10, -10, 0));
scrumScenario1[8].addOption(new Option("Postergar el lanzamiento para solucionar el problema", "El cliente aprecia la calidad sobre la rapidez.", -10, 0, +10, +5, 1));

scrumScenario1[9].addOption(new Option("Hacer la demostración anticipada", "El equipo se estresa y la calidad baja.", -10, 0, -10, -5, 0));
scrumScenario1[9].addOption(new Option("Negociar una fecha adecuada", "El equipo se prepara bien y la demostración es un éxito.", -5, 0, +10, +10, 2));

// ... (y así para las 10 decisiones) ...


// --- ESCENARIO 2 DE SCRUM (10 Decisiones) ---
const scrumScenario2 = [
    new Decision("Día 1: Inicio", "El cliente quiere añadir un 'feature' de último minuto."),
    // ... (9 más) ...
];
// Opciones para Día 1 (Escenario 2)
scrumScenario2[0].addOption(new Option("Rechazarlo (proteger al equipo)", "El equipo está feliz, el cliente molesto.", 0, 0, 0, +10, 3));
scrumScenario2[0].addOption(new Option("Aceptarlo (complacer al cliente)", "El equipo se estresa y la calidad baja.", 0, 0, -15, -10, 3));

// ... (y así para todos tus escenarios) ...


/**
 * Función principal que tu juego llamará.
 * Obtiene los datos "pre-hechos" correctos.
 */
export function getScenarioData(metodologia, casoId) {
    if (metodologia === 'scrum') {
        if (casoId === '1') return scrumScenario1;
        if (casoId === '2') return scrumScenario2;
        // ... (más casos) ...
    }
    if (metodologia === 'pmbok') {
        // if (casoId === '1') return pmbokScenario1;
        // ...
    }

    // Fallback por si no se encuentra
    console.error("No se encontraron datos para", metodologia, casoId);
    return [];
}