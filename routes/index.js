const router = require('express').Router();

//router.get('/' , (req, res) => { res.send('Hello World');});

router.use('/users', require('./users'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.js');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
