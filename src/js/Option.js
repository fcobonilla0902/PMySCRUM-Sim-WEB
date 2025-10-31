// model/Option.js

export class Option {

    constructor(optionText, consequenceText, impactoTiempo, impactoCosto, impactoCalidad, impactoMotivacion) {
        this.optionText = optionText;
        this.consequenceText = consequenceText;
        this.impactoTiempo = impactoTiempo;
        this.impactoCosto = impactoCosto;
        this.impactoCalidad = impactoCalidad;
        this.impactoMotivacion = impactoMotivacion;
    }

    /**
     * Le dice a un objeto Project que aplique el impacto de esta opción.
     */
    aplicar(project) {
        project.aplicarImpacto(this.impactoTiempo, this.impactoCosto, this.impactoCalidad, this.impactoMotivacion);
    }

    // --- Getters ---
    getOptionText() { return this.optionText; }
    getConsequenceText() { return this.consequenceText; }
}