import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obetenerProductos, obtenerProducto } from "../controllers/products.controller.js";
import { isAdmin, isModerator, verifyToken } from "../middlewares/verifySignup.js";


const router = Router();

router.get('/',obetenerProductos);

router.post('/', [verifyToken, isModerator, isAdmin] , crearProducto);

router.get('/:id',obtenerProducto);

router.put('/actualizar/:id', [verifyToken,isAdmin, isModerator] ,actualizarProducto);

router.delete('/eliminar/:id', [verifyToken, isAdmin] ,eliminarProducto);


export default router;