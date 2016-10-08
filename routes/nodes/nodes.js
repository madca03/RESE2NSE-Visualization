var router = require('express').Router();

router.get('/', require('./get-nodes.js'));
router.get('/count', require('./get-node-count.js'));
router.post('/nodes/update', require('./nodes-update.js'));
router.get('/nodes/display', require('./nodes-display.js'));



module.exports = router;
