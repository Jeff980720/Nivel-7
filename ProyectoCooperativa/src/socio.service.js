import { Socio } from './socio.class.js';
import { coperativaData } from './coperativadata.js';

/**
 * Simula la obtención de datos brutos y aplica la lógica de filtrado y mapeo.
 * Se usa 'async' para simular que la carga de datos es una operación asíncrona 
 * (como leer una base de datos real).
 * @returns {Promise<Socio[]>} Una promesa que resuelve en un array de instancias de Socio.
 */
export async function getAllSocios() {
    // Simulamos una operación asíncrona que tarda un poco (e.g., consulta a DB)
    // En un entorno real, aquí harías tu llamada a la DB (por ejemplo, 'await pool.query(...)')
    await new Promise(resolve => setTimeout(resolve, 50));

    // Aquí usamos los datos brutos de coperativaData (asumimos que tienen la propiedad 'items')
    const rawItems = coperativaData.items || [];

    const socios = rawItems
        .filter(item => {
            // Lógica de filtrado para excluir elementos que no son socios reales
            return !['Ingreso Socios', 'Egreso Socios'].includes(item.nombre);
        })
        .map(item => {
            // *** Mapeo y Creación de la instancia de la CLASE Socio ***
            // Usamos el constructor para una inicialización más limpia
            return new Socio(item);
        });

    return socios; // Devuelve el array de Socios dentro de la Promesa
}
