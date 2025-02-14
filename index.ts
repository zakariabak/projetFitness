import express from 'express';

const router = express();
var bodyParser  = require('body-parser');
router.set('PORT', process.env.PORT || 4200)
router.use(express.json({limit: '4mb'}));


console.log(router.get('PORT'))

