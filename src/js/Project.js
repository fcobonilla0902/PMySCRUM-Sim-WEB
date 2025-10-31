// model/Project.js

export class Project {
    
    constructor() {
        this.tiempo = 100;
        this.costo = 100;
        this.calidad = 100;
        this.motivacion = 100;
    }

    /**
     * Aplica el impacto de una decisión a las variables del proyecto.
     */
    aplicarImpacto(deltaTiempo, deltaCosto, deltaCalidad, deltaMotivacion) {
        this.tiempo += deltaTiempo;
        this.costo += deltaCosto;
        this.calidad += deltaCalidad;
        this.motivacion += deltaMotivacion;

        // Limita los valores a rangos lógicos
        this.calidad = Math.max(0, Math.min(100, this.calidad));
        this.motivacion = Math.max(0, Math.min(100, this.motivacion));
        this.tiempo = Math.max(0, this.tiempo);
        this.costo = Math.max(0, this.costo);
    }

    /**
     * Comprueba si el proyecto ha fallado.
     */
    isFailed() {
        return this.tiempo <= 0 || this.costo <= 0 || this.calidad <= 40;
    }

    // --- Getters ---
    getTiempo() { return this.tiempo; }
    getCosto() { return this.costo; }
    getCalidad() { return this.calidad; }
    getMotivacion() { return this.motivacion; }
}