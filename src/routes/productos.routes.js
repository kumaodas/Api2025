import { Router } from "express";
import { 
    prueba, 
    getProductos, 
    getProductoxId, 
    postProducto, 
    putProducto, 
    deleteProducto 
} from "../controladores/productos.js";
const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoxId);
/* router.post('/productos', postProducto) */
/* router.put('/productos/:id', putProducto); */
router.delete('/productos/:id', deleteProducto);

export default router

/* --------------------------------------------------------------------------------------------------- */
import upload from "../middlewares/upload.js";

router.post('/productos',upload.single('i') ,postProducto);
router.put('/productos/:id',upload.single('i'), putProducto);
