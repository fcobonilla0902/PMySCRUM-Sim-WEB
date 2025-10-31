// En: src/js/simulacion_hub.js

// DEBUG 1: Si ves esto, ¡el script se cargó!
console.log("simulacion_hub.js ¡cargado correctamente!");

document.addEventListener('DOMContentLoaded', () => {
    
    // DEBUG 2: Esto se ejecuta cuando el HTML está listo.
    console.log("DOM listo. Buscando tarjetas...");

    // (Asegúrate de que la clase sea 'game-card' como en tu HTML)
    const allCards = document.querySelectorAll('.game-card[data-caso]');

    // DEBUG 3: ¿Cuántas tarjetas encontró?
    console.log(`Se encontraron ${allCards.length} tarjetas para enlazar.`);

    if (allCards.length === 0) {
        console.error("¡ERROR! No se encontró ninguna tarjeta. Verifica que la clase CSS sea '.game-card'");
    }

    allCards.forEach(card => {
        // DEBUG 4: Informa por cada tarjeta que enlaza.
        console.log("Añadiendo 'oyente' de clic a:", card);

        card.addEventListener('click', () => {
            // DEBUG 5: ¡ÉXITO! El clic fue detectado.
            console.log("¡Tarjeta clickeada!");

            const metodologia = card.dataset.metodologia;
            const caso = card.dataset.caso;

            // DEBUG 6: Muestra los datos que leyó.
            console.log(`Datos leídos: metodologia=${metodologia}, caso=${caso}`);

            if (metodologia && caso) {
                // (El nombre de tu archivo de contexto era 'context.html')
                const url = `context.html?metodologia=${metodologia}&caso=${caso}`;
                
                // DEBUG 7: Muestra a dónde va a redirigir.
                console.log(`Redirigiendo a: ${url}`);
                window.location.href = url;
            } else {
                console.error("ERROR: Faltan atributos 'data-metodologia' o 'data-caso' en esta tarjeta.");
            }
        });
    });
});

