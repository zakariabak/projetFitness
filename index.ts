import express from 'express';
import user from './routes/user';
import http from 'http';

const NAMESPACE = 'Index';

const router = express();
const bodyParser  = require('body-parser');
router.set('PORT', process.env.PORT || 4200)
router.use(express.json({limit: '4mb'}));


/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

router.use('/user', user);


/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});

const server = http.createServer(router);

server.listen(router.get('PORT'), () => {
    console.log(NAMESPACE, `Server is running port: ${router.get('PORT')}`);
});