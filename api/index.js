const express = require('express');
const router = express.Router();

const ctrlUser = require('./create.org');

router.post('/register', ctrlUser.register);

module.exports = router;


    
