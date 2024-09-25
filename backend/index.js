import express from 'express';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import bodyParser from 'body-parser';
import FormData from 'form-data';
import cors from 'cors';
import env from 'dotenv';
import UserRoutes from './routes/user.js';
import database from './database/conexion.js';
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar el servidor de node
const app = express();
const puerto = env.PORT || 3000;

// Mensaje si ejecuta correctamente el servidor de node
console.log("Servidor de node en ejecución");

// Conexión a la base de datos
database();

// Middleware para CORS
app.use(cors({
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Configuración de multer para manejar la subida de archivos
const upload = multer({ dest: 'uploads/' });

// Ruta para subir archivos y analizar con VirusTotal
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const apiKey = '35174a2b646fa286e05f9517c52afd39d4c12e8342d344959263cb7afe834551';

  try {
    console.log('Archivo recibido:', file);
    const fileData = fs.readFileSync(file.path);

    // Crear un objeto FormData y agregar el archivo
    const form = new FormData();
    form.append('file', fileData, file.originalname);

    const uploadResponse = await axios.post('https://www.virustotal.com/api/v3/files', form, {
      headers: {
        'x-apikey': apiKey,
        ...form.getHeaders()
      }
    });

    console.log('Respuesta del Analizador:', uploadResponse.data);

    // Obtener el ID del análisis
    const analysisId = uploadResponse.data.data.id;

    // Esperar a que el análisis esté completo y obtener el informe completo
    const analysisResult = await getAnalysisResult(apiKey, analysisId);

    // Eliminar el archivo después del análisis
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
      } else {
        console.log('Archivo eliminado:', file.path);
      }
    });

    res.json({ message: 'Archivo analizado y eliminado', data: analysisResult });

  } catch (error) {
    console.error('Error al analizar el archivo:', error.message);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
    res.status(500).json({ message: 'Error al analizar el archivo', error: error.message });
  }
});

// Función para obtener el resultado completo del análisis
async function getAnalysisResult(apiKey, analysisId) {
  try {
    let analysisStatus;
    let analysisResult;

    do {
      const response = await axios.get(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
        headers: {
          'x-apikey': apiKey,
        },
      });

      analysisStatus = response.data.data.attributes.status;
      if (analysisStatus === 'completed') {
        analysisResult = response.data;
      } else {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de reintentar
      }
    } while (analysisStatus !== 'completed');

    return analysisResult;
  } catch (error) {
    console.error('Error al obtener los resultados del análisis:', error.response?.data || error.message);
    return { error: 'Error retrieving analysis results' };
  }
}

app.post('/uploads', (req, res) => {
  setTimeout(() => {
    res.json({ data: 'Resultados del análisis' });
  }, 1000);
});

// Servidor en ejecución en el puerto correspondiente
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});

// Decodificar los datos desde los formularios js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar rutas del aplicativo
app.use('/api/user', UserRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración para servir archivos estáticos (imágenes de avatar)
app.use('/upload/avatars', express.static(path.join(__dirname, 'upload', 'avatars')));

