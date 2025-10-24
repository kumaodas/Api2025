//importante 2
import { Router } from "express";

//importar las funcione //3-10
import { prueba, getclientes, getclientexId, postCliente, putCliente, deleteCliente } from "../controladores/clientes.js";
const router=Router();

//armar las rutas
/* router.get('/clientes',prueba) */
router.get('/clientes',getclientes)
//3-10
router.get('/clientes/:id',getclientexId)
router.post('/clientes',postCliente)
router.put('/clientes/:id',putCliente)
router.delete('/clientes/:id',deleteCliente)
export default router