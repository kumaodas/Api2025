//importante1
import { conmysql } from "../bd.js";

//prueb 1
export const prueba=(req,res)=>{
    res.send('exito'); 
}
//prueb2
export const getclientes= async(req,res)=>{
    try {
        const [result]= await conmysql.query('select * from clientes')
        res.json({
            cant: result.length,
            data:result,
        })
       /* res.json(result) */
    } catch (error) {
        return res.status(500).json({message:"error servidor"})
    } 
}
/* 3-10 */
export const getclientexId= async(req,res)=>{
    try {
        const [result]= await conmysql.query('select * from clientes where cli_id=?', [req.params.id])
        if(result.length<=0)return res.json({
            cant:0,
            message:"no encontrado"
        })
        res.json({
            cant:result.length,
            data:result[0]
        })
    } catch (error) {
        return res.status(500).json({message:"error servidor"})
    } 
}

//funcion para insertar un cliente
//Get para consulta
//post para agregar o insertar  sea gregarval wer o qer
//pash 
//put
export const postCliente= async(req,res)=>{
    try {
        const {cli_identificacion, cli_nombre,cli_telefono,
             cli_correo,cli_direccion, cli_pais,cli_ciudad 
             } = req.body
        /* console.log(req.body) */
        const [result] = await conmysql.query(
            'insert into clientes(cli_identificacion, cli_nombre,cli_telefono,cli_correo,cli_direccion, cli_pais, cli_ciudad) values(?,?,?,?,?,?,?)',
            [cli_identificacion, cli_nombre,cli_telefono,cli_correo,cli_direccion, cli_pais, cli_ciudad]
        )
        res.send({
            cli_id:result.insertId
        })
    } catch (error) {
        return res.status(500).json({message:"error servidor"})       
    }

}

//put
// Función para actualizar un cliente
/* export const putCliente = async (req, res) => {
    try {
        const { cli_identificacion, cli_nombre, cli_telefono, 
            cli_correo, cli_direccion, cli_pais, cli_ciudad } = req.body
        const cli_id = req.params
        
       console.log(req.body)

        const [result] = await conmysql.query(
            'UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? WHERE cli_id=?',
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_pais, cli_ciudad,id]
        )

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            })
        }

         res.json({
            message: "Cliente actualizado correctamente",
            affectedRows: result.affectedRows
        }) 

        const [fila]= await conmysql.query('select * from clientes where cli_id=?', [req.params.id])
        res.json(fila[0])
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" })
    }
} */

//funcion para modificar 
export const putCliente=async(req,res)=>{
    try {

        const {id}=req.params

        const{cli_identificacion,cli_nombre,cli_telefono,
            cli_correo,cli_direccion,cli_pais,cli_ciudad
        }=req.body
    /* console.log(req.body)
        console.log(id) */

      const [result]= await conmysql.query( 
        'update clientes set cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_pais=?, cli_ciudad=? where cli_id=?',
        [cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad,id]
       ) 
        if(result.affectedRows<=0)return res.status(404).json({
            message: "Cliente no encontrado"
        })
        const [fila]= await conmysql.query('select * from clientes where cli_id=?',[id])
        res.json(fila[0])
    } catch (error) {
        return res.status(500).json({message:" error en el servidor"})
    }
}

// Función para eliminar un cliente
export const deleteCliente = async (req, res) => {
    try {
        const cli_id = req.params.id
        
        const [result] = await conmysql.query(
            'DELETE FROM clientes WHERE cli_id=?',
            [cli_id]
        )

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            })
        }

        res.json({
            message: "Cliente eliminado correctamente",
            affectedRows: result.affectedRows
        })

        console.log(req.body)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error en el servidor" })
    }
}
