export class Project {
    constructor(totalTareas, totalDias) {
        this.tiempo = 100;
        this.costo = 100;
        this.calidad = 100;
        this.motivacion = 100;
        
        this.tareasRestantes = totalTareas;
        this.totalTareas = totalTareas;
        this.currentDay = 1;
        this.totalDays = totalDias;
        this.currentSprint = 1;
    }

    aplicarImpacto(deltaTiempo, deltaCosto, deltaCalidad, deltaMotivacion) {
        // SIEMPRE completar 1 tarea por decisión
        this.tiempo += deltaTiempo;
        this.costo += deltaCosto;
        this.calidad += deltaCalidad;
        this.motivacion += deltaMotivacion;
        this.tareasRestantes -= 1; // ← SIEMPRE 1 TAREA POR DÍA

        // Límites - ASEGURAR que no sean negativos
        this.tiempo = Math.max(0, Math.min(100, this.tiempo));
        this.costo = Math.max(0, Math.min(100, this.costo));
        this.calidad = Math.max(0, Math.min(100, this.calidad));
        this.motivacion = Math.max(0, Math.min(100, this.motivacion));
        this.tareasRestantes = Math.max(0, this.tareasRestantes);
    }
    
    avanzarDia() {
        this.currentDay++;
        if (this.currentDay > 5 && this.currentSprint === 1) {
            this.currentSprint = 2;
        }
    }

    isFailed() {
        return this.tiempo <= 15 ||           
            this.costo <= 15 || 
            this.calidad <= 15 ||          
            this.motivacion <= 15 ||
            (this.currentDay > this.totalDays && this.tareasRestantes > 0);
    }

    // --- Getters ---
    getTiempo() { return this.tiempo; }
    getCosto() { return this.costo; }
    getCalidad() { return this.calidad; }
    getMotivacion() { return this.motivacion; }

    getTareasRestantes() { return this.tareasRestantes; }
    getCurrentDay() { return this.currentDay; }
    getTotalDays() { return this.totalDays; }
    getCurrentSprint() { return this.currentSprint; }
    getTotalTareas() { return this.totalTareas; }
}