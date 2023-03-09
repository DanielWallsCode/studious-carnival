import { Router } from "express";
import { ingresar, resgistrase } from "../controllers/auth.contrroller.js";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/authJwt.js";


const router = Router();

router.post('/registrarse', [checkDuplicateUsernameOrEmail,checkRolesExisted] ,resgistrase);

router.post('/ingresar', ingresar);




export default router;