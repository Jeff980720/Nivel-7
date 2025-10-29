/**
 * @fileoverview Clase que representa a un Socio con sus propiedades financieras.
 * Usamos una clase simple de JavaScript (ES6) en lugar de TypeScript.
 */
export class Socio {
    constructor(data = {}) {
        this.id = data.id || null;
        this.nombre = data.nombre || '';
        this.aportado = data.aportado || 0;
        this.montoprestado = data.montoprestado || 0;
        this.montopagado = data.montopagado || 0;
        this.montopendiente = data.montopendiente || 0;
        this.interesprestado = data.interesprestado || 0;
        this.interespagado = data.interespagado || 0; // Incluido para evitar errores de mapeo
        this.interespendiente = data.interespendiente || 0;
    }
}
