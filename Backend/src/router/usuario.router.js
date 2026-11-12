import { validarCuerpo, validarId } from "../middleware/validacion.middleware.js";
import { Router } from "express";
import { actualizarUsuario, 
    createUsuario,
     eliminarUsuario, 
     leerUsuario } 
     from "../controller/usuario.controller.js";
import { permitirCargos } from "../middleware/auth.middleware.js";


const router = Router();
router.param("id", validarId);
// Solo el RECTOR puede crear, modificar o eliminar usuarios (incluidos sus cargos).
// protegerRuta ya se aplica en app.js, así que req.usuario está disponible.
const soloRector = permitirCargos("RECTOR");

router.post("/", soloRector, validarCuerpo("usuario"), createUsuario);
router.get("/", leerUsuario);
router.put("/:id", soloRector, validarCuerpo("usuario"), actualizarUsuario);
router.delete("/:id", soloRector, eliminarUsuario);

export default router;