import { createPool } from "mysql2/promise";
import {
    BD_HOST,
    BD_DATABASE,
    BD_USER,
    BD_PASSWORD,
    BD_PORT
} from './config.js'

// Conexión a MySQL (XAMPP local o servicio en la nube)
export const pool = createPool({
    host: BD_HOST,
    database: BD_DATABASE,
    user: BD_USER,
    password: BD_PASSWORD,
    port: BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Para producción, agregar SSL si es necesario
    ssl: process.env.NODE_ENV === 'production' ? {} : undefined
})

// Verificar conexión
pool.getConnection()
    .then(connection => {
        console.log('✅ Conectado a MySQL exitosamente')
        connection.release()
    })
    .catch(err => {
        console.error('❌ Error conectando a MySQL:', err.message)
    })

export default pool

/* import {createPool} from "mysql2/promise";
 import {
    BD_HOST,
    BD_DATABASE,
    BD_USER,
    BD_PASSWORD,
    BD_PORT
 } from './config.js'

 export const conmysql=createPool({
    host:BD_HOST,
    database:BD_DATABASE,
    user:BD_USER,
    password:BD_PASSWORD,
    port:BD_PORT
 }) */