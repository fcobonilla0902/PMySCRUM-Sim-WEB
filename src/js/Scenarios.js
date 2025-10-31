import { Decision } from './Decision.js';
import { Option } from './Option.js';

// --- ESCENARIO 1 DE SCRUM (10 Decisiones) ---
const scrumScenario1 = [
    // Día 1
    new Decision("Día 1: Planificación", "El Product Owner no está seguro de las prioridades."),
    // Día 2
    new Decision("Día 2: Desarrollo", "Un desarrollador junior introduce un bug crítico."),
    // Día 3
    new Decision("Día 3: Revisión", "El equipo descubre que un requisito se entendió mal."),
    // ... (y así hasta 10 decisiones) ...
];

// Ahora "pre-hacemos" las opciones para cada decisión
// (Esto es más largo, pero es lo que pediste: todo pre-hecho)

// Opciones para Día 1
scrumScenario1[0].addOption(new Option("Ignorar y seguir con el plan", "El equipo trabaja en tareas incorrectas.", -5, 0, -10, -5, 1));
scrumScenario1[0].addOption(new Option("Detener todo y re-planificar", "Se pierde medio día, pero las prioridades quedan claras.", -5, 0, +10, +5, 0));

// Opciones para Día 2
scrumScenario1[1].addOption(new Option("Dejar que el junior lo arregle solo", "Tarda 2 días, la motivación cae.", -10, 0, -5, -10, 0));
scrumScenario1[1].addOption(new Option("Asignar un senior para 'pair programming'", "Se resuelve en medio día.", -5, 0, +5, +5, 2));

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