const express = require('express');
const router = express.Router();

const ctrlUser = require('./config/user.controller');
const jwtHelper = require('./config/jwtHelper');

router.post('/create', ctrlUser.create);
router.post('/authenticate', ctrlUser.autenticate);
router.get('/userDashboard', jwtHelper.verifyJwtToken, ctrlUser.userDashboard);
router.get('/viewAll', jwtHelper.verifyJwtToken, ctrlUser.viewAllUsers);
router.get('/deleteUser', jwtHelper.verifyJwtToken, ctrlUser.deleteUser);

module.exports = router;
