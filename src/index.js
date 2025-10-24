import app from './app.js';
import { PORT } from './config.js';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto: ${PORT}`);
  console.log(`📱 URL local: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

/* import app from './app.js'
import{PORT} from './config.js'

app.listen(PORT);//3000
console.log('el servidor esta escuchando por el puesto:',PORT) */