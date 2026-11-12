// Cliente HTTP mínimo hacia el backend: agrega la URL base, manda cookies de
// sesión y traduce errores del servidor a un Error con mensaje legible.

// En producción (Vercel) las peticiones van a "/api" y vercel.json las reenvía
// a Render: así la cookie de sesión es del mismo dominio que el frontend.
// En desarrollo local se usa directamente la API en el puerto 3000.
const ES_LOCAL = ["localhost", "127.0.0.1"].includes(window.location.hostname);
export const API_URL = ES_LOCAL ? "http://localhost:3000" : "/api";

export async function apiFetch(ruta, opciones) {
    const config = Object.assign({}, opciones);
    config.headers = Object.assign({ "Content-Type": "application/json" }, opciones && opciones.headers);
    config.credentials = "include";

    const respuesta = await fetch(API_URL + ruta, config);

    if (respuesta.status === 204) return null;  

    const datos = await respuesta.json().catch(function () { return null; });

    if (!respuesta.ok) {
        const mensaje = (datos && datos.error) ? datos.error : "Error al comunicarse con el servidor.";
        throw new Error(mensaje);
    }

    return datos;
}
