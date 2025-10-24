/* import { conmysql } from "../bd.js"; */
import conmysql from "../bd.js";

// Prueba
export const prueba = (req, res) => {
    res.send('Éxito productos'); 
}

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM productos')
        res.json({
            cant: result.length,
            data: result,
        })
    } catch (error) {
        return res.status(500).json({message: "Error servidor"})
    } 
}

// Obtener producto por ID
export const getProductoxId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM productos WHERE prod_id = ?', [req.params.id])
        if(result.length <= 0) return res.json({
            cant: 0,
            message: "Producto no encontrado"
        })
        res.json({
            cant: result.length,
            data: result[0]
        })
    } catch (error) {
        return res.status(500).json({message: "Error servidor"})
    } 
}

// Insertar nuevo producto
export const postProducto = async (req, res) => {
    try {
        const { 
            prod_codigo,prod_nombre,prod_stock,
            prod_precio,prod_active
        } = req.body
        /* 16-10 */
        const prod_imagen = req.file? `/uploads/${req.file.filename}`:null;
        /*  */
        const [result] = await conmysql.query(
            `INSERT INTO productos(
                prod_codigo, prod_nombre, prod_stock, 
                prod_precio, prod_active, prod_imagen
            ) VALUES(?,?,?,?,?,?)`,
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_active, prod_imagen]
        )
        res.send({
            prod_id: result.insertId,
            message: "Producto creado exitosamente"
        })
    } catch (error) {
        return res.status(500).json({message: "Error servidor"})       
    }
}

// Actualizar producto
export const putProducto = async (req, res) => {
    try {
        const { id } = req.params
        const { 
            prod_codigo,prod_nombre,prod_stock, 
            prod_precio,prod_active
        } = req.body
        /* 16-10 */
        const prod_imagen = req.file? `/uploads/${req.file.filename}`:null;
        /*  */
        const [result] = await conmysql.query( 
            `UPDATE productos SET 
                prod_codigo=?, prod_nombre=?, prod_stock=?, 
                prod_precio=?, prod_active=?, prod_imagen=? 
            WHERE prod_id=?`,
            [prod_codigo, prod_nombre, prod_stock, prod_precio, prod_active, prod_imagen, id]
        ) 
        //si no hay imagen busca en la bd
        if (!req.file){
            const[rows] =await conmysql.query(
                'select prod_imagen from productos where prod_id = ? ',
                [id]
            );
        }
        //
        /* if(result.affectedRows <= 0) return res.status(404).json({
            message: "Producto no encontrado"
        }) */
       if(rows && rows.length  > 0){
            prod_imagen = rows[0].prod_imagen;
        }else{
            return re.status(404).json({ message:'no eneocntrado'})
       }
        //si tinee lo conserva

        // Devolver el producto actualizado (mismo patrón que clientes)
        const [fila] = await conmysql.query('SELECT * FROM productos WHERE prod_id=?', [id])
        res.json(fila[0])
    } catch (error) {
        return res.status(500).json({message: "Error en el servidor"})
    }
}

// Eliminar producto
export const deleteProducto = async (req, res) => {
    try {
        const prod_id = req.params.id 
        const [result] = await conmysql.query(
            'DELETE FROM productos WHERE prod_id=?',
            [prod_id]
        )

        if (result.affectedRows <= 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            })
        }

        res.json({
            message: "Producto eliminado correctamente",
            affectedRows: result.affectedRows
        })
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor" })
    }
}