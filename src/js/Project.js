// model/Project.js
export class Project {
    
    // El constructor ahora toma los valores iniciales del escenario
    constructor(totalTareas, totalDias) {
        this.tiempo = 100;
        this.costo = 100; // Presupuesto
        this.calidad = 100;
        this.motivacion = 100;
        
        this.tareasRestantes = totalTareas;
        this.currentDay = 1;
        this.totalDays = totalDias; // Total de días (ej. 10)
        this.currentSprint = 1;
    }

    // Aplicar impacto ahora también acepta tareas completadas
    aplicarImpacto(deltaTiempo, deltaCosto, deltaCalidad, deltaMotivacion, tareasCompletadas) {
        this.tiempo += deltaTiempo;
        this.costo += deltaCosto;
        this.calidad += deltaCalidad;
        this.motivacion += deltaMotivacion;
        this.tareasRestantes -= tareasCompletadas; // Restamos las tareas

        // ✅ LÓGICA DE LÍMITES (AÑADIDA)
        this.calidad = Math.max(0, Math.min(100, this.calidad));
        this.motivacion = Math.max(0, Math.min(100, this.motivacion));
        this.tiempo = Math.max(0, Math.min(100, this.tiempo)); // Asumiendo que tiempo es un %
        this.costo = Math.max(0, Math.min(100, this.costo));   // Asumiendo que presupuesto es un %
        this.tareasRestantes = Math.max(0, this.tareasRestantes);
    }
    
    avanzarDia() {
        this.currentDay++;
        if (this.currentDay > 5 && this.currentSprint === 1) {
            this.currentSprint = 2; // Avanza al sprint 2
        }
    }

    isFailed() {
        // ✅ LÓGICA DE FRACASO (AÑADIDA)
        // Fracasa si el costo o calidad bajan mucho, o si se acaban los días y aún hay tareas
        return this.costo <= 0 || this.calidad <= 30 || (this.currentDay > this.totalDays && this.tareasRestantes > 0);
    }

    // --- Getters ---
    // ✅ GETTERS PRINCIPALES (AÑADIDOS)
    getTiempo() { return this.tiempo; }
    getCosto() { return this.costo; }
    getCalidad() { return this.calidad; }
    getMotivacion() { return this.motivacion; }

    getTareasRestantes() { return this.tareasRestantes; }
    getCurrentDay() { return this.currentDay; }
    getTotalDays() { return this.totalDays; }
    getCurrentSprint() { return this.currentSprint; }
}