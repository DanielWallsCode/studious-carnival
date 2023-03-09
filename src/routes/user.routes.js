import { Router } from "express";
import { crearUsuario,obtenerUsuarios } from "../controllers/user.controllers.js";
import { isAdmin, verifyToken } from "../middlewares/verifySignup.js";
import { checkRolesExisted } from "../middlewares/authJwt.js";


const router = Router();

router.post('/',[verifyToken,isAdmin, checkRolesExisted],crearUsuario);

router.get('/',[verifyToken,isAdmin],obtenerUsuarios);


export default router;