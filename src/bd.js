import { createPool } from "mysql2/promise";
import {
    BD_HOST,
    BD_DATABASE,
    BD_USER,
    BD_PASSWORD,
    BD_PORT
} from './config.js'

// Conexión a MySQL
export const conmysql = createPool({
    host: BD_HOST,
    database: BD_DATABASE,
    user: BD_USER,
    password: BD_PASSWORD,
    port: BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: process.env.NODE_ENV === 'production' ? {} : undefined
})

// Verificar conexión
conmysql.getConnection()
    .then(connection => {
        console.log('✅ Conectado a MySQL exitosamente')
        connection.release()
    })
    .catch(err => {
        console.error('❌ Error conectando a MySQL:', err.message)
    })

export default conmysql  // ← Exportar como default