// src/com/utils.ts

/**
 * Extrae y devuelve el payload decodificado de un token JWT.
 * @param token Token JWT del cual extraer el payload.
 * @returns Payload decodificado del token.
 */
export function extractPayload(token: string): any {
    const [, payload64,] = token.split('.');
    const payloadJSON = atob(payload64);
    const payload = JSON.parse(payloadJSON);

    return payload;
}

// Puedes agregar más funciones utilitarias aquí según las necesidades de tu aplicación