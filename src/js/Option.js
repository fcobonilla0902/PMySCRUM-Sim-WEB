export class Option {
    constructor(optionText, consequenceText, deltaTiempo, deltaCosto, deltaCalidad, deltaMotivacion) {
        this.optionText = optionText;
        this.consequenceText = consequenceText;
        this.deltaTiempo = deltaTiempo;
        this.deltaCosto = deltaCosto;
        this.deltaCalidad = deltaCalidad;
        this.deltaMotivacion = deltaMotivacion;
    }

    aplicar(project) {
        project.aplicarImpacto(
            this.deltaTiempo,
            this.deltaCosto, 
            this.deltaCalidad,
            this.deltaMotivacion
        );
    }

    getOptionText() { return this.optionText; }
    getConsequenceText() { return this.consequenceText; }
}