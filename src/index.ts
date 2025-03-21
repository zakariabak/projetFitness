/* import express from 'express';
import userRoutes from './routes/user';
import http from 'http';
import cors from 'cors'; // ➡️ Ajout cors

const NAMESPACE = 'Index';
const PORT = 4200;

const app = express();

app.use(express.json({ limit: '4mb' }));

// ➡️ CORS Middleware
app.use(cors({
    origin: 'http://localhost:5173', // l'adresse de ton frontend Svelte
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ➡️ Routes
app.use('/user', userRoutes);

// ➡️ 404 handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({ message: error.message });
});

// ➡️ Lancement serveur HTTP
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(NAMESPACE, `Server is running on port: ${PORT}`);
});
*/


import express from 'express';
import userRoutes from './routes/userRoutes'; // ajuste si le chemin est différent
import http from 'http';

const NAMESPACE = 'Index';
const PORT = 4200; // On force à 4200, pas de process.env pour l'instant

const app = express();

app.use(express.json({ limit: '4mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
})

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({ message: error.message });
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(NAMESPACE, `Server is running on port: ${PORT}`);
}); 





/*import express from 'express';
import user from './routes/user';
import http from 'http';

const NAMESPACE = 'Index';

const router = express();
const bodyParser  = require('body-parser');
router.set('PORT', process.env.PORT || 4200)
router.use(express.json({limit: '4mb'}));


/** Rules of our API 
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

router.use('/user', user);


/** Error handling 
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

const server = http.createServer(router);

server.listen(router.get('PORT'), () => {
    console.log(NAMESPACE, `Server is running port: ${router.get('PORT')}`);
}); */