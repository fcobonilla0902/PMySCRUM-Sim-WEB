// model/Decision.js

export class Decision {
    
    constructor(title, scenarioDescription) {
        this.title = title;
        this.scenarioDescription = scenarioDescription;
        this.options = []; // Array de JS
    }

    /**
     * Añade un objeto Option a la lista de esta decisión.
     */
    addOption(option) {
        this.options.push(option); // 'push' es el 'add' de JavaScript
    }

    // --- Getters ---
    getTitle() { return this.title; }
    getScenarioDescription() { return this.scenarioDescription; }
    getOptions() { return this.options; }
}