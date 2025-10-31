export class Option {

    constructor(optionText, consequenceText, impactoTiempo, impactoCosto, impactoCalidad, impactoMotivacion, tareasCompletadas = 0) {
        this.optionText = optionText;
        this.consequenceText = consequenceText;
        this.impactoTiempo = impactoTiempo;
        this.impactoCosto = impactoCosto;
        this.impactoCalidad = impactoCalidad;
        this.impactoMotivacion = impactoMotivacion;
        this.tareasCompletadas = tareasCompletadas; // Nuevo
    }

    aplicar(project) {
        // Pasa el nuevo parámetro al aplicar impacto
        project.aplicarImpacto(
            this.impactoTiempo, 
            this.impactoCosto, 
            this.impactoCalidad, 
            this.impactoMotivacion, 
            this.tareasCompletadas
        );
    }
    
    // ... (Getters) ...
    getOptionText() { return this.optionText; }
    getConsequenceText() { return this.consequenceText; }
}
