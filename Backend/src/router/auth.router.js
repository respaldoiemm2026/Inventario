import { validarCuerpo } from "../middleware/validacion.middleware.js";
import { Router } from "express";
import { login, registrar, me, signout } from "../controller/auth.controller.js";
import { protegerRuta, permitirCargos } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", validarCuerpo("login"), login);
router.post("/registrar", protegerRuta, permitirCargos("RECTOR"), validarCuerpo("usuario"), registrar);
router.get("/me", protegerRuta, me);
router.post("/signout", signout);

export default router;
