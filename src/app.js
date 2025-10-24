import express from 'express';
import cors from 'cors';

// Importar rutas
import clientesRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';

const app = express();

// Middlewares
app.use(cors()); // ✅ IMPORTANTE: Agregar CORS para Render
app.use(express.json());

// Indicar rutas a utilizar
app.use('/api', clientesRoutes);
app.use('/api', productosRoutes);

// Ruta de prueba para verificar que funciona
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ API funcionando en Render!',
    timestamp: new Date().toISOString()
  });
});

// Ruta de health check (importante para Render)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API saludable',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Manejo de rutas no encontradas (DEBE ir al final)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Ruta no encontrada - Endpoint not found'
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : error
  });
});

export default app;

/* 
import express from 'express'

import clientesRoutes from './routes/clientes.routes.js'//nuevo

import productosRoutes from './routes/productos.routes.js'

const app=express();
app.use(express.json());


app.use('/api',clientesRoutes)//nuevo

app.use('/api',productosRoutes)

app.use((req,resp,next)=>{
    resp.status(400).json({
        message:'not fount'
    })
})

export default app;

import cors from 'cors'

const corsOpt={
    origin: '*',
    methods:['GET', 'HOST', 'PUT', 'PATCH', 'DELETE'],
    credencials:true
}

app.use(cors(corsOpt));

 */